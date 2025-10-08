import React from "react";
import { Link } from "@inertiajs/react";
import logo from "/public/img/cat-l.svg";

interface LayoutProps {
    children: React.ReactNode;
}

export function Header({ children }: LayoutProps) {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-sm border-b border-[#C5C3B1]">
            <div className="flex items-center gap-2">
                <Link
                    href={route("home")}
                    className="transition-transform duration-200 hover:scale-105"
                >
                    <img src={logo} alt="Lukisa Logo" className="h-8 w-auto" />
                </Link>
            </div>
            <div className="flex items-center gap-2">
                {children}
            </div>
        </header>
    );
}
