import React from "react";

interface NavItemProps {
    tab: string;
    icon: React.ComponentType<any>;
    label: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const NavItem = ({
    tab,
    icon: Icon,
    label,
    activeTab,
    setActiveTab,
}: NavItemProps) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left w-full transition-colors ${
            activeTab === tab ? "font-semibold" : "hover:bg-opacity-80"
        }`}
        style={{
            backgroundColor: activeTab === tab ? "#403E34" : "transparent",
            color: activeTab === tab ? "#D9D7C5" : "#0D0000",
        }}
    >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </button>
);
