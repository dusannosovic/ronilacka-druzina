import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MoreHorizontal} from "lucide-react";
import logo from "../assets/logo.png";

// Import Swiper stilova
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

import type { GalleryPost } from "../types/Gallery";

const STRAPI_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

interface GalleryCardProps {
  post: GalleryPost;
  STRAPI_URL: string;
}

/**
 * INDIVIDUAL CARD COMPONENT
 * Manages its own "Expanded" state for the caption
 */
export default function GalleryCard({ post, STRAPI_URL }: GalleryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Define limit for showing "Read More"
  const CHARACTER_LIMIT = 100;
  const isLongCaption = post.caption && post.caption.length > CHARACTER_LIMIT;

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-card border border-gray-100 flex flex-col h-full transition-all duration-300">
      
      {/* TOP BAR */}
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
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

      {/* INNER IMAGE SLIDER */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 group/inner"> 
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true} 
          pagination={{ clickable: true }}
          className="h-full w-full inner-swiper"
        >
          {post.images?.map((img) => {
            const imagePath = img.url.startsWith("http") 
              ? img.url 
              : `${STRAPI_URL}${img.url}`;

            return (
              <SwiperSlide key={img.id}>
                <img 
                  src={imagePath} 
                  alt={img.alternativeText || "Diving Gallery"} 
                  className="w-full h-full object-cover" 
                  onError={(e) => console.log("Slika nije učitana:", imagePath)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

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

      {/* CAPTION AREA */}
      <div className="p-6 flex-grow">
        <div className="text-sm leading-relaxed text-gray-600">
          <p className={isExpanded ? "" : "line-clamp-2"}>
            {post.caption}
          </p>
          
          {isLongCaption && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-aqua font-bold hover:text-ocean transition-colors cursor-pointer text-xs uppercase tracking-wider"
            >
              {isExpanded ? "Prikaži manje" : "Prikaži više..."}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

