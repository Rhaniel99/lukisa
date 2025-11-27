import { Tag } from 'lucide-react';
import ServiceCard from '@/Components/Shared/ServiceCard';

const PolluxProjectCard = () => {
    return (
        <ServiceCard
            href={route("phamani.index")}
            icon={<Tag className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" style={{ color: "#403E34" }} />}
            title="Phamani"
            description="Seu espaço pessoal para organizar suas finanças pessoais"
            actionText="Acessar Phamani"
            gradient="linear-gradient(135deg, #737065 0%, #403E34 100%)"
        />
    );
};

export default PolluxProjectCard;
