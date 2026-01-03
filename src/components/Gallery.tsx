import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// FIX: Navigation and Pagination must come from swiper/modules
import { Navigation, Pagination } from "swiper/modules"; 
// FIX: Remove Navigation from lucide-react
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { api } from "../lib/api";
import type { GalleryPost } from "../types/Gallery";
import GalleryCard from "./GalleryCard";

// Import Swiper styles
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

// Define the URL here
const STRAPI_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

export default function Gallery() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ data: GalleryPost[] }>("/galleries?populate=images")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => console.error("Greška pri učitavanju galerije:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="py-20 text-center animate-pulse uppercase font-black text-ocean">
      Učitavanje galerije...
    </div>
  );

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
          modules={[Navigation, Pagination]} // Using the modules from swiper/modules
          navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
          spaceBetween={30}
          slidesPerView={1}
          autoHeight={true} 
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="h-auto">
              {/* FIX: Added STRAPI_URL={STRAPI_URL} here */}
              <GalleryCard post={post} STRAPI_URL={STRAPI_URL} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}