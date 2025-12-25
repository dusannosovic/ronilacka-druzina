import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { api } from '../lib/api'; // tvoja axios instanca

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Slanje u Strapi (v5 format zahteva { data: { ... } })
      await api.post('/messages', {
        data: formData
      });
      setStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' }); // Reset
    } catch (error) {
      console.error("Greška pri slanju poruke:", error);
      setStatus('error');
    }
  };

  return (
    <section id="kontakt" className="w-full bg-ocean-light py-24 px-6 md:px-12 lg:px-24">
      <div className="w-full flex flex-col lg:flex-row gap-16">
        
        {/* LEVA STRANA - FORMA */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 rounded-2xl shadow-card relative overflow-hidden">
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle size={64} className="text-aqua mb-6" />
              <h2 className="text-3xl font-bold text-ocean mb-2">Poruka je poslata!</h2>
              <p className="text-gray-500">Hvala vam na interesovanju. Naš tim će vas kontaktirati uskoro.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-aqua font-bold hover:underline"
              >
                Pošalji još jednu poruku
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold text-ocean mb-2">Pošaljite nam poruku</h2>
              <p className="text-gray-500 mb-10">Želite da postanete član? Imate pitanje o kursevima ili putovanjima? Tu smo da pomognemo.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Ime i Prezime</label>
                    <input 
                      required
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Marko Marković"
                      className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Email Adresa</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="marko@email.com"
                      className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Naslov poruke</label>
                  <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Npr. Upit za početni kurs ronjenja"
                    className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Vaša Poruka</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Kako možemo da vam pomognemo?"
                    className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-3 bg-aqua text-ocean font-black py-5 px-10 rounded-xl hover:bg-ocean hover:text-white transition-all duration-300 group disabled:opacity-50"
                >
                  {status === 'loading' ? "SLANJE..." : "POŠALJI PORUKU"}
                  {status !== 'loading' && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-bold text-center">Došlo je do greške. Pokušajte ponovo.</p>
                )}
              </form>
            </>
          )}
        </div>

        {/* DESNA STRANA - INFORMACIJE (Ostaje isto) */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-ocean mb-8 leading-tight">Gde se nalazimo?</h2>
          
          <div className="space-y-8 mb-12">
             <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-2xl text-aqua shrink-0 shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-ocean text-lg uppercase tracking-tight">Adresa</h4>
                <p className="text-gray-500 font-medium">11000 Beograd, Srbija</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-2xl text-aqua shrink-0 shadow-sm">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-ocean text-lg uppercase tracking-tight">Email</h4>
                <p className="text-gray-500 font-medium">ronilackadruzina@gmail.com</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 mb-10" />

          <h4 className="text-ocean font-black mb-6 uppercase tracking-[0.2em] text-xs opacity-50">Pratite naše avanture</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/ronilacka__druzina/" target="_blank" className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center rounded-2xl text-ocean hover:bg-aqua hover:text-white hover:-translate-y-1 transition-all shadow-card group">
              <FaInstagram size={28} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61580289594121" target="_blank" className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center rounded-2xl text-ocean hover:bg-aqua hover:text-white hover:-translate-y-1 transition-all shadow-card group">
              <FaFacebookF size={28} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}