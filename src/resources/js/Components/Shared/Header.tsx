import { Link } from "@inertiajs/react";
import logo from "/public/img/logo.svg";

export function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-lukisa-cream shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Lukisa Logo" width={40} height={40} className="w-10 h-10" />
          <span className="text-2xl font-bold text-lukisa-dark">Lukisa</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/login" className="text-lukisa-brown hover:text-lukisa-dark transition-colors font-medium">
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-lukisa-sage text-white px-4 py-2 rounded-lg hover:bg-lukisa-brown transition-colors font-medium"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}
