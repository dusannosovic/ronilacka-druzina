import { Camera, Anchor, Search, ShieldCheck } from 'lucide-react';

export default function UnderwaterWorks() {
  const services = [
    {
      title: "Podvodna Inspekcija",
      desc: "Detaljan foto i video izveštaj stanja temelja, brana i brodskih korita uz korišćenje specijalizovanih sondi i kamera.",
      icon: <Camera size={24} />,
    },
    {
      title: "Održavanje Plovila",
      desc: "Čišćenje trupa i propelera na licu mesta. Efikasno uklanjanje bio-naslaga radi smanjenja potrošnje goriva.",
      icon: <Anchor size={24} />,
    },
    {
      title: "Pretraga i Izvlačenje",
      desc: "Lociranje i vađenje potonulih objekata i plovila uz pomoć najsavremenije opreme za pretragu dna.",
      icon: <Search size={24} />,
    }
  ];

  return (
    <section id="radovi" className="scroll-mt-24 w-full bg-ocean-light py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      {/* Diskretna pozadina sa tačkicama */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#4FD1C5 0.5px, transparent 0.5px)", backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* HEADER SEKCIJE */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-[#0B2C5F] uppercase tracking-tighter leading-none mb-8">
            Podvodni <span className="text-aqua">Radovi</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base leading-relaxed">
            Naša stručnost u tehničkom ronjenju omogućava nam pružanje usluga vrhunskog kvaliteta za industrijske i privatne klijente.
          </p>
        </div>

        {/* USLUGE GRID - Bele kartice koje "iskaču" iz sive pozadine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="group bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
              <div className="w-14 h-14 bg-ocean-light rounded-2xl flex items-center justify-center text-aqua mb-8 group-hover:bg-aqua group-hover:text-white transition-all shadow-sm">
                {service.icon}
              </div>
              <h4 className="text-xl font-black text-[#0B2C5F] uppercase tracking-tight mb-4 group-hover:text-aqua transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow font-medium">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* TRUST BANNER - Adaptiran (Bela unutrašnjost na sivoj podlozi) */}
<div className="bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 border border-gray-200/60">
  <div className="max-w-2xl text-center lg:text-left">
    <div className="flex items-center justify-center lg:justify-start gap-2 text-aqua mb-4">
      <ShieldCheck size={20} />
      <span className="font-bold uppercase text-[10px] tracking-widest">Garantovan kvalitet</span>
    </div>
    
    <h3 className="text-3xl font-black text-[#0B2C5F] uppercase tracking-tighter mb-4 leading-none">
      Poverenje gradimo kroz rezultate
    </h3>
    
    <p className="text-gray-600 font-medium text-lg leading-relaxed">
      Veliki broj zadovoljnih klijenata, od marina i vlasnika jahti do velikih infrastrukturnih firmi, 
      svakodnevno se oslanja na našu stručnost. Svaki završeni projekat je potvrda naše posvećenosti.
    </p>
  </div>
  
  {/* Dugme bez senke, sa čistim prelazom boja */}
  <a 
    href="#kontakt" 
    className="bg-[#0B2C5F] text-white px-14 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-aqua hover:text-[#0B2C5F] transition-all shrink-0"
  >
    Zatraži ponudu
  </a>
</div>

      </div>
    </section>
  );
}