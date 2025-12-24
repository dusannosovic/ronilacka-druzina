function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-center gap-4 bg-ocean-light px-8 py-4 rounded-2xl border border-transparent hover:border-aqua transition-all duration-300 shadow-sm">
      <span className="text-3xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-2xl font-black text-ocean leading-none">{value}</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{label}</span>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="o-klubu" className="w-full bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="w-full flex flex-col items-center text-center max-w-4xl mx-auto">
        
        {/* MALI LABEL IZNAD NASLOVA */}
        <div className="flex items-center gap-2 text-aqua mb-4">
          <div className="h-[2px] w-8 bg-aqua"></div>
          <span className="font-bold tracking-[0.3em] uppercase text-xs">Upoznajte nas</span>
          <div className="h-[2px] w-8 bg-aqua"></div>
        </div>

        {/* GLAVNI NASLOV */}
        <h2 className="text-5xl md:text-6xl font-black text-ocean mb-8 uppercase tracking-tighter">
          Ronilačka Družina
        </h2>

        {/* OPIS - Veći i elegantniji font */}
        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light mb-16 italic">
          "Osnovana 2024. godine, naša družina spaja strast, bezbednost i avanturu. 
          Od potpunih početnika do iskusnih ronilaca, zajedno istražujemo 
          čuda podvodnog sveta."
        </p>

        {/* STATISTIKA (IKONICE) - Poređane u red */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <Stat label="Godina iskustva" value="10+" icon="📅" />
          <Stat label="Uspešnih zarona" value="200+" icon="🤿" />
          <Stat label="Sertifikovanih" value="100%" icon="🛡️" />
        </div>

        {/* DEKORATIVNI ELEMENT NA DNU (Opciono) */}
        <div className="mt-20 w-24 h-1 bg-aqua opacity-30 rounded-full"></div>
      </div>
    </section>
  );
}