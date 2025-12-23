import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { DiveTrip } from "../types/strapi";
import { Clock, Anchor, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Swiper Importi
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const STRAPI_URL = "http://localhost:1337";

export default function DiveTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<DiveTrip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ data: DiveTrip[] }>("/dive-trips?populate=featuredImage")
      .then((res) => {
        setTrips(res.data.data);
      })
      .catch((err) => console.error("Greška:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-24 text-center font-bold text-ocean uppercase tracking-widest animate-pulse">Učitavanje avantura...</div>;

  return (
    <section id="zaroni" className="w-full bg-ocean-light py-24 px-6 md:px-12 lg:px-24">
      <div className="w-full relative">
        
        {/* HEADER SEKCIJE SA STRELICAMA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl font-black text-ocean mb-4 uppercase tracking-tighter">
              Predstojeći zaroni i putovanja
            </h2>
            <p className="text-aqua font-bold tracking-[0.3em] uppercase text-sm">
              Istražite najbolje lokacije sa nama
            </p>
          </div>

          {/* CUSTOM STRELICE ZA SLIDER (Iste kao u galeriji) */}
          <div className="flex gap-3 mb-2">
            <button className="trip-prev w-12 h-12 rounded-full border-2 border-ocean flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-all cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <button className="trip-next w-12 h-12 rounded-full border-2 border-ocean flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-all cursor-pointer">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* SWIPER SLIDER ZA KARTICE */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".trip-prev",
            nextEl: ".trip-next",
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 }, // Prikazuje 3 kartice na desktopu
          }}
          className="!pb-10"
        >
          {trips.map((trip) => {
            const { title, difficulty, date, description, featuredImage, duration, documentId } = trip;

            const imageUrl = featuredImage?.url
              ? `${STRAPI_URL}${featuredImage.url}`
              : "https://via.placeholder.com/800x600?text=Ronjenje";

            const formattedDate = date 
              ? new Date(date).toLocaleString('sr-RS', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }) + 'h'
              : "Datum nije određen";

            return (
              <SwiperSlide key={trip.id} className="h-auto">
                <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100">
                  
                  {/* SLIKA */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                      <div className="flex items-center gap-2 text-ocean font-bold text-xs uppercase">
                        <Clock size={14} className="text-aqua" />
                        {duration}
                      </div>
                    </div>
                  </div>

                  {/* SADRŽAJ KARTICE */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-ocean mb-3 group-hover:text-aqua transition-colors leading-tight">
                      {title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                      {description}
                    </p>

                    {/* DETALJI */}
                    <div className="space-y-4 mb-8 mt-auto">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                          <Anchor size={14} /> Težina
                        </span>
                        <span className="text-ocean font-bold text-sm uppercase">{difficulty}</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                          <Calendar size={14} /> Vreme i datum
                        </span>
                        <span className="text-ocean font-bold text-sm uppercase tracking-tight">{formattedDate}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        navigate(`/rezervacija/${documentId}`);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full bg-[#0B2C5F] text-white py-4 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-[0.2em] hover:bg-aqua hover:text-ocean transition-all duration-300 shadow-lg"
                    >
                      Prijavi se
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}