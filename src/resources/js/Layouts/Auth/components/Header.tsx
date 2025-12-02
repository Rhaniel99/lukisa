import Logo from "@/Components/Shared/Logo/Index";
import NotificationsMenu from "./nav/NotificationsMenu";
import FriendsMenu from "./nav/FriendsMenu";
import ProfileMenu from "./nav/ProfileMenu";

export default function Header() {
    return (
        <header className="bg-[#F5EFE6]/80 backdrop-blur-sm border-b-2 border-[#E8DCC4]">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                
                <div className="flex items-center gap-3">
                    <Logo />
                </div>

                <div className="flex items-center gap-4">
                    <NotificationsMenu />
                    <FriendsMenu />
                    <ProfileMenu />
                </div>
            </div>
        </header>
    );
}
