import Header from "./components/Header";
import { Hero } from "./components/Hero";
import About from "./components/About";
import Program from "./components/Program";
import DiveTrips from "./components/DiveTrips";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingPage from "./components/BookingPage";
import CourseDetails from "./components/CourseDetails";

export default function App() {
  return (
    <BrowserRouter>
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