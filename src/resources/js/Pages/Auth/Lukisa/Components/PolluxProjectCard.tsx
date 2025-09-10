import React from 'react';
import { HardDrive } from 'lucide-react';
import ServiceCard from '@/Components/Shared/ServiceCard';

const PolluxProjectCard = () => {
    return (
        <ServiceCard
            icon={<HardDrive className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" style={{ color: "#403E34" }} />}
            title="PolluxProject"
            description="Seu espaço pessoal para organizar filmes, séries e arquivos importantes"
            badgeText="Em Breve"
            gradient="linear-gradient(135deg, #737065 0%, #403E34 100%)"
        />
    );
};

export default PolluxProjectCard;
