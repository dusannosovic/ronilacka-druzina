import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { api } from '../lib/api';
import { ArrowLeft, MoreHorizontal, X, MapPin, Heart, MessageCircle } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import logo from "../assets/logo.png";
import type { GalleryPost } from '../types/Gallery';

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

const STRAPI_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null); // Stanje za modal
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get<{ data: GalleryPost[] }>("/galleries?populate=images&sort=createdAt:desc")
      .then(res => setPosts(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Blokiramo skrolovanje sajta kada je modal otvoren
  useEffect(() => {
    if (selectedPost) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedPost]);

  if (loading) return <div className="py-40 text-center font-black text-ocean animate-pulse">UČITAVANJE ARHIVE...</div>;

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-24 pb-24 px-6 md:px-12 lg:px-12">
      
      {/* HEADER STRANICE */}
      <div className="max-w-[1600px] mx-auto mb-16">
        <button onClick={() => navigate('/#galerija')} className="flex items-center gap-2 text-ocean/60 font-black mb-8 hover:text-aqua transition-all uppercase text-[10px] tracking-[0.2em]">
          <ArrowLeft size={14} /> Nazad na početnu
        </button>
        <h1 className="text-5xl md:text-7xl font-black text-ocean uppercase tracking-tighter leading-none mb-4">Sve Avanture</h1>
      </div>

      {/* GRID SA ALBUMIMA */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {posts.map((post) => (
          <div 
            key={post.id} 
            onClick={() => setSelectedPost(post)} // Otvara modal na klik
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-card border border-gray-100 flex flex-col h-full cursor-pointer hover:translate-y-[-8px] transition-all duration-500"
          >
            {/* Naslovna slika albuma */}
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={post.images?.[0]?.url.startsWith('http') ? post.images[0].url : `${STRAPI_URL}${post.images?.[0]?.url}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt="Diving"
              />
              <div className="absolute inset-0 bg-ocean/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="bg-white/90 backdrop-blur-md text-ocean font-black text-[10px] px-5 py-2 rounded-full uppercase tracking-widest">Pogledaj album</span>
              </div>
            </div>
            <div className="p-6">
               <span className="text-[10px] font-black text-aqua uppercase tracking-widest mb-2 block">{post.location}</span>
               <p className="text-gray-600 font-medium text-sm line-clamp-2">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL SEKCIJA --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop (Zatamnjena pozadina) */}
          <div 
            className="absolute inset-0 bg-ocean/95 backdrop-blur-xl"
            onClick={() => setSelectedPost(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative z-[210] w-full max-w-6xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-full max-h-[85vh]">
            
            {/* Dugme za zatvaranje */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 z-[220] bg-white text-ocean p-2 rounded-full shadow-xl hover:bg-aqua transition-colors"
            >
              <X size={24} />
            </button>

            {/* LEVA STRANA: Veliki Slajder (70%) */}
            <div className="w-full lg:w-[65%] bg-black flex items-center">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="h-full w-full modal-swiper"
              >
                {selectedPost.images?.map((img) => (
                  <SwiperSlide key={img.id} className="flex items-center justify-center">
                    <img 
                      src={img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`} 
                      className="w-full h-full object-contain" 
                      alt="Diving high res"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* DESNA STRANA: Detalji (35%) */}
            <div className="w-full lg:w-[35%] flex flex-col bg-white">
              {/* Top Bar u modalu */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden flex items-center justify-center bg-ocean-light">
                   <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-ocean text-sm uppercase tracking-tighter">Ronilačka Družina</span>
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                    <MapPin size={10} className="text-aqua" /> {selectedPost.location}
                  </span>
                </div>
              </div>

              {/* Opis (Scrollable area) */}
              <div className="p-8 flex-grow overflow-y-auto custom-scrollbar">
                <div className="text-sm leading-relaxed text-gray-600 font-medium whitespace-pre-wrap break-words mb-8">
                   <span className="font-black text-ocean mr-2 text-[11px] uppercase">ronilacka_druzina</span>
                   {selectedPost.caption}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Custom Stil za Swiper u modalu */}
      <style>{`
        .modal-swiper .swiper-button-next,
        .modal-swiper .swiper-button-prev { color: white !important; }
        .modal-swiper .swiper-pagination-bullet-active { background: #4FD1C5 !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </main>
  );
}