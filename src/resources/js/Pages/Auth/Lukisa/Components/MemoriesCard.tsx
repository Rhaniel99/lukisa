import React from 'react';
import { Map } from 'lucide-react';
import ServiceCard from '@/Components/Shared/ServiceCard';

const MemoriesCard = () => {
    return (
        <ServiceCard
            href={route("memo.maps.index")}
            icon={<Map className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" style={{ color: "#403E34" }} />}
            title="Memories"
            description="Reviva e compartilhe suas memórias em um mapa interativo"
            actionText="Acessar Memories"
            gradient="linear-gradient(135deg, #403E34 0%, #737065 100%)"
        />
    );
};

export default MemoriesCard;
