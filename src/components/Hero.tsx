export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=60&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-ocean/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] uppercase tracking-tighter">
          Istražite Dubine <br />
          Sa <span className="text-aqua">Ronilačkom Družinom</span>
        </h1>
        
        <p className="mt-8 text-xl md:text-2xl text-white/90 font-light max-w-2xl">
          Licencirani Instruktori • Trening Zaroni • Putovanja • Druženje
        </p>

        <div className="mt-12 flex flex-wrap gap-6">
          {/* PROMENJENO: Button je postao <a> tag koji vodi na #zaroni */}
          <a 
            href="#zaroni" 
            className="bg-aqua text-ocean px-12 py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center"
          >
            PRIJAVI SE ZA ZARON
          </a>

          {/* Opciono: Dugme koje vodi na kontakt formu na dnu */}
          <a 
            href="#kontakt" 
            className="border-2 border-white text-white px-12 py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all flex items-center justify-center"
          >
            POSTANI DEO DRUŽINE
          </a>
        </div>
      </div>
    </section>
  );
}