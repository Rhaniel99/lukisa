import logo from "/public/img/cat-l.svg";

export default function Logo() {
    return (
        <div className="w-10 h-10 bg-[#FDFBF7] rounded-xl shadow-md flex items-center justify-center border border-[#E8DCC4]/40">
            <img src={logo} className="w-6 h-6 opacity-90" />
        </div>
    );
}