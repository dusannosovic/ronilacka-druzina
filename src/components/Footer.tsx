export default function Footer() {
  return (
    <footer className="bg-ocean text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">
          
          <div>
            <h3 className="text-xl font-bold mb-3">
              SU Ronilačka Družina
            </h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Otkrijte lepotu ronjenja i istražite podvodni svet sa nama na najlepšim lokacijama širom Srbije, Balkana i Evrope.
          </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90 uppercase text-xs tracking-wider">Klub</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#o-klubu" className="hover:text-white transition">O nama</a></li>
              <li><a href="#kursevi" className="hover:text-white transition">Kursevi</a></li>
              <li><a href="#zaroni" className="hover:text-white transition">Zaroni</a></li>
              <li><a href="#galerija" className="hover:text-white transition">Galerija</a></li>
            </ul>
          </div>

          {/* 4. DRUŠTVENE MREŽE */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90 uppercase text-xs tracking-wider">Pratite nas</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/ronilacka__druzina/"
                className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition border border-white/10"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580289594121"
                className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition border border-white/10"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90 uppercase text-xs tracking-wider">Pravni podaci</h4>
            <ul className="space-y-2 text-xs text-white/70 leading-snug">
              <li className="text-white/90 font-medium">Sportsko udruženje Ronilačka družina</li>
              <li>MB: 28758499</li>
              <li>PIB: 115232786</li>
              <li>Adresa: Požeška 33, Beograd, Srbija</li>
              <li className="pt-2">Email: ronilackadruzina@gmail.com</li>
            </ul>
          </div>


        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} SU Ronilačka Družina. Sva prava zadržana.</p>
          <div className="flex gap-6">
            <a href="/politika-privatnosti" className="hover:text-white transition">Politika privatnosti</a>
            <a href="/uslovi-koriscenja" className="hover:text-white transition">Uslovi korišćenja</a>
          </div>
        </div>
      </div>
    </footer>
  );
}