import logo from "/public/img/cat-l.svg";

export default function Logo() {
    return (
        <div className="w-12 h-12 bg-[#E8DCC4] rounded-2xl flex items-center justify-center shadow-md">
            <img src={logo} alt="Lukisa Logo" />
        </div>
    );
}