import { Search } from "lucide-react";
import { useAutocomplete } from "@/Pages/Auth/Memories/hooks/useHereMap";
import { Map as LeafletMap } from 'leaflet';
import { hereService } from "@/Pages/Auth/Memories/services/here.service";


interface SearchBarProps {
    apiKey: string;
    map?: LeafletMap | null;
    onSelect: (place: { lat: number; lng: number; label: string }) => void;
}

export function SearchBar({ apiKey, map, onSelect }: SearchBarProps) {
    const { query, setQuery, results, loading } = useAutocomplete(apiKey, map);

    return (
        <div className="relative w-full">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar endereço, bairro ou memória..."
                className="w-full pl-12 pr-4 py-4 bg-[#F5EFE6]/95 backdrop-blur-md border-2 border-[#D4C5A9] rounded-2xl shadow-sm text-[#3D2817]"
            />

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7355]" />

            {results.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-[#D4C5A9] z-50 max-h-64 overflow-y-auto">
                    {loading && <div className="p-3 text-[#6B4E3D] text-sm">Carregando...</div>}

                    {!loading && results.map((item, i) => (
                        <div
                            key={i}
                            className="p-3 hover:bg-[#E8DCC4]/40 cursor-pointer text-[#3D2817]"
                            onClick={async () => {
                                let pos = item.position;

                                // Se não tiver position → faz lookup
                                if (!pos) {
                                    const data = await hereService.lookupPlace(item.id, apiKey);
                                    if (!data) {
                                        console.warn("Lookup falhou:", item);
                                        return;
                                    }
                                    pos = { lat: data.lat, lng: data.lng };
                                }

                                // Move o mapa
                                if (map) {
                                    map.flyTo(
                                        [pos.lat, pos.lng],
                                        16,
                                        { animate: true, duration: 0.8 }
                                    );
                                }

                                // Retorna o lugar para o Index
                                onSelect({
                                    lat: pos.lat,
                                    lng: pos.lng,
                                    label: item.title
                                });

                                setQuery("");
                            }}
                        >
                            <p className="font-medium">{item.title}</p>
                            {item.address && (
                                <p className="text-xs text-[#8B7355]">
                                    {item.address.label}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
