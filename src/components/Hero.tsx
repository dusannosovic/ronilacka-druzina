import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { api } from "../lib/api";

// Swiper stilovi
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-fade";

export function Hero() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  // Koristimo fiksni URL ako .env ne radi iz nekog razloga
  const STRAPI_URL = import.meta.env.VITE_CMS_URL || "http://localhost:1337";

  useEffect(() => {
    api.get("/heroes?populate=*")
      .then((res) => {
        // Logujemo da vidimo da li su podaci stigli u browser
        console.log("PODACI STIGLI:", res.data.data);
        
        const data = res.data.data;
        if (data && data.length > 0) {
          // Uzimamo backgroundMedia iz prvog elementa
          setMediaItems(data[0].backgroundMedia || []);
        }
      })
      .catch((err) => console.error("Greška pri učitavanju:", err));
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B2C5F]">
      
      <div className="absolute inset-0 z-0">
        {mediaItems.length > 0 ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={2000}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            className="h-full w-full"
          >
            {mediaItems.map((item) => {
              // Kreiramo punu putanju
              const path = item.url.startsWith('http') ? item.url : `${STRAPI_URL}${item.url}`;
              const isVideo = item.mime.includes("video");

              return (
                <SwiperSlide key={item.id} className="h-full w-full">
                  {isVideo ? (
                    <video
                      key={path} // Ključno za refresh videa
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(0.7)' }} // Malo ga potamnimo radi teksta
                    >
                      <source src={path} type={item.mime} />
                    </video>
                  ) : (
                    <img
                      src={path}
                      className="w-full h-full object-cover"
                      alt="Hero"
                    />
                  )}
                  {/* Plavi sloj preko svega */}
                  <div className="absolute inset-0 bg-[#0B2C5F]/30" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          /* Dok se učitava, ili ako nema ničega, prikazuje se plava pozadina */
          <div className="w-full h-full bg-[#0B2C5F] animate-pulse" />
        )}
      </div>

      {/* TEKST I DUGMIĆI */}
      <div className="relative z-10 h-full w-full flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.05] uppercase tracking-tighter">
            Istražite Dubine <br />
            Sa <span className="text-[#4FD1C5]">Ronilačkom Družinom</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/90 font-medium max-w-2xl">
            Licencirani Instruktori • Trening Zaroni • Putovanja • Druženje
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <a href="#zaroni" className="bg-[#4FD1C5] text-[#0B2C5F] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:scale-105 shadow-2xl">
              PRIJAVI SE ZA ZARON
            </a>
            <a href="#kontakt" className="border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
              POSTANI DEO DRUŽINE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}