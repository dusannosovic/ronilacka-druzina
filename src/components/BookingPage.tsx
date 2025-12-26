import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Dodat useLocation
import type { DiveTrip } from '../types/strapi';
import { Calendar, Clock, MapPin, Users, Send, ArrowLeft, Info, Tag, Anchor, CheckCircle } from 'lucide-react';
import LegalModal from './LegalModal';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Inicijalizujemo 'trip' odmah iz state-a (ako postoji)
  const [trip, setTrip] = useState<DiveTrip | null>(location.state?.tripData || null);
  
  // 2. Loading je 'false' ako smo već dobili podatke kroz parametre
  const [loading, setLoading] = useState(!location.state?.tripData);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    people: 1
  });
  
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);


  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 3. API poziv se izvršava SAMO ako korisnik osveži stranicu (nema state-a)
    if (!trip) {
      api.get<{ data: DiveTrip }>(`/dive-trips/${id}?populate=*`)
        .then(res => setTrip(res.data.data))
        .catch(err => console.error("Greška pri učitavanju:", err))
        .finally(() => setLoading(false));
    }
  }, [id, trip]);

  // Validacija
  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ime je obavezno";
    if (!formData.lastName.trim()) newErrors.lastName = "Prezime je obavezno";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Email nije ispravan";
    if (formData.phone.length < 6) newErrors.phone = "Unesite telefon";
    if (formData.people < 1) newErrors.people = "Minimalno 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formattedDateTime = trip?.date ? new Date(trip.date).toLocaleString('sr-RS', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) + 'h' : '';

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  
  if (!agreed) {
    alert("Molimo vas da prihvatite uslove i politiku privatnosti.");
    return;
  }

    setIsSubmitting(true);
    try {
      await api.post('/bookings', {
        data: {
          ...formData,
          tripTitle: trip?.title,
          tripDate: formattedDateTime 
        }
      });
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 4000);
    } catch (err) {
      alert("Došlo je do greške pri slanju.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-light">
        <div className="text-ocean font-black animate-pulse uppercase tracking-[0.3em]">Učitavanje...</div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-32 pb-24 px-6 md:px-12 lg:px-24">
<button 
  onClick={() => navigate('/#zaroni')} // Vodi na home i traži sekciju #zaroni
  className="flex items-center gap-2 text-ocean/60 font-black mb-10 hover:text-aqua transition-all uppercase text-[10px] tracking-widest group"
>
  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
  Nazad na listu zarona
</button>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEVA KOLONA: INFO (Sticky iznad 1400px) */}
        <div className="w-full lg:w-2/5 desktop:sticky desktop:top-32 order-2 lg:order-1">
          <div className="bg-[#0B2C5F] text-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aqua opacity-5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 border-b border-white/10 pb-6 leading-tight">{trip.title}</h3>
              <div className="space-y-8 mb-10">
                <div className="flex flex-col gap-1">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Calendar size={12} /> Datum i Vreme polaska</span>
                  <p className="text-lg font-bold">{formattedDateTime}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Clock size={12} /> Trajanje</span>
                    <p className="font-bold">{trip.duration}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Anchor size={12} /> Težina</span>
                    <p className="font-bold uppercase tracking-tight">{trip.difficulty}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Tag size={12} /> Cena po osobi</span>
                  <p className="text-3xl font-black text-aqua">{trip.price} RSD</p>
                </div>
                <div className="flex flex-col gap-1 pt-4 border-t border-white/5">
                   <span className="text-aqua text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Info size={12} /> O ovom izletu</span>
                   <p className="text-sm text-white/60 italic leading-relaxed">"{trip.description}"</p>
                </div>
              </div>
              <a href={trip.locationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className="bg-aqua text-ocean p-3 rounded-xl shadow-lg shadow-aqua/20"><MapPin size={20} /></div>
                  <span className="font-bold">Otvori lokaciju na mapi</span>
                </div>
                <span className="text-aqua group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* DESNA KOLONA: FORMA */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-card border border-gray-100 order-1 lg:order-2 relative overflow-hidden">
          {isSuccess ? (
            <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle size={80} className="text-aqua mx-auto mb-6" />
              <h2 className="text-3xl font-black text-ocean mb-4 uppercase tracking-tighter">Uspešna prijava!</h2>
              <p className="text-gray-500 font-medium">Hvala vam na poverenju. Naš tim će vas uskoro kontaktirati.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-4xl font-black text-ocean mb-2 uppercase tracking-tighter">Prijavi se</h2>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Molimo popunite sva polja ispod</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Ime</label>
                    <input 
                      type="text" 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.firstName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="Ime" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Prezime</label>
                    <input 
                      type="text" 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.lastName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="Prezime" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.email ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="email@primer.com" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Telefon</label>
                    <input 
                      type="text" 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full p-5 bg-ocean-light rounded-2xl outline-none focus:ring-2 transition-all ${errors.phone ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      placeholder="+381..." 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-black text-ocean uppercase tracking-widest ml-1">Broj osoba</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-5 text-gray-400" size={20} />
                    <input 
                      type="number" 
                      min="1" 
                      value={formData.people}
                      onChange={(e) => setFormData({...formData, people: parseInt(e.target.value)})}
                      className="w-full p-5 pl-14 bg-ocean-light rounded-2xl outline-none focus:ring-aqua focus:ring-2 transition-all font-bold" 
                    />
                  </div>
                </div>

                {/* CHECKBOX ZA USLOVE I PRIVATNOST */}
<div className="flex items-start gap-3 px-1 py-4">
  <input 
    id="booking-legal"
    type="checkbox"
    required
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className="mt-1 w-4 h-4 rounded border-gray-300 text-aqua focus:ring-aqua cursor-pointer transition-colors"
  />
  <label htmlFor="booking-legal" className="text-[10px] md:text-xs text-gray-500 leading-relaxed cursor-pointer select-none uppercase font-bold tracking-wider">
    Saglasan sam sa 
    <button type="button" onClick={() => setActiveModal('terms')} className="mx-1 text-aqua underline hover:text-ocean transition-colors">Uslovima korišćenja</button> 
    i 
    <button type="button" onClick={() => setActiveModal('privacy')} className="mx-1 text-aqua underline hover:text-ocean transition-colors">Politikom privatnosti</button> 
    SU Ronilačka družina.
  </label>
</div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-aqua text-ocean font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-ocean hover:text-white transition-all shadow-xl shadow-aqua/20 flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {isSubmitting ? "Slanje..." : "POTVRDI REZERVACIJU"}
                  {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
              {/* MODAL: POLITIKA PRIVATNOSTI */}
<LegalModal 
  isOpen={activeModal === 'privacy'} 
  onClose={() => setActiveModal(null)} 
  title="Politika Privatnosti"
>
  <div className="text-gray-700 leading-relaxed">
    {/* Datum */}
    <p className="mb-6 text-xs text-gray-400 italic">
      Poslednji put ažurirano: 26. decembar 2025.
    </p>

    {/* 1. UVOD */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">1. Uvod</h4>
      <p className="text-sm">
        Dobrodošli na internet stranicu <strong>Sportskog udruženja Ronilačka družina</strong>. 
        Ova Politika privatnosti ima za cilj da vas informiše o tome koje podatke o ličnosti prikupljamo, 
        na koji način ih koristimo, kako ih štitimo i koja su vaša prava u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije.
      </p>
    </section>

    {/* 2. RUKOVALAC - ISTAKNUTO PLAVO POLJE */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">2. Rukovalac podacima</h4>
      <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-ocean text-xs md:text-sm">
        <p className="font-bold mb-1 text-ocean">Sportsko udruženje Ronilačka družina</p>
        <p>Matični broj: 28758499</p>
        <p>PIB: 115232786</p>
        <p>Sedište: Požeška 33, Beograd</p>
        <p>Email: ronilackadruzina@gmail.com</p>
      </div>
    </section>

    {/* 3. PODACI KOJE PRIKUPLJAMO */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">3. Podatke koje prikupljamo</h4>
      <p className="text-sm mb-3">
        Podatke prikupljamo direktno od vas kada popunite kontakt formu, prijavu za zaron ili formu za upis na ronilački kurs. Ti podaci uključuju:
      </p>
      <ul className="list-disc ml-5 space-y-2 text-sm">
        <li><strong>Osnovni podaci:</strong> Ime i prezime.</li>
        <li><strong>Kontakt podaci:</strong> E-mail adresa i broj telefona.</li>
        <li><strong>Ronilački podaci:</strong> Ronilačka kategorija (federacija i nivo) i broj ostvarenih zarona.</li>
      </ul>
    </section>

    {/* 4. SVRHA OBRADE */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">4. Svrha obrade podataka</h4>
      <p className="text-sm mb-3">Vaše podatke koristimo isključivo za sledeće svrhe:</p>
      <ul className="list-disc ml-5 space-y-2 text-sm">
        <li>Komunikaciju sa vama i odgovaranje na upite.</li>
        <li>Organizaciju ronilačkih izleta i logističko planiranje zarona.</li>
        <li>Prijavu kandidata za ronilačke kurseve kod međunarodnih ronilačkih federacija (npr. PADI, SSI, CMAS) radi izdavanja sertifikata.</li>
        <li>Ispunjenje zakonskih obaveza Udruženja (vođenje evidencije članova u skladu sa Zakonom o sportu).</li>
      </ul>
    </section>

    {/* 5. PRENOS TREĆIM LICIMA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">5. Prenos podataka trećim licima</h4>
      <p className="text-sm">
        Vaši podaci se nikada ne prodaju niti daju na korišćenje trećim licima u marketinške svrhe. Podaci se mogu preneti isključivo ronilačkim federacijama (radi sertifikata), nadležnim organima po zakonu ili tehničkim pružaocima hosting usluga.
      </p>
    </section>

    {/* 6. ČUVANJE PODATAKA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">6. Čuvanje podataka</h4>
      <p className="text-sm">
        Podaci se čuvaju u periodu koji je neophodan za ostvarenje svrhe obrade (npr. dok traje kurs), nakon čega se brišu, osim ako ne dođe do učlanjenja u udruženje.
      </p>
    </section>

    {/* 7. VAŠA PRAVA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">7. Vaša prava</h4>
      <p className="text-sm mb-3">U svakom trenutku imate pravo na:</p>
      <ul className="list-disc ml-5 space-y-2 text-sm text-ocean/80">
        <li>Pristup vašim podacima i ispravku netačnih podataka.</li>
        <li>Brisanje podataka ("pravo na zaborav").</li>
        <li>Opoziv saglasnosti u bilo kom trenutku.</li>
        <li>Podnošenje pritužbe Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.</li>
      </ul>
    </section>

    {/* 8. IZMENE */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">8. Izmene Politike</h4>
      <p className="text-sm italic">
        Zadržavamo pravo na izmene usled promena zakona. Sve izmene će biti objavljene u okviru ovog prozora.
      </p>
    </section>

    {/* KONTAKT NA DNU */}
    <div className="mt-10 p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
      <p className="text-sm font-semibold mb-1 text-ocean">Imate pitanja?</p>
      <p className="text-xs text-aqua">ronilackadruzina@gmail.com</p>
    </div>
  </div>
</LegalModal>

      {/* MODAL: USLOVI KORIŠĆENJA */}
<LegalModal 
  isOpen={activeModal === 'terms'} 
  onClose={() => setActiveModal(null)} 
  title="Uslovi Korišćenja"
>
  <div className="text-gray-700 leading-relaxed">
    {/* Datum izmene */}
    <p className="mb-6 text-[10px] text-gray-400 italic">
      Poslednji put ažurirano: 26. decembar 2025.
    </p>

    {/* 1. OPŠTE ODREDBE */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">1. Opšte odredbe</h4>
      <p className="text-sm">
        Vlasnik i administrator ove internet stranice je <strong>Sportsko udruženje Ronilačka družina</strong> (u daljem tekstu: "Udruženje"). 
        Korišćenjem bilo kog dela ovog sajta, automatski prihvatate sve aktuelne uslove korišćenja.
      </p>
    </section>

    {/* 2. INTELEKTUALNA SVOJINA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">2. Intelektualna svojina</h4>
      <p className="text-sm mb-3">
        Svi originalni sadržaji (logotip, dizajn, autorski tekstovi i klupske fotografije) predstavljaju isključivo intelektualno vlasništvo Udruženja.
      </p>
      <p className="text-sm mb-3">
        Pojedine fotografije su preuzete sa besplatnih servisa (Unsplash, Pexels, Pixabay) u skladu sa njihovim licencama.
      </p>
      <p className="text-sm font-bold border-l-4 border-aqua pl-4 py-2 bg-ocean-light/20 text-ocean">
        Strogo je zabranjeno neovlašćeno preuzimanje i korišćenje logotipa, tekstova i originalnih fotografija bez prethodne pisane saglasnosti.
      </p>
    </section>

    {/* 3. TAČNOST INFORMACIJA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">3. Tačnost informacija</h4>
      <p className="text-sm">
        Zadržavamo pravo na izmene informacija bez prethodne najave. Sve informacije na sajtu su informativnog karaktera i ne predstavljaju obavezujuću ponudu dok se ne potvrde direktnim kontaktom sa Udruženjem.
      </p>
    </section>

    {/* 4. ONLINE REZERVACIJE - KLJUČNA STAVKA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">4. Online rezervacije i prijave (Upit)</h4>
      <p className="text-sm mb-3">
        Popunjavanjem forme na sajtu, korisnik šalje <strong>neobavezujući upit</strong>.
      </p>
      <p className="text-sm font-semibold text-ocean bg-blue-50 p-3 rounded-lg">
        Ovaj čin se ne smatra kupovinom niti automatskom potvrdom mesta. Rezervacija je važeća tek nakon što Udruženje direktno potvrdi dostupnost putem e-maila ili telefona.
      </p>
    </section>

    {/* 5. FINANSIJSKI USLOVI - KLJUČNA STAVKA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">5. Finansijski uslovi i plaćanje</h4>
      <p className="text-sm mb-3">
        Udruženje <strong>ne vrši online naplatu usluga</strong> putem ovog sajta. Na sajtu nije moguće uneti podatke o platnim karticama.
      </p>
      <p className="text-sm">
        Sva plaćanja (članarine, depoziti) regulišu se isključivo direktnim putem: uplatom na tekući račun Udruženja ili gotovinski u klubu/na mestu okupljanja.
      </p>
    </section>

    {/* 6. DIVING DISCLAIMER */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">6. Odricanje od odgovornosti (Diving Disclaimer)</h4>
      <p className="p-4 bg-red-50 text-red-900 rounded-xl border border-red-100 italic text-xs md:text-sm">
        Ronjenje nosi određene rizike. Informacije na sajtu ne mogu zameniti profesionalnu obuku i lekarski pregled. Udruženje ne snosi odgovornost za povrede nastale korišćenjem informacija bez nadzora licenciranog instruktora.
      </p>
    </section>

    {/* 7. PONAŠANJE KORISNIKA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">7. Ponašanje korisnika</h4>
      <ul className="list-disc ml-5 space-y-1 text-sm">
        <li>Zabranjeno je slanje lažnih prijava ili spam poruka.</li>
        <li>Zabranjeni su pokušaji narušavanja bezbednosti sajta.</li>
        <li>Zabranjeno je postavljanje uvredljivih sadržaja.</li>
      </ul>
    </section>

    {/* 8. LINKOVI */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">8. Linkovi ka drugim sajtovima</h4>
      <p className="text-sm">
        Udruženje nema kontrolu nad sadržajem eksternih sajtova (PADI, SSI, prognoza) i ne snosi odgovornost za njihove uslove ili politiku privatnosti.
      </p>
    </section>

    {/* 9. IZMENE USLOVA */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">9. Izmene uslova</h4>
      <p className="text-sm">
        Udruženje zadržava pravo izmene ovih Uslova u bilo kom trenutku. Nove verzije stupaju na snagu u trenutku objave na ovoj stranici.
      </p>
    </section>

    {/* 10. NADLEŽNOST */}
    <section className="mb-8">
      <h4 className="text-lg font-bold text-ocean mb-3 border-b border-gray-100 pb-1">10. Nadležnost</h4>
      <p className="text-sm">
        U slučaju spora proisteklog iz korišćenja ovog sajta, nadležan je sud u Beogradu, uz primenu zakona Republike Srbije.
      </p>
    </section>

    {/* FOOTER PORUKA */}
    <div className="mt-10 p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
      <p className="text-sm font-bold italic text-ocean uppercase tracking-tight">
        Hvala vam što poštujete pravila naše ronilačke zajednice!
      </p>
    </div>
  </div>
</LegalModal>

    </main>
  );
}