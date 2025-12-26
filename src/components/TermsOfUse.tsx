const UsloviKoriscenja = () => {
  const lastUpdated = "26. decembar 2025.";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-ocean py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Uslovi Korišćenja
          </h1>
          <p className="text-white/70">
            Pravila i uslovi korišćenja internet stranice SU Ronilačka družina.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-gray-700 leading-relaxed">
        <p className="mb-8 text-sm text-gray-500 italic">
          Poslednji put ažurirano: {lastUpdated}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">1. Opšte odredbe</h2>
          <p>
            Vlasnik i administrator ove internet stranice je <strong>Sportsko udruženje Ronilačka družina</strong> (u daljem tekstu: "Udruženje"). 
            Korišćenjem bilo kog dela ovog sajta, automatski prihvatate sve aktuelne uslove korišćenja. Ukoliko se ne slažete sa bilo kojim delom ovih uslova, molimo vas da ne koristite sajt.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">2. Intelektualna svojina</h2>
          <p className="mb-4">
            Svi originalni sadržaji objavljeni na sajtu (uključujući logotip Udruženja, dizajn sajta, autorske tekstove i fotografije sa klupskih aktivnosti) predstavljaju isključivo intelektualno vlasništvo Udruženja.
          </p>
          <p className="mb-4">
            Pojedine fotografije na sajtu su preuzete sa besplatnih servisa za deljenje fotografija (kao što su Unsplash, Pexels, Pixabay) i korišćene su u skladu sa njihovim licencama koje dozvoljavaju besplatnu upotrebu u komercijalne i nekomercijalne svrhe. Udruženje ne polaže autorska prava na ove eksterne materijale.
          </p>
          <p className="font-bold border-l-4 border-aqua pl-4 py-2 bg-ocean-light/20">
            Strogo je zabranjeno neovlašćeno preuzimanje i korišćenje logotipa Udruženja, kao i autorskih tekstova i fotografija koje su u direktnom vlasništvu Udruženja, bez prethodne pisane saglasnosti.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">3. Tačnost informacija</h2>
          <p>
            Udruženje ulaže maksimalne napore da sve informacije o terminima zarona, cenama kurseva i destinacijama budu tačne. Ipak, zadržavamo pravo na izmene informacija bez prethodne najave. 
            Sve informacije na sajtu su informativnog karaktera i ne predstavljaju obavezujuću ponudu dok se ne potvrde direktnim kontaktom sa Udruženjem.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">4. Online rezervacije i prijave (Upit)</h2>
          <p className="mb-4">
            Popunjavanjem forme za rezervaciju izleta ili prijavu na kurs putem ovog sajta, korisnik šalje <strong>neobavezujući upit</strong> i izražava interesovanje za određenu aktivnost.
          </p>
          <p className="font-semibold text-ocean">
            Ovaj čin se ne smatra kupovinom niti automatskom potvrdom mesta. Rezervacija se smatra važećom tek nakon što Udruženje direktno potvrdi dostupnost termina i mesta putem e-maila ili telefona.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">5. Finansijski uslovi i plaćanje</h2>
          <p className="mb-4">
            Udruženje <strong>ne vrši online naplatu usluga</strong> putem ove internet stranice. Na sajtu nije moguće uneti podatke o platnim karticama niti izvršiti digitalnu transakciju.
          </p>
          <p>
            Sva plaćanja (članarine, depoziti ili troškovi aktivnosti) regulišu se isključivo direktnim putem: uplatom na tekući račun Udruženja ili gotovinski u prostorijama kluba, odnosno na mestu okupljanja, a u skladu sa internim pravilima i instrukcijama Udruženja.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">6. Odricanje od odgovornosti (Diving Disclaimer)</h2>
          <p className="p-4 bg-red-50 text-red-900 rounded-xl border border-red-100 italic">
            Ronjenje je aktivnost koja nosi određene rizike. Informacije na ovom sajtu ne mogu zameniti profesionalnu ronilačku obuku i lekarski pregled. 
            Udruženje ne snosi odgovornost za bilo kakvu štetu, povredu ili gubitak koji nastane kao posledica korišćenja informacija sa ovog sajta bez nadzora licenciranog instruktora ili adekvatne sertifikacije.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">7. Ponašanje korisnika</h2>
          <p className="mb-2">Korisnici se obavezuju da sajt neće koristiti za:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Slanje lažnih prijava ili spam poruka putem kontakt formi.</li>
            <li>Pokušaje narušavanja bezbednosti sajta ili hakovanje baze podataka.</li>
            <li>Postavljanje uvredljivih sadržaja ili komentara.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">8. Linkovi ka drugim sajtovima</h2>
          <p>
            Naš sajt može sadržati linkove ka eksternim sajtovima (npr. PADI, SSI, vremenska prognoza). Udruženje nema kontrolu nad sadržajem tih sajtova i ne snosi odgovornost za njihove uslove korišćenja ili politiku privatnosti.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">9. Izmene uslova</h2>
          <p>
            Udruženje zadržava pravo da u bilo kom trenutku izmeni ove Uslove korišćenja. Nove verzije će biti objavljene na ovoj stranici i stupaju na snagu u trenutku objave.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">10. Nadležnost</h2>
          <p>
            U slučaju bilo kakvog spora proisteklog iz korišćenja ovog sajta, biće nadležan sud u Beogradu, uz primenu zakona Republike Srbije.
          </p>
        </section>

        <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center border border-gray-100">
          <p className="font-semibold mb-2 italic text-ocean">Hvala vam što poštujete pravila naše ronilačke zajednice!</p>
          <p className="text-gray-500 text-sm">Vaša Ronilačka družina</p>
        </div>
      </div>
    </div>
  );
};

export default UsloviKoriscenja;