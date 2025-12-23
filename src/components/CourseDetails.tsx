import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { Program } from '../types/Program';
import { Calendar, Clock, Award, ArrowLeft, GraduationCap, Info } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // U Strapi v5 koristimo documentId koji stiže kroz 'id' iz URL-a
    api.get<{ data: Program }>(`/programs/${id}`)
      .then(res => setProgram(res.data.data))
      .catch(err => console.error("Greška pri učitavanju:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !program) return <div className="py-40 text-center font-black text-ocean animate-pulse uppercase tracking-[0.3em]">Učitavanje akademije...</div>;

  // Formatiranje datuma (pošto je u Strapi-ju Date, nema sati)
  const formattedDate = new Date(program.startDate).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-ocean font-bold mb-10 hover:text-aqua transition-all uppercase text-xs tracking-widest"
      >
        <ArrowLeft size={16} /> Nazad na listu programa
      </button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEVA KOLONA */}
        <div className="w-full lg:w-3/5 space-y-10">
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-card border border-gray-100">
            {/* Pošto nema icon polja na slici, koristimo fiksnu ikonu */}
            <div className="w-20 h-20 bg-ocean-light rounded-3xl flex items-center justify-center text-ocean mb-8 shadow-inner">
              <GraduationCap size={40} className="text-aqua" />
            </div>
            
            <h1 className="text-5xl font-black text-ocean mb-8 leading-tight tracking-tighter uppercase">
              {program.title}
            </h1>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-ocean mb-4 flex items-center gap-2 uppercase tracking-tight">
                  <Info size={20} className="text-aqua" /> Detalji kursa
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {program.longDescription}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-ocean mb-6 flex items-center gap-2 uppercase tracking-tight">
                  <Award size={20} className="text-aqua" /> Preduslovi za upis
                </h3>
                <div className="p-6 bg-ocean-light rounded-2xl border-l-4 border-aqua">
                  <p className="text-ocean/80 font-medium leading-relaxed">
                    {program.requirements}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESNA KOLONA (Sticky) */}
        <div className="w-full lg:w-2/5 sticky top-32">
          <div className="bg-[#0B2C5F] text-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-10">
                <span className="text-aqua text-[10px] font-black uppercase tracking-[0.3em]">Cena programa</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-black text-white">{program.price}</span>
                  <span className="text-xl font-bold text-aqua uppercase tracking-widest">RSD</span>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-aqua">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-aqua uppercase tracking-widest opacity-70">Start</span>
                    <span className="font-bold text-lg">{formattedDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-aqua">
                    <Clock size={22} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-aqua uppercase tracking-widest opacity-70">Trajanje</span>
                    <span className="font-bold text-lg">{program.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-aqua">
                    <Award size={22} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-aqua uppercase tracking-widest opacity-70">Nivo</span>
                    <span className="font-bold text-lg uppercase tracking-tight">{program.level}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/#kontakt')}
                className="w-full bg-aqua text-ocean font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-4"
              >
                Prijavi se odmah
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}