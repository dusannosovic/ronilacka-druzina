export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Image - fiksiran na celu širinu i visinu */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070')] bg-cover bg-center">
        {/* Overlay koji daje dubinu i čini tekst čitljivim */}
        <div className="absolute inset-0 bg-ocean/50" />
      </div>

      {/* Hero Content - Samo tekst i dugmići */}
      <div className="relative z-10 w-full">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1]">
          Istražite Dubine <br />
          Sa <span className="text-aqua">Ronilačkom Družinom</span>
        </h1>
        
        <p className="mt-8 text-xl md:text-2xl text-white/90 font-light max-w-2xl">
          Licencirani Instruktori • Trening Zaroni • Putovanja • Druženje
        </p>

        <div className="mt-12 flex flex-wrap gap-6">
          <button className="bg-aqua text-ocean px-12 py-5 rounded-md font-black text-lg hover:bg-white transition-all transform hover:scale-105 shadow-2xl">
            PRIJAVI SE ZA ZARON
          </button>
          <button className="border-2 border-white text-white px-12 py-5 rounded-md font-black text-lg hover:bg-white/20 transition-all">
            POSTANI DEO DRUŽINE
          </button>
        </div>
      </div>
    </section>
  );
}