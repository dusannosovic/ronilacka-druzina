import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Dodat useLocation
import type { DiveTrip } from '../types/strapi';
import { Calendar, Clock, MapPin, Users, Send, ArrowLeft, Info, Tag, Anchor, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Inicijalizujemo 'trip' odmah iz state-a (ako postoji)
  const [trip, setTrip] = useState<DiveTrip | null>(location.state?.tripData || null);
  
  // 2. Loading je 'false' ako smo već dobili podatke kroz parametre
  const [loading, setLoading] = useState(!location.state?.tripData);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    people: 1
  });
  
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 3. API poziv se izvršava SAMO ako korisnik osveži stranicu (nema state-a)
    if (!trip) {
      api.get<{ data: DiveTrip }>(`/dive-trips/${id}?populate=*`)
        .then(res => setTrip(res.data.data))
        .catch(err => console.error("Greška pri učitavanju:", err))
        .finally(() => setLoading(false));
    }
  }, [id, trip]);

  // Validacija
  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ime je obavezno";
    if (!formData.lastName.trim()) newErrors.lastName = "Prezime je obavezno";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Email nije ispravan";
    if (formData.phone.length < 6) newErrors.phone = "Unesite telefon";
    if (formData.people < 1) newErrors.people = "Minimalno 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formattedDateTime = trip?.date ? new Date(trip.date).toLocaleString('sr-RS', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) + 'h' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.post('/bookings', {
        data: {
          ...formData,
          tripTitle: trip?.title,
          tripDate: formattedDateTime 
        }
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 4000);
    } catch (err) {
      alert("Došlo je do greške pri slanju.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-light">
        <div className="text-ocean font-black animate-pulse uppercase tracking-[0.3em]">Učitavanje...</div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-32 pb-24 px-6 md:px-12 lg:px-24">
<button 
  onClick={() => navigate('/#zaroni')} // Vodi na home i traži sekciju #zaroni
  className="flex items-center gap-2 text-ocean/60 font-black mb-10 hover:text-aqua transition-all uppercase text-[10px] tracking-widest group"
>
  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
  Nazad na listu zarona
</button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEVA KOLONA: INFO (Sticky iznad 1400px) */}
        <div className="w-full lg:w-2/5 desktop:sticky desktop:top-32 order-2 lg:order-1">
          <div className="bg-[#0B2C5F] text-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aqua opacity-5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 border-b border-white/10 pb-6 leading-tight">{trip.title}</h3>
              <div className="space-y-8 mb-10">
                <div className="flex flex-col gap-1">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Calendar size={12} /> Datum i Vreme polaska</span>
                  <p className="text-lg font-bold">{formattedDateTime}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Clock size={12} /> Trajanje</span>
                    <p className="font-bold">{trip.duration}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Anchor size={12} /> Težina</span>
                    <p className="font-bold uppercase tracking-tight">{trip.difficulty}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Tag size={12} /> Cena po osobi</span>
                  <p className="text-3xl font-black text-aqua">{trip.price} RSD</p>
                </div>
                <div className="flex flex-col gap-1 pt-4 border-t border-white/5">
                   <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Info size={12} /> O ovom izletu</span>
                   <p className="text-sm text-white/60 italic leading-relaxed">"{trip.description}"</p>
                </div>
              </div>
              <a href={trip.locationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className="bg-aqua text-ocean p-3 rounded-xl shadow-lg shadow-aqua/20"><MapPin size={20} /></div>
                  <span className="font-bold">Otvori lokaciju na mapi</span>
                </div>
                <span className="text-aqua group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* DESNA KOLONA: FORMA */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-card border border-gray-100 order-1 lg:order-2 relative overflow-hidden">
          {isSuccess ? (
            <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle size={80} className="text-aqua mx-auto mb-6" />
              <h2 className="text-3xl font-black text-ocean mb-4 uppercase tracking-tighter">Uspešna prijava!</h2>
              <p className="text-gray-500 font-medium">Hvala vam na poverenju. Naš tim će vas uskoro kontaktirati.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-4xl font-black text-ocean mb-2 uppercase tracking-tighter">Prijavi se</h2>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Molimo popunite sva polja ispod</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Ime</label>
                    <input 
                      type="text" 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.firstName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="Ime" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Prezime</label>
                    <input 
                      type="text" 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.lastName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="Prezime" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.email ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="email@primer.com" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Telefon</label>
                    <input 
                      type="text" 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.phone ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="+381..." 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Broj osoba</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-5 text-gray-400" size={20} />
                    <input 
                      type="number" 
                      min="1" 
                      value={formData.people}
                      onChange={(e) => setFormData({...formData, people: parseInt(e.target.value)})}
                      className="w-full p-5 pl-14 bg-ocean-light rounded-2xl outline-none focus:ring-aqua focus:ring-2 transition-all font-bold" 
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-aqua text-ocean font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-ocean hover:text-white transition-all shadow-xl shadow-aqua/20 flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {isSubmitting ? "Slanje..." : "POTVRDI REZERVACIJU"}
                  {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}