import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import type { Program } from '../types/Program';
import { 
  Calendar, 
  Clock, 
  Award, 
  ArrowLeft, 
  GraduationCap, 
  Info, 
  Send, 
  CheckCircle, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import LegalModal from './LegalModal';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Provera da li imamo podatke iz "state" (parametra) pre nego što pozovemo API
  const [program, setProgram] = useState<Program | null>(location.state?.programData || null);
  const [loading, setLoading] = useState(!location.state?.programData);
  const [agreed, setAgreed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // Stanja za formu
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

  useEffect(() => {
    window.scrollTo(0, 0);

    // 2. Ako podaci nisu prosleđeni kao parametar (npr. korisnik je uradio Refresh), pozovi API
    if (!program) {
      api.get<{ data: Program }>(`/programs/${id}`)
        .then(res => {
          setProgram(res.data.data);
        })
        .catch(err => console.error("Greška pri učitavanju:", err))
        .finally(() => setLoading(false));
    }
  }, [id, program]);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ime je obavezno";
    if (!formData.lastName.trim()) newErrors.lastName = "Prezime je obavezno";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Email nije ispravan";
    if (formData.phone.length < 6) newErrors.phone = "Unesite telefon";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  if (!agreed) {
    alert("Molimo vas da potvrdite da ste upoznati sa uslovima.");
    return;
  }
    
    setIsSubmitting(true);
    try {
      // Slanje prijave u tvoju kolekciju u Strapi-ju
      await api.post('/course-applications', {
        data: { 
          ...formData, 
          courseTitle: program?.title 
        }
      });
      setIsSuccess(true);
      // Vrati na početnu nakon 4 sekunde
      setTimeout(() => navigate('/'), 4000);
    } catch (err) {
      alert("Greška pri slanju prijave. Pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !program) return (
    <div className="py-40 text-center font-black text-ocean animate-pulse uppercase tracking-[0.3em]">
      Učitavanje podataka...
    </div>
  );

  const formattedDate = new Date(program.startDate).toLocaleDateString('sr-RS', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <main className="w-full min-h-screen bg-ocean-light pt-32 pb-24 px-6 md:px-12 lg:px-24">
      {/* Dugme za nazad */}
      <button 
        onClick={() => navigate('/#programi')} 
        className="flex items-center gap-2 text-ocean/60 font-bold mb-10 hover:text-aqua transition-all uppercase text-xs tracking-widest"
      >
        <ArrowLeft size={16} /> Nazad na listu
      </button>

      {/* Na 1400px (desktop) prelazi u red, inače je kolona */}
      <div className="flex flex-col desktop:flex-row gap-12 items-start">
        
        {/* LEVA KOLONA: SVE INFORMACIJE (60%) */}
        <div className="w-full desktop:w-3/5 bg-white p-10 md:p-16 rounded-[3rem] shadow-card border border-gray-100">
          
          {/* Header Kursa */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 bg-ocean-light rounded-3xl flex items-center justify-center text-ocean shadow-inner">
              <GraduationCap size={40} className="text-aqua" />
            </div>
            <div>
              <span className="text-aqua text-[10px] font-black uppercase tracking-[0.3em]">Ronilačka Akademija</span>
              <h1 className="text-5xl font-black text-ocean leading-tight tracking-tighter uppercase">
                {program.title}
              </h1>
            </div>
          </div>

          {/* Opis iz Strapi-ja */}
          <section className="mb-12">
            <h3 className="text-xl font-black text-ocean mb-4 uppercase tracking-tight flex items-center gap-3">
              <Info size={20} className="text-aqua" /> Detalji o programu
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap font-medium">
              {program.longDescription || program.description}
            </p>
          </section>

          {/* Grid sa podacima */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Cena Kursa</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ocean">{program.price}</span>
                <span className="text-sm font-bold text-ocean/50">RSD</span>
              </div>
            </div>
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Datum početka</span>
              <div className="flex items-center gap-2 text-xl font-black text-ocean">
                <Calendar size={20} className="text-aqua" /> {formattedDate}
              </div>
            </div>
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Trajanje obuke</span>
              <div className="flex items-center gap-2 text-xl font-black text-ocean">
                <Clock size={20} className="text-aqua" /> {program.duration}
              </div>
            </div>
            <div className="p-6 bg-ocean-light rounded-2xl border border-aqua/10">
              <span className="text-aqua text-[9px] font-black uppercase tracking-widest block mb-2">Nivo sertifikata</span>
              <div className="flex items-center gap-2 text-xl font-black text-ocean uppercase">
                <Award size={20} className="text-aqua" /> {program.level}
              </div>
            </div>
          </section>

          {/* Preduslovi sekcija */}
          <section className="p-8 bg-ocean rounded-[2rem] text-white relative overflow-hidden">
            <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
            <h3 className="text-xl font-black mb-4 uppercase tracking-tight flex items-center gap-3 relative z-10">
              <Award size={20} className="text-aqua" /> Preduslovi za upis
            </h3>
            <p className="text-white/80 font-bold leading-relaxed italic relative z-10">
              {program.requirements || "Potrebno je lekarsko uverenje o sposobnosti za ronjenje."}
            </p>
          </section>
        </div>

        {/* DESNA KOLONA: FORMA (40%) - STICKY iznad 1400px */}
        <div className="w-full desktop:w-2/5 desktop:sticky desktop:top-32">
          <div className="bg-[#0B2C5F] text-white p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aqua opacity-10 rounded-full blur-3xl"></div>

            {isSuccess ? (
              <div className="py-20 text-center animate-in fade-in zoom-in relative z-10">
                <CheckCircle size={80} className="text-aqua mx-auto mb-6" />
                <h2 className="text-3xl font-black mb-4">Prijava poslata!</h2>
                <p className="text-white/60">Uskoro ćemo vas kontaktirati radi dogovora.</p>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Prijavi se</h2>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Rezervišite mesto na predstojećem kursu</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Ime</label>
                      <input 
                        required
                        type="text" placeholder="Ime" 
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.firstName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Prezime</label>
                      <input 
                        required
                        type="text" placeholder="Prezime" 
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.lastName ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Email</label>
                    <input 
                      required
                      type="email" placeholder="vas@email.com" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.email ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Telefon</label>
                    <input 
                      required
                      type="text" placeholder="+381..." 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 border border-white/10 ${errors.phone ? 'ring-red-400' : 'focus:ring-aqua'}`} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-aqua ml-1">Broj kandidata</label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <Users size={18} className="text-white/30" />
                      <input 
                        type="number" min="1" value={formData.people}
                        onChange={(e) => setFormData({...formData, people: parseInt(e.target.value)})}
                        className="bg-transparent w-full outline-none font-bold text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 px-1 py-4">
                    <input 
                      id="course-legal"
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-aqua focus:ring-aqua cursor-pointer transition-colors"
                    />
                    <label htmlFor="course-legal" className="text-[10px] text-white/50 leading-relaxed cursor-pointer select-none uppercase font-bold tracking-wider">
                      Slanjem ove neobavezujuće prijave prihvatam 
                      <button type="button" onClick={() => setActiveModal('terms')} className="mx-1 text-aqua underline hover:text-white">Uslove korišćenja</button> 
                      i 
                      <button type="button" onClick={() => setActiveModal('privacy')} className="mx-1 text-aqua underline hover:text-white">Politiku privatnosti</button>.
                    </label>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-aqua text-ocean font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-aqua/10 flex items-center justify-center gap-4 mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? "Slanje..." : "ZAKAŽI KURS"} <Send size={20} />
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div className="text-center px-10 mt-8">
            <p className="text-[9px] font-bold text-ocean/30 uppercase tracking-[0.2em]">
              Naši instruktori će vas kontaktirati radi provere opreme i potvrde uvodnog predavanja.
            </p>
          </div>
        </div>

      </div>
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