import { useEffect, useState } from "react";
import { hereService } from "@/Pages/Auth/Memories/services/here.service";

export function useHereMapKey() {
    const key = import.meta.env.VITE_HERE_API_KEY
    if (!key) {
        throw new Error(
            'VITE_HERE_API_KEY não está definido no seu .env — configure e reinicie o dev server'
        )
    }
    return key
}

export function useAutocomplete(apiKey: string, map?: L.Map | null) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            const items = await hereService.autocomplete(query, apiKey, map);
            setResults(items);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, apiKey, map]);

    return { query, setQuery, results, loading };
}

