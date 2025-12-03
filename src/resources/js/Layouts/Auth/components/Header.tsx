import Logo from "@/Components/Shared/Logo/Index";
import NotificationsMenu from "./nav/NotificationsMenu";
import FriendsMenu from "./nav/FriendsMenu";
import ProfileMenu from "./nav/ProfileMenu";

export default function Header() {
    return (
        <header
            className="
                relative z-20
                backdrop-blur-md 
                bg-[#3D2817]/70
                border-b border-[#E8DCC4]/30
                shadow-[0_4px_20px_rgba(61,40,23,0.12)]
            "
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></div>

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Logo />
                    <span className="hidden sm:block text-[#FDFBF7] font-semibold tracking-wide">
                        Lukisa
                    </span>
                </div>

                {/* Right menus */}

                <div className="flex items-center gap-4">
                    {/* Em Trabalho|Notifications */}
                    <NotificationsMenu />
                    {/* Finalizado, mas pode ser componentizado|Friends */}
                    <FriendsMenu />
                    {/* Ok|Profile */}
                    <ProfileMenu />
                </div>

            </div>
        </header>
    );
}