import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";
import { api } from "../lib/api"; // tvoja axios instanca

// Import Swiper stilova
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

import type { GalleryPost } from "../types/Gallery";

const STRAPI_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

export default function Gallery() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pozivamo /galleries i obavezno dodajemo populate=images
    api.get<{ data: GalleryPost[] }>("/galleries?populate=images")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => console.error("Greška pri učitavanju galerije:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center animate-pulse uppercase font-black text-ocean">Učitavanje galerije...</div>;

  return (
    <section id="galerija" className="w-full py-10 bg-ocean-light px-6 md:px-12 lg:px-24">
      <div className="w-full relative">
        
        {/* HEADER SEKCIJE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-5xl font-black text-ocean uppercase tracking-tighter">
              Galerija avantura
            </h2>
            <div className="flex items-center gap-2 text-aqua mb-2">
              <FaInstagram size={20} />
              <span className="font-bold tracking-[0.3em] uppercase text-[10px]">Social Feed</span>
            </div>
          </div>
          
          <div className="flex gap-3 mb-2">
            <button className="gallery-prev w-12 h-12 rounded-full border-2 border-ocean flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-all cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <button className="gallery-next w-12 h-12 rounded-full border-2 border-ocean flex items-center justify-center text-ocean hover:bg-ocean hover:text-white transition-all cursor-pointer">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-card border border-gray-100 flex flex-col h-full">
                
                {/* TOP BAR */}
<div className="p-5 flex items-center justify-between border-b border-gray-50">
  <div className="flex items-center gap-3">
    {/* TVOJ LOGO UMESTO RD */}
    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white flex items-center justify-center">
      <img 
        src={logo} 
        alt="Ronilačka Družina" 
        className="w-full h-full object-contain p-1" 
      />
    </div>
    
    <div className="flex flex-col">
      <span className="text-sm font-black text-ocean leading-none">Ronilačka Družina</span>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{post.location}</span>
    </div>
  </div>
  <MoreHorizontal size={20} className="text-gray-300" />
</div>

                {/* UNUTRAŠNJI SLIDER (Slike iz Strapi-ja) */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 group/inner"> 
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={true} 
                    pagination={{ clickable: true }}
                    className="h-full w-full inner-swiper"
                  >
                    {/* Proveravamo da li images postoji i mapiramo ih */}
{/* UNUTRAŠNJI SLIDER */}
{post.images?.map((img) => {
  // Proveravamo da li je URL relativan ili apsolutan
  const imagePath = img.url.startsWith("http") 
    ? img.url 
    : `${STRAPI_URL}${img.url}`;

  return (
    <SwiperSlide key={img.id}>
      <img 
        src={imagePath} 
        alt={img.alternativeText || "Diving Gallery"} 
        className="w-full h-full object-cover" 
        // DODAJ OVO ZA DEBUG:
        onError={(e) => console.log("Slika nije učitana na putanji:", imagePath)}
      />
    </SwiperSlide>
  );
})}
                  </Swiper>

                  {/* Tvoj stil za strelice ostaje isti kao pre */}
                  <style>{`
                    .inner-swiper .swiper-button-next,
                    .inner-swiper .swiper-button-prev {
                      background: rgba(255, 255, 255, 0.85);
                      backdrop-filter: blur(8px);
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      color: #0B2C5F;
                      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                      transition: all 0.2s ease-in-out;
                      opacity: 0;
                    }
                    .group\/inner:hover .inner-swiper .swiper-button-next,
                    .group\/inner:hover .inner-swiper .swiper-button-prev {
                      opacity: 1;
                    }
                    .inner-swiper .swiper-button-next:after,
                    .inner-swiper .swiper-button-prev:after {
                      font-size: 12px !important;
                      font-weight: 900;
                    }
                    .inner-swiper .swiper-pagination-bullet-active {
                      background: #4FD1C5 !important;
                    }
                  `}</style>
                </div>

                <div className="p-6 flex-grow">
                  <div className="text-sm leading-relaxed line-clamp-2">
                    <span className="text-gray-600 font-medium">
                      {post.caption}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}