const PolitikaPrivatnosti = () => {
  const lastUpdated = "26. decembar 2025."; // Ažuriraj datum po potrebi

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-ocean py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Politika Privatnosti
          </h1>
          <p className="text-white/70">
            Vaša privatnost i bezbednost podataka su naš prioritet.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-gray-700 leading-relaxed">
        <p className="mb-8 text-sm text-gray-500 italic">
          Poslednji put ažurirano: {lastUpdated}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">1. Uvod</h2>
          <p>
            Dobrodošli na internet stranicu <strong>Sportskog udruženja Ronilačka družina</strong>. 
            Ova Politika privatnosti ima za cilj da vas informiše o tome koje podatke o ličnosti prikupljamo, 
            na koji način ih koristimo, kako ih štitimo i koja su vaša prava u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">2. Rukovalac podacima</h2>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-ocean text-sm">
            <p className="font-bold mb-1">Sportsko udruženje Ronilačka družina</p>
            <p>Matični broj: 28758499</p>
            <p>PIB: 115232786</p>
            <p>Sedište: Požeška 33</p>
            <p>Email: ronilackadruzina@gmail.com</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">3. Podatke koje prikupljamo</h2>
          <p className="mb-4">
            Podatke prikupljamo direktno od vas kada popunite kontakt formu, prijavu za zaron ili formu za upis na ronilački kurs. Ti podaci uključuju:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Osnovni podaci:</strong> Ime i prezime.</li>
            <li><strong>Kontakt podaci:</strong> E-mail adresa i broj telefona.</li>
            <li><strong>Ronilački podaci:</strong> Ronilačka kategorija (federacija i nivo) i broj ostvarenih zarona.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">4. Svrha obrade podataka</h2>
          <p className="mb-2">Vaše podatke koristimo isključivo za sledeće svrhe:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Komunikaciju sa vama i odgovaranje na upite.</li>
            <li>Organizaciju ronilačkih izleta i logističko planiranje zarona.</li>
            <li>Prijavu kandidata za ronilačke kurseve kod međunarodnih ronilačkih federacija (npr. PADI, SSI, CMAS) radi izdavanja sertifikata.</li>
            <li>Ispunjenje zakonskih obaveza Udruženja (vođenje evidencije članova u skladu sa Zakonom o sportu).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">5. Prenos podataka trećim licima</h2>
          <p>
            Vaši podaci se nikada ne prodaju niti daju na korišćenje trećim licima u marketinške svrhe. Podaci se mogu preneti isključivo:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Međunarodnim ronilačkim federacijama u svrhu sertifikacije polaznika kursa.</li>
            <li>Nadležnim državnim organima ukoliko smo na to obavezni po zakonu.</li>
            <li>Pružocima hosting usluga i održavanja sajta (isključivo kao tehničkim obrađivačima).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">6. Čuvanje podataka</h2>
          <p>
            Podaci se čuvaju u periodu koji je neophodan za ostvarenje svrhe obrade. Podaci o polaznicima kurseva čuvaju se u skladu sa pravilima ronilačkih federacija, dok se podaci iz kontakt formi brišu nakon završetka komunikacije, osim ako ne dođe do realizacije saradnje ili učlanjenja u udruženje.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">7. Vaša prava</h2>
          <p className="mb-2">U svakom trenutku imate pravo na:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Pristup vašim podacima i uvid u način obrade.</li>
            <li>Ispravku ili dopunu netačnih podataka.</li>
            <li>Brisanje vaših podataka ("pravo na zaborav").</li>
            <li>Opoziv saglasnosti za obradu podataka.</li>
            <li>Podnošenje pritužbe Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-ocean mb-4">8. Izmene Politike privatnosti</h2>
          <p>
            Zadržavamo pravo da izmenimo ovu Politiku privatnosti usled promena u zakonskoj regulativi ili načinu rada našeg udruženja. Sve izmene će biti objavljene na ovoj stranici.
          </p>
        </section>

        <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center">
          <p className="font-semibold mb-2">Imate pitanja u vezi sa vašim podacima?</p>
          <p className="text-ocean">Kontaktirajte nas putem e-maila: <strong>ronilackadruzina@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PolitikaPrivatnosti;