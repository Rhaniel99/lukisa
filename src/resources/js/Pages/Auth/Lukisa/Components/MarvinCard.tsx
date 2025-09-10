import React from 'react';
import { Bot } from 'lucide-react';
import ServiceCard from '@/Components/Shared/ServiceCard';

interface MarvinCardProps {
    onClick: () => void;
}

const MarvinCard: React.FC<MarvinCardProps> = ({ onClick }) => {
    return (
        <ServiceCard
            onClick={onClick}
            icon={<Bot className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" style={{ color: "#403E34" }} />}
            title="Marvin"
            description="Seu assistente pessoal de Inteligência Artificial"
            actionText="Acessar Marvin"
            gradient="linear-gradient(135deg, #403E34 0%, #737065 100%)"
        />
    );
};

export default MarvinCard;
