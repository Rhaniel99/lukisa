import { Link } from "@inertiajs/react";
import logo from "/public/img/cat-l.svg";

export function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-lukisa-cream shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Lukisa Logo" width={120} height={40} className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href={route("form.login")} className="text-lukisa-brown hover:text-lukisa-dark transition-colors font-medium">
            Entrar
          </Link>
          <Link
            href={route("form.signup")}
            className="bg-lukisa-sage text-white px-4 py-2 rounded-lg hover:bg-lukisa-brown transition-colors font-medium"
          >
            Crie sua conta
            </Link>
        </nav>
      </div>
    </header>
  )
}
