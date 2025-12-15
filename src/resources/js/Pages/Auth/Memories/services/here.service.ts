import L from "leaflet";

type LookupResult = {
  lat: number;
  lng: number;
  label: string;
};

type PlaceInfoResult = {
  name: string | null;
  address: string | null;
  source: "browse-radius" | "reverse" | "none";
};

export const hereService = {
  async lookupPlace(id: string, apiKey: string): Promise<LookupResult | null> {
    const url =
      `https://lookup.search.hereapi.com/v1/lookup` +
      `?id=${encodeURIComponent(id)}&apiKey=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error("HERE Lookup error:", await res.text());
      return null;
    }

    const data = await res.json();
    if (!data.position) return null;

    return {
      lat: data.position.lat,
      lng: data.position.lng,
      label: data.title || data.address?.label || "Local",
    };
  },

  async getPlaceInfo(
    lat: number,
    lng: number,
    apiKey: string
  ): Promise<PlaceInfoResult> {
    // 1️⃣ Browse com raio pequeno
    const browseUrl =
      `https://browse.search.hereapi.com/v1/browse` +
      `?at=${lat},${lng}&in=circle:${lat},${lng};r=25&limit=1&apiKey=${apiKey}`;

    try {
      const res = await fetch(browseUrl);
      const data = await res.json();

      if (data.items?.length > 0) {
        const item = data.items[0];
        return {
          name: item.title ?? null,
          address: item.address?.label ?? null,
          source: "browse-radius",
        };
      }
    } catch {
      console.warn("Browse falhou, fallback para reverse");
    }

    // 2️⃣ Reverse geocode
    const revUrl =
      `https://revgeocode.search.hereapi.com/v1/revgeocode` +
      `?at=${lat},${lng}&lang=pt-BR&apiKey=${apiKey}`;

    try {
      const res = await fetch(revUrl);
      const data = await res.json();

      if (data.items?.length > 0) {
        const item = data.items[0];
        return {
          name: null,
          address: item.address?.label ?? null,
          source: "reverse",
        };
      }
    } catch {}

    return { name: null, address: null, source: "none" };
  },

  async autocomplete(
    query: string,
    apiKey: string,
    map?: L.Map | null
  ): Promise<any[]> {
    let inside = "";

    if (map) {
      const center = map.getCenter();
      inside = `&in=circle:${center.lat},${center.lng};r=30000`;
    }

    const baseParams = `q=${encodeURIComponent(query)}${inside}&apiKey=${apiKey}`;

    const autoUrl = `https://autocomplete.search.hereapi.com/v1/autocomplete?${baseParams}`;
    const discoverUrl = `https://discover.search.hereapi.com/v1/discover?${baseParams}`;

    const [autoRes, discoverRes] = await Promise.all([
      fetch(autoUrl),
      fetch(discoverUrl),
    ]);

    const autoItems = (await autoRes.json()).items ?? [];
    const discoverData = await discoverRes.json();

    const poiItems =
      discoverData.items?.map((item: any) => ({
        title: item.title,
        id: item.id,
        position: item.position,
        address: item.address,
        resultType: "place",
      })) ?? [];

    return [...autoItems, ...poiItems];
  },
};
