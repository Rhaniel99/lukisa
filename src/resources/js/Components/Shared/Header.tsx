import React from "react";
import { Link } from "@inertiajs/react";
import logo from "/public/img/cat-l.svg";

interface LayoutProps {
    children: React.ReactNode;
}

export function Header({ children }: LayoutProps) {
    return (
        <header className="px-6 py-3 flex items-center justify-between border-b border-lukisa-cream/50 bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="flex items-center space-x-6">
                <Link
                    href={route("home")}
                    className="transition-transform duration-200 hover:scale-105"
                >
                    <img src={logo} alt="Lukisa Logo" className="h-8 w-auto" />
                </Link>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
                {children}
            </div>
        </header>
    );
}
