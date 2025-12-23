import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Opšte ikonice
import { FaFacebookF, FaInstagram} from 'react-icons/fa'; // Brend ikonice

export default function Contact() {
  return (
    <section id="kontakt" className="w-full bg-ocean-light py-24 px-6 md:px-12 lg:px-24">
      <div className="w-full flex flex-col lg:flex-row gap-16">
        
        {/* LEVA STRANA - FORMA */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 rounded-2xl shadow-card">
          <h2 className="text-4xl font-bold text-ocean mb-2">Pošaljite nam poruku</h2>
          <p className="text-gray-500 mb-10">Imate pitanje o kursevima ili putovanjima? Tu smo da pomognemo.</p>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-ocean uppercase tracking-wider">Ime i Prezime</label>
                <input 
                  type="text" 
                  placeholder="Marko Marković"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-ocean uppercase tracking-wider">Email Adresa</label>
                <input 
                  type="email" 
                  placeholder="marko@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-ocean uppercase tracking-wider">Naslov poruke</label>
              <input 
                type="text" 
                placeholder="Npr. Upit za početni kurs ronjenja"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-ocean uppercase tracking-wider">Vaša Poruka</label>
              <textarea 
                rows={5}
                placeholder="Kako možemo da vam pomognemo?"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button className="flex items-center justify-center gap-3 bg-aqua text-ocean font-black py-4 px-10 rounded-lg hover:bg-ocean hover:text-white transition-all duration-300 group">
              POŠALJI PORUKU
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* DESNA STRANA - INFORMACIJE I SOCIALS */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-ocean mb-8">Gde se nalazimo?</h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-full text-aqua shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-ocean text-lg">Adresa</h4>
                <p className="text-gray-600">Bulevar Kralja Aleksandra 123,<br />11000 Beograd, Srbija</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-full text-aqua shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-ocean text-lg">Telefon</h4>
                <p className="text-gray-600">+381 60 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-full text-aqua shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-ocean text-lg">Email</h4>
                <p className="text-gray-600">info@ronilackadruzina.rs</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 mb-10" />

          <h4 className="text-ocean font-bold mb-6 uppercase tracking-widest text-sm">Pratite naše avanture</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center rounded-xl text-ocean hover:bg-aqua hover:text-white hover:-translate-y-1 transition-all shadow-sm">
              <FaInstagram size={28} />
            </a>
            <a href="https://facebook.com" target="_blank" className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center rounded-xl text-ocean hover:bg-aqua hover:text-white hover:-translate-y-1 transition-all shadow-sm">
              <FaFacebookF size={28} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}