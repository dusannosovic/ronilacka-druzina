import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Calendar, Clock, Award, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api"; // Osiguraj da je putanja tačna

// Swiper stilovi
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

import type { Program } from "../types/Program";

export default function Programs() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pozivamo Strapi API za programe
    api.get<{ data: Program[] }>("/programs")
      .then((res) => {
        setPrograms(res.data.data);
      })
      .catch((err) => {
        console.error("Greška pri učitavanju programa:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center font-bold text-ocean uppercase tracking-widest animate-pulse">
        Učitavanje akademije...
      </section>
    );
  }

  // Ako nema unetih programa u Strapi-ju
  if (programs.length === 0) {
    return null; // Ili neka poruka da trenutno nema kurseva
  }

  return (
    <section id="kursevi" className="w-full bg-white py-4 px-6 md:px-12 lg:px-24">
      <div className="w-full relative">
        
        {/* HEADER SEKCIJE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl font-black text-ocean mb-4 uppercase tracking-tighter">
              Kursevi
            </h2>
            <p className="text-aqua font-bold tracking-[0.3em] uppercase text-sm flex items-center gap-2">
              <GraduationCap size={18} /> Profesionalni ronilački kursevi
            </p>
          </div>

          {/* STRELICE ZA SLIDER */}
          <div className="flex gap-3 mb-2">
            <button className="prog-prev w-12 h-12 rounded-full border-2 border-ocean flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-all cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <button className="prog-next w-12 h-12 rounded-full border-2 border-ocean flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-all cursor-pointer">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* SWIPER SLIDER ZA PROGRAME */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prog-prev",
            nextEl: ".prog-next",
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 4 }, 
          }}
          className="!pb-10"
        >
          {programs.map((p) => (
            <SwiperSlide key={p.id} className="h-auto">
              <div className="group bg-ocean-light rounded-[2.5rem] p-8 h-full border border-transparent hover:border-aqua hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col">

                <h3 className="text-2xl font-black text-ocean mb-4 leading-tight min-h-[64px]">
                  {p.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {p.description}
                </p>

                {/* TEHNIČKI DETALJI */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                    <span className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={14} className="text-aqua" /> Početak
                    </span>
                    <span className="text-ocean font-bold text-xs uppercase">
                        {p.startDate ? new Date(p.startDate).toLocaleDateString('sr-RS') : "Na upit"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                    <span className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <Clock size={14} className="text-aqua" /> Trajanje
                    </span>
                    <span className="text-ocean font-bold text-xs uppercase">{p.duration}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                    <span className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <Award size={14} className="text-aqua" /> Nivo
                    </span>
                    <span className="text-ocean font-bold text-xs uppercase">{p.level}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    navigate(`/program/${p.documentId}`, { state: { programData: p } }); // Šaljemo ceo objekat
                    window.scrollTo(0, 0);
                  }}
                className="w-full bg-white text-ocean border-2 border-ocean py-4 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-[0.2em] group-hover:bg-ocean group-hover:text-white transition-all duration-300"
                >
                  Detalji Kursa
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}