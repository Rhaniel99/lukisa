export async function hereAutocomplete(query: string, apiKey: string, map?: L.Map | null) {

    let inside = "";

    if (map) {
        const center = map.getCenter();
        inside = `&in=circle:${center.lat},${center.lng};r=30000`;
    }

    const baseParams = `q=${encodeURIComponent(query)}${inside}&apiKey=${apiKey}`;

    // ---- Autocomplete (endereços + alguns lugares) ----
    const autoUrl = `https://autocomplete.search.hereapi.com/v1/autocomplete?${baseParams}`;
    const autoRes = await fetch(autoUrl);
    const autoItems = (await autoRes.json()).items ?? [];

    // ---- Discover (lojas, comércios, pontos de interesse) ----
    const discoverUrl = `https://discover.search.hereapi.com/v1/discover?${baseParams}`;
    const discoverRes = await fetch(discoverUrl);
    const discoverData = await discoverRes.json();

    // Transform discover POIs to the same structure
    const poiItems = (discoverData.items ?? []).map((item: any) => ({
        title: item.title,
        id: item.id,
        position: item.position,
        address: item.address,
        resultType: "place"
    }));

    // ---- Merge results, avoid duplicates ----
    const merged = [...autoItems, ...poiItems];

    return merged;
}
