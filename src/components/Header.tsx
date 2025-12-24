import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Početna", link: "/" },
    { name: "O nama", link: "/#o-klubu" },
    { name: "Kursevi", link: "/#kursevi" },
    { name: "Zaroni", link: "/#zaroni" },
    { name: "Galerija", link: "/#galerija" },
    { name: "Kontakt", link: "/#kontakt" }
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-[100] bg-[#0B2C5F] shadow-2xl border-b border-white/10">
      <div className="w-full flex items-center justify-between px-6 md:px-12 py-2"> {/* Još uža visina: py-2 */}
        
        {/* LOGO SEKCIJA */}
        <Link to="/" className="flex items-center gap-3 shrink-0 py-1">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-12 w-12 object-contain" 
          />
          <div className="flex flex-col">
            <span className="font-black text-white text-lg leading-none uppercase tracking-tighter">
              Ronilačka družina
            </span>
            <span className="text-aqua text-[9px] font-black tracking-[0.3em] uppercase">
              Belgrade • Serbia
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGACIJA - Prikazuje se tek iznad 1400px */}
        <nav className="hidden desktop:flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-white text-[11px] font-black uppercase tracking-[0.2em] hover:text-aqua transition-all"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* TASTER ZA MENI - Sada se vidi na svemu što je MANJE od 1400px */}
        <button 
          onClick={toggleMenu}
          className="desktop:hidden p-2 text-white hover:text-aqua transition-colors"
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILNI / TABLET DROPDOWN (Ispod 1400px) */}
      <div 
        className={`desktop:hidden absolute top-full left-0 w-full bg-[#0B2C5F] shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100 border-b border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 py-12">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={toggleMenu}
              className="text-white text-sm font-black uppercase tracking-[0.3em] hover:text-aqua transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}