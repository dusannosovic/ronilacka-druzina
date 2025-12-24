import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import type { Program } from '../types/Program';
import { 
  Calendar, 
  Clock, 
  Award, 
  ArrowLeft, 
  GraduationCap, 
  Info, 
  Send, 
  CheckCircle, 
  Users, 
  ShieldCheck 
} from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Provera da li imamo podatke iz "state" (parametra) pre nego što pozovemo API
  const [program, setProgram] = useState<Program | null>(location.state?.programData || null);
  const [loading, setLoading] = useState(!location.state?.programData);

  // Stanja za formu
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

    // 2. Ako podaci nisu prosleđeni kao parametar (npr. korisnik je uradio Refresh), pozovi API
    if (!program) {
      api.get<{ data: Program }>(`/programs/${id}`)
        .then(res => {
          setProgram(res.data.data);
        })
        .catch(err => console.error("Greška pri učitavanju:", err))
        .finally(() => setLoading(false));
    }
  }, [id, program]);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ime je obavezno";
    if (!formData.lastName.trim()) newErrors.lastName = "Prezime je obavezno";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Email nije ispravan";
    if (formData.phone.length < 6) newErrors.phone = "Unesite telefon";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      // Slanje prijave u tvoju kolekciju u Strapi-ju
      await api.post('/course-applications', {
        data: { 
          ...formData, 
          courseTitle: program?.title 
        }
      });
      setIsSuccess(true);
      // Vrati na početnu nakon 4 sekunde
      setTimeout(() => navigate('/'), 4000);
    } catch (err) {
      alert("Greška pri slanju prijave. Pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !program) return (
    <div className="py-40 text-center font-black text-ocean animate-pulse uppercase tracking-[0.3em]">
      Učitavanje podataka...
    </div>
  );

  const formattedDate = new Date(program.startDate).toLocaleDateString('sr-RS', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Dugme za nazad */}
      <button 
        onClick={() => navigate('/#programi')} 
        className="flex items-center gap-2 text-ocean/60 font-bold mb-10 hover:text-aqua transition-all uppercase text-xs tracking-widest"
      >
        <ArrowLeft size={16} /> Nazad na listu
      </button>

      {/* Na 1400px (desktop) prelazi u red, inače je kolona */}
      <div className="flex flex-col desktop:flex-row gap-12 items-start">
        
        {/* LEVA KOLONA: SVE INFORMACIJE (60%) */}
        <div className="w-full desktop:w-3/5 bg-white p-10 md:p-16 rounded-[3rem] shadow-card border border-gray-100">
          
          {/* Header Kursa */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-ocean-light rounded-3xl flex items-center justify-center text-ocean shadow-inner">
              <GraduationCap size={40} className="text-aqua" />
            </div>
            <div>
              <span className="text-aqua text-[10px] font-black uppercase tracking-[0.3em]">Ronilačka Akademija</span>
              <h1 className="text-5xl font-black text-ocean leading-tight tracking-tighter uppercase">
                {program.title}
              </h1>
            </div>
          </div>

          {/* Opis iz Strapi-ja */}
          <section className="mb-12">
            <h3 className="text-xl font-black text-ocean mb-4 uppercase tracking-tight flex items-center gap-3">
              <Info size={20} className="text-aqua" /> Detalji o programu
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap font-medium">
              {program.longDescription || program.description}
            </p>
          </section>

          {/* Grid sa podacima */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Cena Kursa</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ocean">{program.price}</span>
                <span className="text-sm font-bold text-ocean/50">RSD</span>
              </div>
            </div>
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Datum početka</span>
              <div className="flex items-center gap-2 text-xl font-black text-ocean">
                <Calendar size={20} className="text-aqua" /> {formattedDate}
              </div>
            </div>
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Trajanje obuke</span>
              <div className="flex items-center gap-2 text-xl font-black text-ocean">
                <Clock size={20} className="text-aqua" /> {program.duration}
              </div>
            </div>
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Nivo sertifikata</span>
              <div className="flex items-center gap-2 text-xl font-black text-ocean uppercase">
                <Award size={20} className="text-aqua" /> {program.level}
              </div>
            </div>
          </section>

          {/* Preduslovi sekcija */}
          <section className="p-8 bg-ocean rounded-[2rem] text-white relative overflow-hidden">
            <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
            <h3 className="text-xl font-black mb-4 uppercase tracking-tight flex items-center gap-3 relative z-10">
              <Award size={20} className="text-aqua" /> Preduslovi za upis
            </h3>
            <p className="text-white/80 font-bold leading-relaxed italic relative z-10">
              {program.requirements || "Potrebno je lekarsko uverenje o sposobnosti za ronjenje."}
            </p>
          </section>
        </div>

        {/* DESNA KOLONA: FORMA (40%) - STICKY iznad 1400px */}
        <div className="w-full desktop:w-2/5 desktop:sticky desktop:top-32">
          <div className="bg-[#0B2C5F] text-white p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aqua opacity-10 rounded-full blur-3xl"></div>

            {isSuccess ? (
              <div className="py-20 text-center animate-in fade-in zoom-in relative z-10">
                <CheckCircle size={80} className="text-aqua mx-auto mb-6" />
                <h2 className="text-3xl font-black mb-4">Prijava poslata!</h2>
                <p className="text-white/60">Uskoro ćemo vas kontaktirati radi dogovora.</p>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Prijavi se</h2>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Rezervišite mesto na predstojećem kursu</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Ime</label>
                      <input 
                        required
                        type="text" placeholder="Ime" 
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.firstName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Prezime</label>
                      <input 
                        required
                        type="text" placeholder="Prezime" 
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.lastName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Email</label>
                    <input 
                      required
                      type="email" placeholder="vas@email.com" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.email ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Telefon</label>
                    <input 
                      required
                      type="text" placeholder="+381..." 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.phone ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Broj kandidata</label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <Users size={18} className="text-white/30" />
                      <input 
                        type="number" min="1" value={formData.people}
                        onChange={(e) => setFormData({...formData, people: parseInt(e.target.value)})}
                        className="bg-transparent w-full outline-none font-bold text-white"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-aqua text-ocean font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-aqua/10 flex items-center justify-center gap-4 mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? "Slanje..." : "ZAKAŽI KURS"} <Send size={20} />
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div className="text-center px-10 mt-8">
            <p className="text-[9px] font-bold text-ocean/30 uppercase tracking-[0.2em]">
              Naši instruktori će vas kontaktirati radi provere opreme i potvrde uvodnog predavanja.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}