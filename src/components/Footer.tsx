export default function Footer() {
  return (
    <footer className="bg-ocean text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP */}
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* LOGO / ABOUT */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              RDB Diving Club
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Explore the underwater world with experienced instructors
              and unforgettable dive trips across the Adriatic and beyond.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-4">Club</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#programi" className="hover:text-white">Programi</a></li>
              <li><a href="#zaroni" className="hover:text-white">Putovanja</a></li>
              <li><a href="#galerija" className="hover:text-white">Galerija</a></li>
              <li><a href="#o nama" className="hover:text-white">O nama</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Email: info@rdbdiving.com</li>
              <li>Phone: +381 60 123 4567</li>
              <li>Serbia / Belgrade</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4">Follow us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ronilacka__druzina/"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580289594121"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Facebook"
              >
                📘
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} RK Ronilačka Družina. All rights reserved.
        </div>
      </div>
    </footer>
  );
}