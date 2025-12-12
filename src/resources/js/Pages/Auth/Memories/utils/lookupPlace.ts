export async function lookupPlace(id: string, apiKey: string) {
    const url = `https://lookup.search.hereapi.com/v1/lookup?id=${encodeURIComponent(id)}&apiKey=${apiKey}`;

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
        label: data.title || data.address?.label || "Local"
    };
}
