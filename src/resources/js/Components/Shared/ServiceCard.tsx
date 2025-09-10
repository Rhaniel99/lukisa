import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionText?: string;
    badgeText?: string;
    href?: string;
    onClick?: () => void;
    gradient: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    icon,
    title,
    description,
    actionText,
    badgeText,
    href,
    onClick,
    gradient,
}) => {
    const cardContent = (
        <Card
            className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group h-64 relative"
            style={{ backgroundColor: "#BFBAA8" }}
        >
            <CardContent className="p-0 h-full relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-br opacity-20"
                    style={{ backgroundImage: gradient }}
                />
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div>
                        {icon}
                        <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: "#0D0000" }}
                        >
                            {title}
                        </h3>
                        <p style={{ color: "#737065" }}>{description}</p>
                    </div>
                    {actionText && (
                        <div
                            className="flex items-center text-sm font-medium"
                            style={{ color: "#403E34" }}
                        >
                            {actionText}
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </div>
                    )}
                    {badgeText && (
                         <div className="flex items-center justify-between">
                            <span
                                className="text-xs px-3 py-1 rounded-full font-medium"
                                style={{
                                    backgroundColor: "#403E34",
                                    color: "#D9D7C5",
                                }}
                            >
                                {badgeText}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    if (href) {
        return <Link href={href}>{cardContent}</Link>;
    }

    return <div onClick={onClick}>{cardContent}</div>;
};

export default ServiceCard;
