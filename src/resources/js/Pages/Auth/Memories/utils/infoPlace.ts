export async function getPlaceInfo(lat: number, lng: number, apiKey: string) {
    // 1) BROWSE COM RAIO PEQUENO (POI EXATO)
    const browseUrl =
        `https://browse.search.hereapi.com/v1/browse?` +
        `at=${lat},${lng}&in=circle:${lat},${lng};r=25&limit=1&apiKey=${apiKey}`;

    try {
        const res = await fetch(browseUrl);
        const data = await res.json();

        if (data.items?.length > 0) {
            const item = data.items[0];
            return {
                name: item.title ?? null,
                address: item.address?.label ?? null,
                source: "browse-radius"
            };
        }
    } catch {
        console.warn("Browse com raio falhou → fallback para reverse…");
    }

    // 2) FALLBACK: SÓ ENDEREÇO
    const revUrl =
        `https://revgeocode.search.hereapi.com/v1/revgeocode?` +
        `at=${lat},${lng}&lang=pt-BR&apiKey=${apiKey}`;

    try {
        const revRes = await fetch(revUrl);
        const revData = await revRes.json();

        if (revData.items?.length > 0) {
            const item = revData.items[0];
            return {
                name: null,
                address: item.address?.label ?? null,
                source: "reverse"
            };
        }
    } catch {}

    return { name: null, address: null, source: "none" };
}
