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
import PolitikaPrivatnosti from './components/PrivacyPolicy';
import UsloviKoriscenja from './components/TermsOfUse';
import { useEffect } from "react";
// Import nove stranice


function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace("#", "");
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const timer = setTimeout(scrollToElement, 150);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <main className="w-full bg-ocean-light min-h-screen">
        <Header />

        <Routes>
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

          <Route path="/rezervacija/:id" element={<BookingPage />} />
          <Route path="/program/:id" element={<CourseDetails />} />
          
          {/* Nova ruta za Politiku privatnosti */}
          <Route path="/politika-privatnosti" element={<PolitikaPrivatnosti />} />

          <Route path="/uslovi-koriscenja" element={<UsloviKoriscenja />} />
        </Routes>

        <Footer />
      </main>
    </BrowserRouter>
  );
}