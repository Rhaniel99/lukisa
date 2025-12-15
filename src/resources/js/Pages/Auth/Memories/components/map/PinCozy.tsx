import { Marker } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";

interface CozyMapPinProps {
    lat: number;
    lng: number;
    label?: string;
    onClick?: () => void;
}

export default function PinCozy({ lat, lng, label, onClick }: CozyMapPinProps) {
    const html = renderToStaticMarkup(
        <div className="relative group cursor-pointer" style={{ transform: "translate(-50%, -100%)" }}>

            {/* Tooltip */}
            {label && (
                <div className="absolute bottom-[120%] left-1/2 -translate-x-1/2 
                        px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg 
                        border border-[#E8DCC4] opacity-0 group-hover:opacity-100 
                        transition-opacity whitespace-nowrap pointer-events-none z-30">
                    <span className="text-xs font-bold text-[#3D2817]">{label}</span>
                </div>
            )}

            {/* Pin */}
            <div className="relative z-20 flex flex-col items-center">
                {/* Circle */}
                <div className="w-10 h-10 bg-[#6B4E3D] rounded-full shadow-xl 
                        flex items-center justify-center border-2 border-[#F5EFE6] 
                        transition-transform group-hover:scale-110">
                    <MapPin className="w-5 h-5 text-[#F5EFE6]" />
                </div>

                {/* Stem */}
                <div className="w-1 h-3 bg-[#6B4E3D] -mt-[1px]" />
            </div>

            {/* Ping Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 
                      w-10 h-10 bg-[#6B4E3D] rounded-full animate-ping opacity-20 
                      z-10 pointer-events-none" />
        </div>
    );

    const icon = L.divIcon({
        html,
        className: "",
        iconSize: [40, 50],
        iconAnchor: [20, 50],
    });

    return (
        <Marker
            position={[lat, lng]}
            icon={icon}
            eventHandlers={{
                click: () => onClick?.()
            }}
        />
    );
}
