import Header from "./components/Header";
import { Hero } from "./components/Hero";
import About from "./components/About";
import Program from "./components/Program";
import DiveTrips from "./components/DiveTrips";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import BookingPage from "./components/BookingPage";
import CourseDetails from "./components/CourseDetails";
import { useEffect } from "react";

export default function App() {
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Ako nema hash-a (npr. samo prelazak na rezervaciju), idi na vrh
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Ako imamo hash (#zaroni)
    const id = hash.replace("#", "");
    
    // Funkcija koja izvršava skrolovanje
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Čekamo 100ms da se DOM učita (ovo rešava problem skoka na pogrešno mesto)
    const timer = setTimeout(scrollToElement, 150);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

  return (
    <BrowserRouter>
     <ScrollManager />
      <main className="w-full bg-ocean-light min-h-screen">
        {/* Header je van Routes jer se vidi na svim stranicama */}
        <Header />

        <Routes>
          {/* POČETNA STRANICA */}
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Program />
              <DiveTrips />
              <Gallery />
              <Contact />
            </>
          } />

          {/* STRANICA ZA REZERVACIJU IZLETA */}
          <Route path="/rezervacija/:id" element={<BookingPage />} />

          {/* STRANICA ZA DETALJE KURSA (PROGRAMA) */}
          <Route path="/program/:id" element={<CourseDetails />} />
        </Routes>

        {/* Footer je van Routes jer se vidi na svim stranicama */}
        <Footer />
      </main>
    </BrowserRouter>
  );
}