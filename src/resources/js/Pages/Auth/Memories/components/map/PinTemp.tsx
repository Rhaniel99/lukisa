import { Marker } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin, Plus } from "lucide-react";

interface TempPinCozyProps {
    lat: number;
    lng: number;
    label: string;
    onClick: () => void;
}

export default function PinTemp({ lat, lng, label, onClick }: TempPinCozyProps) {
    // Paleta Cozy Blue:
    // Principal: #4A6C7C (Azul Petróleo Suave)
    // Contraste: #F5EFE6 (Creme claro - igual ao seu tema)

    const html = renderToStaticMarkup(
        <div className="relative group cursor-pointer" style={{ transform: "translate(-50%, -100%)" }}>

            {/* Tooltip (Sempre visível ou no hover, aqui deixei hover para não poluir) */}
            <div className="absolute bottom-[120%] left-1/2 -translate-x-1/2 
                    px-3 py-1.5 bg-[#4A6C7C] text-white rounded-xl shadow-lg 
                    border border-[#364F5B] opacity-0 group-hover:opacity-100 
                    transition-opacity whitespace-nowrap pointer-events-none z-30">
                <span className="text-xs font-bold">Criar memória aqui?</span>
            </div>

            {/* Pin Body */}
            <div className="relative z-20 flex flex-col items-center">
                {/* Circle */}
                <div className="w-10 h-10 bg-[#4A6C7C] rounded-full shadow-xl 
                        flex items-center justify-center border-2 border-[#F5EFE6] 
                        transition-transform hover:scale-110 animate-bounce-slow">

                    {/* Ícone combinado */}
                    <div className="relative">
                        <MapPin className="w-5 h-5 text-[#F5EFE6]" />
                        <div className="absolute -top-1 -right-1 bg-[#F5EFE6] rounded-full p-0.5">
                            <Plus className="w-2 h-2 text-[#4A6C7C] stroke-[4]" />
                        </div>
                    </div>
                </div>

                {/* Stem (Haste) */}
                <div className="w-1 h-3 bg-[#4A6C7C] -mt-[1px]" />
            </div>

            {/* Ping Background (Azul) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-10 h-10 bg-[#4A6C7C] rounded-full animate-ping opacity-30 
                      z-10 pointer-events-none" />
        </div>
    );

    const icon = L.divIcon({
        html,
        className: "", // Remove classes padrão do Leaflet
        iconSize: [40, 50],
        iconAnchor: [20, 50], // Centraliza a ponta do pin
    });

    return (
        <Marker
            position={[lat, lng]}
            icon={icon}
            zIndexOffset={1000} // Garante que o pin temporário fique acima dos outros
            eventHandlers={{
                click: () => onClick?.()
            }}
        />
    );
}