import { Link } from "@inertiajs/react";
import logo from "/public/img/cat-l.svg";

export function Header() {
    return (
        <div className="text-center mb-8">
            <Link href={route("home")}>
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <img
                        src={logo}
                        alt="Lukisa Logo"
                        width={150}
                        height={50}
                        className="mx-auto"
                    />
                </div>
            </Link>
        </div>
    );
}
