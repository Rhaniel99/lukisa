import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useHereApiKey } from "@/Hooks/useHereApiKey";
import { LatLngExpression } from "leaflet";

interface HereMapProps {
    center: LatLngExpression;
    zoom?: number;
    children?: React.ReactNode;
}

export const HereMap: React.FC<HereMapProps> = ({
    center,
    zoom = 13,
    children,
}) => {
    const apiKey = useHereApiKey();
    const url = `https://maps.hereapi.com/v3/base/mc/{z}/{x}/{y}/png8?apiKey=${apiKey}`;
    const attribution =
        'Map data ©2025 <a href="https://www.here.com">HERE</a>';

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url={url} attribution={attribution} />
            {children}
        </MapContainer>
    );
};
