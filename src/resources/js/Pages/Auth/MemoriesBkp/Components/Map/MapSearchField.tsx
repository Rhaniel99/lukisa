import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, HereProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useHereApiKey } from "@/Hooks/useHereApiKey";

const cepRegex = /^\d{5}-?\d{3}$/;
const cepAndNumberRegex =
    /^(?<cep>\d{5}-?\d{3})[,]?\s*(?<number>\w+\d*|\d+)\s*$/;

const MapSearchField: React.FC = () => {
    const apiKey = useHereApiKey();
    const map = useMap();

    useEffect(() => {
        let searchControl: any = null;

        try {
            const provider = new HereProvider({
                params: {
                    apiKey: apiKey,
                },
            });

            // Override do método search
            provider.search = async ({ query }: { query: string }) => {
                console.log("Pesquisando por:", query);

                const currentCenter = map.getCenter();
                const proximity = `${currentCenter.lat},${currentCenter.lng}`;

                // Função helper para formatar a resposta da HERE
                const formatHereResponse = (hereData: any) => {
                    if (!hereData.items || hereData.items.length === 0) {
                        console.log("Nenhum resultado encontrado");
                        return [];
                    }

                    console.log(
                        "Resultados encontrados:",
                        hereData.items.length
                    );

                    return hereData.items.map((item: any) => ({
                        x: item.position.lng,
                        y: item.position.lat,
                        label: item.title,
                        bounds: item.mapView
                            ? [
                                  [item.mapView.south, item.mapView.west],
                                  [item.mapView.north, item.mapView.east],
                              ]
                            : null,
                        raw: item,
                    }));
                };

                const cepAndNumberMatch = query.match(cepAndNumberRegex);

                // CASO 1: Busca por CEP e Número
                if (cepAndNumberMatch?.groups) {
                    const { cep, number } = cepAndNumberMatch.groups;
                    try {
                        console.log("Buscando CEP + Número:", cep, number);

                        const viaCepResponse = await fetch(
                            `https://viacep.com.br/ws/${cep.replace(
                                "-",
                                ""
                            )}/json/`
                        );

                        if (!viaCepResponse.ok) {
                            throw new Error(
                                `Erro HTTP: ${viaCepResponse.status}`
                            );
                        }

                        const viaCepData = await viaCepResponse.json();

                        if (viaCepData.erro) {
                            throw new Error("CEP Inválido");
                        }

                        const preciseAddress = `${viaCepData.logradouro}, ${number}, ${viaCepData.localidade} - ${viaCepData.uf}`;

                        console.log("Endereço formatado:", preciseAddress);

                        const hereApiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
                            preciseAddress
                        )}&at=${proximity}&in=countryCode:BRA&apiKey=${apiKey}`;

                        const hereResponse = await fetch(hereApiUrl);

                        if (!hereResponse.ok) {
                            throw new Error(
                                `Erro HERE API: ${hereResponse.status}`
                            );
                        }

                        const hereData = await hereResponse.json();
                        return formatHereResponse(hereData);
                    } catch (error) {
                        console.error("Erro na busca por CEP + Número:", error);
                        return [];
                    }
                }
                // CASO 2: Busca por CEP único
                else if (cepRegex.test(query)) {
                    try {
                        console.log("Buscando CEP:", query);

                        const viaCepResponse = await fetch(
                            `https://viacep.com.br/ws/${query.replace(
                                "-",
                                ""
                            )}/json/`
                        );

                        if (!viaCepResponse.ok) {
                            throw new Error(
                                `Erro HTTP: ${viaCepResponse.status}`
                            );
                        }

                        const viaCepData = await viaCepResponse.json();

                        if (viaCepData.erro) {
                            throw new Error("CEP Inválido");
                        }

                        const address = `${viaCepData.logradouro}, ${viaCepData.localidade} - ${viaCepData.uf}`;

                        console.log("Endereço do CEP:", address);

                        const hereApiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
                            address
                        )}&at=${proximity}&in=countryCode:BRA&apiKey=${apiKey}`;

                        const hereResponse = await fetch(hereApiUrl);

                        if (!hereResponse.ok) {
                            throw new Error(
                                `Erro HERE API: ${hereResponse.status}`
                            );
                        }

                        const hereData = await hereResponse.json();
                        return formatHereResponse(hereData);
                    } catch (error) {
                        console.error("Erro na busca por CEP:", error);
                        return [];
                    }
                }
                // CASO 3: Busca de texto normal
                else {
                    try {
                        console.log("Busca de texto:", query);

                        const hereApiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
                            query
                        )}&at=${proximity}&in=countryCode:BRA&apiKey=${apiKey}`;

                        const hereResponse = await fetch(hereApiUrl);

                        if (!hereResponse.ok) {
                            throw new Error(
                                `Erro HERE API: ${hereResponse.status}`
                            );
                        }

                        const hereData = await hereResponse.json();
                        return formatHereResponse(hereData);
                    } catch (error) {
                        console.error("Erro na busca de texto:", error);
                        return [];
                    }
                }
            };

            searchControl = GeoSearchControl({
                provider: provider,
                style: "bar",
                showMarker: true,
                autoClose: true,
                searchLabel: "Endereço, bairro ou CEP...",
                keepResult: true,
                retainZoomLevel: false,
                animateZoom: true,
                autoComplete: true,
                autoCompleteDelay: 250,
            });

            console.log("Adicionando controle de busca ao mapa");
            map.addControl(searchControl);
        } catch (error) {
            console.error("Erro ao inicializar MapSearchField:", error);
        }

        // Cleanup
        return () => {
            if (searchControl && map) {
                try {
                    console.log("Removendo controle de busca do mapa");
                    map.removeControl(searchControl);
                } catch (error) {
                    console.error("Erro ao remover controle:", error);
                }
            }
        };
    }, [map, apiKey]);

    return null;
};

export default MapSearchField;
