import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { api } from '../lib/api';
import LegalModal from '../components/LegalModal';

export default function Contact() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Molimo vas da prihvatite uslove i politiku privatnosti.");
      return;
    }
    setStatus('loading');
    try {
      await api.post('/messages', { data: formData });
      setStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      setAgreed(false);
    } catch (error) {
      console.error("Greška pri slanju poruke:", error);
      setStatus('error');
    }
  };

  return (
    <section id="kontakt" className="w-full bg-ocean-light py-24 px-6 md:px-12 lg:px-24">
      <div className="w-full flex flex-col lg:flex-row gap-16">
        
        {/* LEVA STRANA - FORMA */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 rounded-2xl shadow-card relative overflow-hidden">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle size={64} className="text-aqua mb-6" />
              <h2 className="text-3xl font-bold text-ocean mb-2">Poruka je poslata!</h2>
              <p className="text-gray-500">Hvala vam na interesovanju. Naš tim će vas kontaktirati uskoro.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-aqua font-bold hover:underline">
                Pošalji još jednu poruku
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-4xl font-bold text-ocean mb-2">Pošaljite nam poruku</h2>
              <p className="text-gray-500 mb-10">Želite da postanete član? Imate pitanje o kursevima ili putovanjima? Tu smo da pomognemo.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Ime i Prezime</label>
                  <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Marko Marković" className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Email Adresa</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="marko@email.com" className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Naslov poruke</label>
                <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Upit za početni kurs ronjenja" className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-ocean uppercase tracking-widest ml-1">Vaša Poruka</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Kako možemo da vam pomognemo?" className="w-full px-4 py-4 rounded-xl border border-gray-100 bg-ocean-light focus:border-aqua focus:ring-2 focus:ring-aqua/20 outline-none transition-all resize-none" />
              </div>

              {/* IZMENJEN CHECKBOX - SADA KORISTI BUTTONE ZA MODALE */}
              <div className="flex items-start gap-3 px-1 py-2">
                <input 
                  id="legal-consent" 
                  type="checkbox" 
                  required 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)} 
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-aqua focus:ring-aqua transition-colors cursor-pointer" 
                />
                <label htmlFor="legal-consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                  Potvrđujem da sam upoznat i saglasan sa 
                  <button type="button" onClick={() => setActiveModal('terms')} className="mx-1 text-aqua underline hover:text-ocean transition-colors">Uslovima korišćenja</button> 
                  i 
                  <button type="button" onClick={() => setActiveModal('privacy')} className="mx-1 text-aqua underline hover:text-ocean transition-colors">Politikom privatnosti</button> 
                  SU Ronilačka družina.
                </label>
              </div>

              <button disabled={status === 'loading'} className="w-full flex items-center justify-center gap-3 bg-aqua text-ocean font-black py-5 px-10 rounded-xl hover:bg-ocean hover:text-white transition-all duration-300 group disabled:opacity-50">
                {status === 'loading' ? "SLANJE..." : "POŠALJI PORUKU"}
                {status !== 'loading' && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          )}
        </div>

        {/* DESNA STRANA */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-ocean mb-8 leading-tight">Gde se nalazimo?</h2>
          <div className="space-y-8 mb-12">
             <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-2xl text-aqua shrink-0 shadow-sm"><MapPin size={24} /></div>
              <div><h4 className="font-bold text-ocean text-lg uppercase tracking-tight">Adresa</h4><p className="text-gray-500 font-medium">Beograd, Srbija</p></div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-aqua/10 flex items-center justify-center rounded-2xl text-aqua shrink-0 shadow-sm"><Mail size={24} /></div>
              <div><h4 className="font-bold text-ocean text-lg uppercase tracking-tight">Email</h4><p className="text-gray-500 font-medium">ronilackadruzina@gmail.com</p></div>
            </div>
          </div>
          <hr className="border-gray-200 mb-10" />
          <h4 className="text-ocean font-black mb-6 uppercase tracking-[0.2em] text-xs opacity-50">Pratite naše avanture</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/ronilacka__druzina/" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center rounded-2xl text-ocean hover:bg-aqua hover:text-white hover:-translate-y-1 transition-all shadow-card group">
              <FaInstagram size={28} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61580289594121" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white border border-gray-100 flex items-center justify-center rounded-2xl text-ocean hover:bg-aqua hover:text-white hover:-translate-y-1 transition-all shadow-card group">
              <FaFacebookF size={28} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
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

    </section>
  );
}