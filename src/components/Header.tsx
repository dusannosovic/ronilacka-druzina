import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0B2C5F] text-white shadow-xl border-b border-white/5">
      <div className="w-full flex items-center justify-between px-6 md:px-12 py-8">
        
        {/* LOGO SEKCIJA */}
        <div className="flex items-center gap-4">
          <img 
            src={logo} 
            className="h-16 w-16 object-contain" // Tvoj kvadratni logo
            alt="Logo"
          />
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl leading-none uppercase tracking-tighter">
              RK Ronilačka družina
            </span>
            <span className="text-aqua text-[10px] font-bold tracking-[0.3em] uppercase">
              Beograd • Srbija
            </span>
          </div>
        </div>

        {/* NAVIGACIJA */}
        <nav className="hidden md:flex gap-10">
          {["Početna","O nama" , "Zaroni", "Kursevi", "Galerija", "Kontakt"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-sm font-bold uppercase tracking-widest hover:text-aqua transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}