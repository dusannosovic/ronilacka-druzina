import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigate, useParams } from 'react-router-dom';
import type { DiveTrip } from '../types/strapi';
import { Calendar, Clock, MapPin, Users, Send, ArrowLeft, Info, Tag, Anchor } from 'lucide-react';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<DiveTrip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatski skrol na vrh stranice
    window.scrollTo(0, 0);
    
    api.get<{ data: DiveTrip }>(`/dive-trips/${id}?populate=*`)
      .then(res => setTrip(res.data.data))
      .catch(err => console.error("Greška pri učitavanju:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-light">
        <div className="text-ocean font-black animate-pulse uppercase tracking-[0.3em]">Učitavanje...</div>
      </div>
    );
  }

  // Formatiranje vremena i datuma
  const formattedDateTime = new Date(trip.date).toLocaleString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + 'h';

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-32 pb-24 px-6 md:px-12 lg:px-24">
      
      {/* Dugme za povratak */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-ocean font-bold mb-10 hover:text-aqua transition-colors uppercase text-xs tracking-widest"
      >
        <ArrowLeft size={16} /> Nazad na listu
      </button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEVA KOLONA: FORMA (60%) */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-card border border-gray-100">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-ocean mb-2">Prijavi se za zaron</h2>
            <p className="text-gray-400 font-medium tracking-tight">Ostavite vaše podatke, kontaktiraćemo vas radi potvrde termina.</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Ime</label>
                <input type="text" className="w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 focus:ring-aqua transition-all" placeholder="Marko" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Prezime</label>
                <input type="text" className="w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 focus:ring-aqua transition-all" placeholder="Marković" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Email</label>
                <input type="email" className="w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 focus:ring-aqua transition-all" placeholder="marko@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Telefon</label>
                <input type="text" className="w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 focus:ring-aqua transition-all" placeholder="+381 60 123 456" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Broj osoba</label>
              <div className="relative">
                <Users className="absolute left-5 top-5 text-gray-400" size={20} />
                <input type="number" min="1" className="w-full p-5 pl-14 bg-ocean-light rounded-2xl outline-none focus:ring-2 focus:ring-aqua transition-all" placeholder="1" />
              </div>
            </div>

            <button className="w-full bg-aqua text-ocean font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-ocean hover:text-white transition-all shadow-xl shadow-aqua/20 flex items-center justify-center gap-4 group">
              POTVRDI REZERVACIJU 
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* DESNA KOLONA: VELIKI PLAVI PROZOR SA PODACIMA (40%) */}
        <div className="w-full lg:w-2/5 sticky top-32">
          <div className="bg-[#0B2C5F] text-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
            
            {/* Dekorativni detalj u pozadini */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aqua opacity-5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 leading-tight text-white border-b border-white/10 pb-6">
                {trip.title}
              </h3>
              
              <div className="space-y-8 mb-10">
                {/* Vreme i Datum */}
                <div className="flex flex-col gap-1">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={12} /> Datum i Vreme polaska
                  </span>
                  <p className="text-lg font-bold">{formattedDateTime}</p>
                </div>

                {/* Detalji: Trajanje i Težina */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} /> Trajanje
                    </span>
                    <p className="font-bold">{trip.duration}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Anchor size={12} /> Težina
                    </span>
                    <p className="font-bold uppercase tracking-tight">{trip.difficulty}</p>
                  </div>
                </div>

                {/* Cena */}
                <div className="flex flex-col gap-1">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} /> Cena po osobi
                  </span>
                  <p className="text-3xl font-black text-aqua">{trip.price} RSD</p>
                </div>

                {/* Opis */}
                <div className="flex flex-col gap-1 pt-4">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                    <Info size={12} /> O ovom izletu
                  </span>
                  <p className="text-sm leading-relaxed text-white/70 italic font-medium">
                    "{trip.description}"
                  </p>
                </div>
              </div>

              {/* Lokacija dugme */}
              <div className="pt-6 border-t border-white/10">
                <a 
                  href={trip.locationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-aqua text-ocean p-3 rounded-xl shadow-lg shadow-aqua/20">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-aqua uppercase tracking-widest">Lokacija</span>
                      <span className="block text-sm font-bold">Otvori na mapi</span>
                    </div>
                  </div>
                  <span className="text-aqua group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Dodatna info kartica ispod glavnog prozora (Opciono) */}
          <div className="mt-6 flex items-center gap-4 px-8 text-ocean opacity-50">
            <Info size={16} />
            <p className="text-[10px] font-bold uppercase tracking-widest leading-snug">
              Nakon prijave, naš tim će vas kontaktirati u najkraćem roku radi provere slobodnih mesta.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}