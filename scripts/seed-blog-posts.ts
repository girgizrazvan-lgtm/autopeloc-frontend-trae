import { PrismaClient } from "@prisma/client"
import { generateUniqueSlug } from "@/lib/slug-uniqueness"

const prisma = new PrismaClient()

async function main() {
  console.log("📝 Starting blog posts migration...")

  try {
    // Blog posts extracted from static pages
    // Note: Content is simplified - full content should be added via admin panel
    const blogPosts = [
      {
        title: "Mașina la schimb în 2025 – Drepturile păgubitului, explicate pas cu pas",
        description:
          "Ghid complet despre dreptul la mașină de înlocuire în 2025. Află ce spune legislația, ce documente sunt necesare și cum poți beneficia de acest drept garantat de lege.",
        excerpt:
          "Legislația în vigoare garantează dreptul la o mașină la schimb pentru orice șofer păgubit. Află cum poți beneficia de acest drept și ce pași trebuie să urmezi.",
        content:
          "<p>În România, peste <strong>200.000 de șoferi</strong> sunt implicați anual în accidente rutiere în care nu sunt vinovați. Pentru majoritatea, lipsa mașinii înseamnă imposibilitatea de a merge la serviciu, de a duce copiii la școală sau de a-și îndeplini obligațiile zilnice. Din fericire, <strong>Norma ASF nr. 20/2017</strong>, actualizată în 2024, garantează dreptul la o mașină de înlocuire pe toată perioada reparației.</p><h2>Cadrul legal actualizat pentru 2025</h2><p><strong>Norma ASF nr. 20/2017</strong>, modificată prin <strong>Norma nr. 23/2024</strong>, stabilește clar că orice persoană păgubită într-un accident rutier în care nu este vinovată are dreptul la despăgubiri care includ și costurile pentru o mașină de înlocuire.</p><p>Conform <strong>art. 3 alin. (1) lit. d)</strong> din normă, asigurătorul RCA al celui vinovat este obligat să acopere \"cheltuielile de închiriere a unui autovehicul similar sau dintr-o clasă inferioară\" pe perioada reparației vehiculului avariat.</p><h2>Pașii practici pentru obținerea mașinii la schimb</h2><p>Pe baza experienței noastre cu peste 5.000 de cazuri gestionate în ultimii 3 ani, am identificat pașii esențiali pentru un proces fără probleme:</p><h3>1. Anunță asiguratorul imediat după accident</h3><p>Contactează asigurătorul RCA al celui vinovat în maxim <strong>24 de ore</strong>. Întârzierea poate complica procesul. Solicită numărul dosarului de daună și numele expertului desemnat.</p><h3>2. Participă la constatarea avariilor</h3><p>Expertul evaluator va examina vehiculul pentru a stabili amploarea daunelor. <strong>Fotografiază toate avariile</strong> din mai multe unghiuri și păstrează procesul-verbal de constatare.</p><h3>3. Alege service-ul pentru reparații</h3><p>Ai libertatea de a alege orice service, autorizat sau neautorizat. <strong>Nu ești obligat</strong> să mergi la service-ul recomandat de asigurator. Solicită un deviz detaliat cu orele de manoperă estimate.</p><h3>4. Solicită explicit mașina de înlocuire</h3><p>Prezintă următoarele documente:</p><ul><li>Constatare amiabilă sau proces-verbal de la poliție</li><li>Copie certificat de înmatriculare</li><li>Copie permis de conducere valabil</li><li>Copie carte de identitate</li><li>Deviz de reparație de la service</li></ul><h2>Calculul perioadei de închiriere</h2><p>Conform <strong>Normei ASF nr. 20/2017, art. 5</strong>, durata pentru care ai dreptul la mașină de înlocuire se calculează după formula: <strong>4 ore manoperă = 1 zi închiriere</strong>.</p><p><strong>Exemplu concret:</strong> Dacă devizul de reparație estimează 32 de ore de manoperă, ai dreptul la 8 zile de mașină la schimb (32 ÷ 4 = 8 zile).</p><h2>Drepturi și obligații în 2025</h2><h3>Drepturile tale garantate</h3><ul><li>Mașină din aceeași clasă sau inferioară</li><li>Livrare în maxim 48 de ore de la solicitare</li><li>Fără costuri suplimentare pentru închiriere</li><li>Prelungire automată dacă reparația durează mai mult din motive obiective</li></ul><h3>Obligațiile tale</h3><ul><li>Să utilizezi mașina cu grijă și conform regulilor de circulație</li><li>Să returnezi mașina cu același nivel de combustibil</li><li>Să anunți imediat orice avarie sau accident cu mașina închiriată</li><li>Să returnezi mașina la finalizarea reparației propriului vehicul</li></ul><h2>Ce faci dacă întâmpini probleme?</h2><p>În practică, unii asigurători încearcă să evite sau să întârzie acordarea mașinii la schimb. Iată ce poți face:</p><h3>Dacă asiguratorul refuză</h3><ol><li>Solicită refuzul în scris (email sau poștă cu confirmare de primire)</li><li>Depune plângere la ASF (Autoritatea de Supraveghere Financiară) - online pe asfromania.ro</li><li>Contactează ANPC (Autoritatea Națională pentru Protecția Consumatorilor) la tel. 021.9551</li><li>Consultă un avocat specializat în daune auto pentru acțiune în instanță</li></ol><p><strong>Statistici ASF 2024:</strong> Din 1.247 de plângeri depuse la ASF în 2024 privind refuzul mașinii la schimb, 89% au fost soluționate în favoarea păgubitului în termen de 30 de zile.</p><h2>Concluzie</h2><p>Dreptul la mașină de înlocuire este garantat prin lege și nu poate fi refuzat dacă îndeplinești condițiile. Experiența noastră arată că pregătirea documentelor din timp și alegerea unui partener de încredere pentru închiriere fac diferența între un proces rapid (2-3 zile) și unul complicat (2-3 săptămâni).</p>",
        category: "Legislație",
        readTime: "5 min",
        keywords: "mașină la schimb, drepturi păgubit, RCA, legislație 2025, mașină de înlocuire, despăgubiri accident",
        publishedAt: new Date("2025-09-08T10:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Provocări reale la obținerea mașinii la schimb: Ce trebuie să știi în 2025",
        description:
          "Conform statisticilor ASF din 2024, peste 35% din păgubiții care solicită mașină la schimb întâmpină dificultăți în obținerea acesteia în primele 48 de ore. Deși Norma ASF nr. 20/2017 garantează acest drept, realitatea din teren arată provocări concrete care trebuie cunoscute și gestionate corect.",
        excerpt:
          "Flote insuficiente, întârzieri birocratice și costuri ascunse - descoperă provocările practice în obținerea mașinii la schimb și cum să le depășești.",
        content:
          "<h2>Cele 3 provocări majore în 2025</h2><h3>1. Lipsa unei flote suficiente</h3><p>În 2025, firmele de închirieri auto din România gestionează aproximativ 45.000 de vehicule destinate înlocuirii, dar cererea în perioade de vârf (vacanțe, sărbători) depășește cu 60% capacitatea disponibilă. Rezultatul: întârzieri de 3-7 zile pentru obținerea unei mașini similare.</p><p><strong>Exemplu real (București, martie 2025):</strong> Un client cu un BMW Seria 3 avariat a așteptat 5 zile pentru o mașină similară (categoria D), deoarece toate vehiculele comparabile erau deja alocate. A acceptat temporar o Skoda Octavia (categoria C+) pentru a nu rămâne fără mobilitate.</p><p><strong>Soluție practică:</strong> Solicită mașina la schimb cât mai repede, preferabil în aceeași zi sau a doua zi după accident. În perioade de vârf, acceptă temporar o mașină dintr-o clasă inferioară și cere ulterior schimbarea cu una similară.</p><h3>2. Întârzieri birocratice</h3><p>Procesarea dosarului de daună și aprobarea mașinii la schimb poate dura 5-10 zile lucrătoare, în funcție de complexitatea cazului și rapiditatea răspunsului asigurătorului.</p><p><strong>Soluție practică:</strong> Pregătește toate documentele din timp (constatare amiabilă, certificat înmatriculare, permis conducere, deviz reparație) și trimite-le imediat către asigurator. Urmează zilnic statusul dosarului.</p><h3>3. Costuri ascunse</h3><p>Unele firme de închirieri auto adaugă costuri suplimentare pentru combustibil, km suplimentari sau întârzieri în returnare, chiar dacă acestea ar trebui să fie acoperite de asigurător.</p><p><strong>Soluție practică:</strong> Citește atent contractul de închiriere și verifică că toate costurile sunt acoperite de asigurător. Nu accepta clauze ascunse sau costuri suplimentare nejustificate.</p>",
        category: "Ghid Practic",
        readTime: "6 min",
        keywords:
          "masina la schimb probleme, provocari masina inlocuire, flota insuficienta, intarzieri birocratice, costuri ascunse inchiriere, masina schimb 2025, dificultati masina inlocuire",
        publishedAt: new Date("2025-09-12T10:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Noile tendințe în sistemul de mașină la schimb pentru accidente în 2025",
        description:
          "Digitalizarea și platformele online transformă radical modul în care șoferii păgubiți obțin mașini la schimb. Iată ce s-a schimbat în 2025 și ce ne așteaptă.",
        excerpt:
          "Digitalizarea și platformele online transformă radical modul în care șoferii păgubiți obțin mașini la schimb. Descoperă ce s-a schimbat în 2025 și ce ne așteaptă.",
        content:
          "<p>Din cauza creșterii numărului de solicitări și a așteptărilor tot mai mari din partea clienților, procesul de acordare a mașinii la schimb a fost semnificativ digitalizat și adaptat în 2025.</p><h2>1. Platforme online și transparență</h2><p>Majoritatea firmelor serioase de închirieri auto și asiguratori folosesc acum platforme digitale ce permit urmărirea în timp real a cererilor și identificarea rapidă a mașinilor disponibile. Prin aceste instrumente, clienții pot vedea atât modelele potrivite, cât și statusul cererii, economisind timp și evitând incertitudinea.</p><p>Această transparență aduce beneficii concrete: nu mai trebuie să suni zilnic pentru a afla dacă mașina e gata, iar procesul devine mult mai predictibil. Platformele moderne afișează în timp real disponibilitatea vehiculelor, documentele necesare și etapele prin care trece cererea ta.</p><h2>2. Optimizarea proceselor</h2><p>Algoritmii de matching automat între cerere și disponibilitate reduc timpul de alocare de la 2-3 zile la câteva ore. Acest lucru aduce beneficii clare atât pentru clienți cât și pentru firme.</p><h2>3. Aplicații mobile</h2><p>Noile aplicații mobile permit urmărirea în timp real a mașinii alocate, programarea preluării și returnării, și gestionarea documentelor direct din telefon.</p>",
        category: "Tendințe",
        readTime: "5 min",
        keywords: "mașină la schimb 2025, tendințe auto, platforme digitale, închirieri auto, asigurări RCA, digitalizare service auto",
        publishedAt: new Date("2025-09-16T09:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Fluxul reparațiilor în service pentru mașina la schimb: pașii critici pentru 2025",
        description:
          "Înțelege procesul complet de reparații și cum să obții mașina la schimb în 2025. Ghid detaliat despre deschiderea dosarului de daună, predarea mașinii în service și calcularea perioadei de înlocuire.",
        excerpt:
          "Înțelege procesul complet de reparații și cum să obții mașina la schimb. Ghid detaliat despre deschiderea dosarului de daună, predarea mașinii în service și calcularea perioadei de înlocuire.",
        content:
          "<p>Când mașina este avariată în urma unui accident în care nu ești vinovat, intră automat într-un flux de reparații bine definit, care implică mai multe etape esențiale pentru obținerea și utilizarea mașinii la schimb.</p><h2>Deschiderea dosarului de daună și constatarea avariilor</h2><p>Primul pas este anunțarea asiguratorului șoferului vinovat și deschiderea dosarului de daună. Apoi are loc constatarea avariilor, fie pe bază de proces verbal poliție, fie prin constatare amiabilă, documente ce vor susține dreptul tău la mașina de înlocuire.</p><h2>Predarea mașinii în service</h2><p>Odată realizate aceste formalități, mașina este predată către service-ul ales pentru diagnosticare și estimarea devizului de reparație. Durata și complexitatea reparațiilor vor influența direct perioada în care poți beneficia de mașina la schimb.</p><h2>Calculele privind durata mașinii la schimb</h2><p>Pentru fiecare 4 ore de manoperă estimate în deviz, ai dreptul la o zi de mașină la schimb. Din acest motiv, un diagnostic precis este important pentru planificare, iar întârzierile legate de piese sau alte situații neprevăzute nu prelungesc această perioadă acoperită de asigurare.</p><h2>Situații de risc în timpul reparațiilor</h2><p>Chiar dacă ai dreptul la mașina de schimb, fluxul reparațiilor poate aduce riscuri care afectează gestionarea eficientă a situației și confortul personal.</p><h3>Întârzieri neprevăzute și lipsa transparenței</h3><p>Timpii lungi de așteptare în service, lipsa unor informații clare despre progresul reparațiilor sau schimbările în estimările inițiale pot crea frustrări majore. În 2025, este recomandat să alegi service-uri care permit accesul clienților la informații online în timp real despre stadiul reparației.</p>",
        category: "Ghid Service",
        readTime: "7 min",
        keywords:
          "flux reparatii service, masina la schimb 2025, dosar dauna, constatare avarii, deviz reparatie, manopera service, piese schimb, clasa masina inlocuire",
        publishedAt: new Date("2025-09-20T09:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Ce se întâmplă dacă reparația mașinii după accident nu este conformă?",
        description:
          "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă. Află cum identifici problemele, ce pași să urmezi și cum să îți protejezi drepturile.",
        excerpt:
          "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă. Află cum identifici problemele, ce pași să urmezi și cum să îți protejezi drepturile.",
        content:
          "<p>Când mașina este reparată după accident, există situații în care reparația nu este conformă cu standardele așteptate. Iată ce trebuie să știi despre drepturile tale și pașii de urmat.</p><h2>Cum identifici problemele</h2><p>Problemele frecvente includ: vopseaua nu se potrivește cu restul mașinii, piese de calitate inferioară, montaj incorect sau funcționalități afectate. Este important să identifici aceste probleme imediat după preluarea mașinii din service.</p><h2>Pașii de urmat</h2><p>1. Documentează problemele cu fotografii și notări detaliate. 2. Contactează service-ul și solicită corectarea problemelor. 3. Dacă service-ul refuză, contactează asigurătorul. 4. În cazuri extreme, depune plângere la ANPC sau ASF.</p>",
        category: "Drepturi Consumator",
        readTime: "6 min",
        keywords: "reparatie neconforma, drepturi consumator, service auto, garantie reparatii, ANPC, ASF",
        publishedAt: new Date("2025-09-24T10:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Practici neetice în reparațiile auto pe RCA: ce trebuie să știe păgubiții în 2025",
        description:
          "Devize umflate, piese de calitate inferioară și întârzieri nejustificate - descoperă practicile neetice în reparațiile auto și cum să te protejezi eficient.",
        excerpt:
          "Devize umflate, piese de calitate inferioară și întârzieri nejustificate - descoperă practicile neetice în reparațiile auto și cum să te protejezi eficient.",
        content:
          "<p>În practică, există service-uri care folosesc practici neetice pentru a maximiza profitul pe seama păgubiților. Aceste practici includ devize umflate, piese de calitate inferioară sau întârzieri nejustificate.</p><h2>Practici comune</h2><p>1. Devize umflate: Adăugarea unor ore de manoperă sau piese care nu sunt necesare. 2. Piese de calitate inferioară: Folosirea de piese second-hand sau de calitate slabă în locul celor noi. 3. Întârzieri nejustificate: Amânarea reparațiilor pentru a maximiza perioada de închiriere.</p><h2>Cum te protejezi</h2><p>1. Solicită devize detaliate de la mai multe service-uri. 2. Verifică calitatea pieselor folosite. 3. Urmează progresul reparațiilor și solicită explicații pentru întârzieri.</p>",
        category: "Protecție Consumator",
        readTime: "8 min",
        keywords: "practici neetice, reparatii auto, RCA, service auto, protectie consumator, devize umflate",
        publishedAt: new Date("2025-09-28T10:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025",
        description:
          "Descoperă cele 12 măsuri concrete implementate de Autoritatea de Supraveghere Financiară, ANAF și ANPC pentru combaterea fraudelor sistematice în sistemul RCA și reducerea prețurilor nejustificate.",
        excerpt:
          "Descoperă cele 12 măsuri concrete implementate de ASF, ANAF și ANPC în 2025 pentru combaterea fraudelor în sistemul RCA și reducerea prețurilor nejustificate.",
        content:
          "<p>În 2025, autoritățile române au implementat un pachet comprehensiv de 12 măsuri concrete pentru combaterea fraudelor sistematice în sistemul RCA. Aceste reforme vizează digitalizarea, transparența și controlul în timp real al proceselor.</p><h2>Reforme în sistemul de asigurări</h2><h3>1. Revizuirea sistemului Bonus-Malus</h3><p>Autoritatea de Supraveghere Financiară a propus o reformă completă a sistemului bonus-malus pentru o mai bună corelare între riscul real și primă.</p><h3>2. Digitalizarea proceselor</h3><p>Toate procesele de daune vor fi digitalizate, reducând posibilitatea de fraude și accelarând procesarea.</p><h3>3. Controale mai strânse</h3><p>ANAF și ASF vor efectua controale mai frecvente și mai riguroase la service-urile auto și firmele de închirieri.</p>",
        category: "Legislație",
        readTime: "10 min",
        keywords: "măsuri ASF 2025, reducere fraude RCA, sistem bonus-malus, digitalizare RCA, controale ANAF, transparență asigurări",
        publishedAt: new Date("2025-10-08T09:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
      {
        title: "Îmbogățirea serviciilor de mașină la schimb în 2025",
        description:
          "Firmele de închirieri auto îmbogățesc continuu serviciile oferite pentru a răspunde nevoilor clienților. Descoperă noile servicii disponibile în 2025.",
        excerpt:
          "Firmele de închirieri auto îmbogățesc continuu serviciile oferite pentru a răspunde nevoilor clienților. Descoperă noile servicii disponibile în 2025.",
        content:
          "<p>În 2025, firmele de închirieri auto au introdus o serie de servicii suplimentare pentru a îmbunătăți experiența clienților, inclusiv livrare și ridicare la domiciliu, suport 24/7 și programe de fidelitate.</p><h2>Servicii noi disponibile</h2><p>1. Livrare și ridicare la domiciliu: Nu mai trebuie să te deplasezi pentru preluarea sau returnarea mașinii. 2. Suport 24/7: Asistență permanentă pentru orice problemă. 3. Programe de fidelitate: Beneficii pentru clienții care folosesc frecvent serviciile.</p>",
        category: "Tendințe",
        readTime: "4 min",
        keywords: "servicii masina schimb, inchirieri auto, livrare domiciliu, suport 24/7, programe fidelitate",
        publishedAt: new Date("2025-10-12T10:00:00Z"),
        isPublished: true,
        ogImage: "/images/dashboard.jpg",
      },
    ]

    console.log(`📊 Found ${blogPosts.length} blog posts to migrate`)

    let successCount = 0
    let skipCount = 0

    for (const post of blogPosts) {
      try {
        // Generate unique slug
        const slug = await generateUniqueSlug(post.title, null)

        // Check if post already exists (by slug)
        const existing = await prisma.blogPost.findUnique({
          where: {
            slug: slug,
          },
        })

        if (existing) {
          console.log(`⏭️  Skipping "${post.title.substring(0, 50)}..." (already exists)`)
          skipCount++
          continue
        }

        // Create blog post
        await prisma.blogPost.create({
          data: {
            title: post.title,
            slug: slug,
            description: post.description,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            read_time: post.readTime,
            keywords: post.keywords,
            published_at: post.publishedAt,
            is_published: post.isPublished,
            og_image: post.ogImage,
          },
        })

        console.log(`✅ Migrated: "${post.title.substring(0, 50)}..." (slug: ${slug})`)
        successCount++
      } catch (error: any) {
        console.error(`❌ Error migrating "${post.title.substring(0, 50)}...":`, error.message)
      }
    }

    console.log("\n📈 Migration Summary:")
    console.log(`   ✅ Successfully migrated: ${successCount}`)
    console.log(`   ⏭️  Skipped (already exist): ${skipCount}`)
    console.log(`   📊 Total processed: ${blogPosts.length}`)
    console.log("\n🎉 Blog posts migration completed!")
  } catch (error: any) {
    console.error("❌ Migration failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error("Fatal error:", e)
    process.exit(1)
  })

