import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("❓ Starting FAQ migration...")

  try {
    // FAQs from components/faq-section.tsx (main FAQs)
    const mainFAQs = [
      {
        question: "Ce documente sunt necesare pentru a primi vehiculul de înlocuire?",
        answer:
          "Documentul de constatare a daunei, Autorizația pentru efectuarea reparației (dacă este disponibilă), Documentul de intrare/ieșire din service, Copie după Certificatul de Înmatriculare al vehiculului avariat, Copii după actele de identitate și permisele de conducere (ambele părți implicate), Formularul de constatare amiabilă sau procesul verbal al poliției, Polițele RCA ale ambelor părți, Devizul estimativ pentru reparații, Confirmarea că vehiculul a fost introdus în service.",
        order: 1,
        isActive: true,
      },
      {
        question: "Există costuri pentru utilizarea mașinii de înlocuire?",
        answer:
          "Nu există niciun cost pentru tine. Cheltuielile de închiriere sunt acoperite direct de asigurătorul șoferului responsabil de accident. Dacă vehiculul tău este considerat daună totală, costul închirierii nu va influența suma pe care o vei primi ca despăgubire. Important: dacă alegi să repari mașina pe cont propriu, fără implicarea asiguratorului, serviciul de mașină de înlocuire va fi disponibil doar contra cost.",
        order: 2,
        isActive: true,
      },
      {
        question: "Care este perioada în care pot folosi mașina de înlocuire?",
        answer:
          "Pentru vehiculele care pot fi reparate (nu sunt daună totală), durata de utilizare depinde de timpul necesar pentru reparație: Dacă mașina nu poate fi condusă: de la momentul intrării în service până la finalizarea reparației, cu o limită maximă de 30 de zile de la constatarea daunei sau eliberarea autorizației. Dacă mașina poate fi condusă: perioada se stabilește în funcție de estimarea din devizul de reparație. În cazul daunelor totale economice (când reparația nu mai este viabilă), poți beneficia de mașină de înlocuire de la data constatării până când primești oferta de despăgubire de la asigurator, în limita a 25% din valoarea de piață a vehiculului.",
        order: 3,
        isActive: true,
      },
      {
        question: "Ce procedură trebuie urmată dacă produc un accident cu mașina de înlocuire?",
        answer:
          "În cazul unui incident, trebuie să anunți imediat autoritățile competente și să obții toate documentele necesare pentru procesarea evenimentului. Pentru detalii complete, consultă secțiunea Termeni și Condiții.",
        order: 4,
        isActive: true,
      },
      {
        question: "Sunt obligat să repar mașina la un anumit service?",
        answer:
          "Ai libertatea completă de a alege service-ul unde dorești să repari vehiculul, indiferent de locație sau de companie. Singura cerință este ca unitatea de reparații să fie autorizată RAR pentru a putea procesa documentația necesară.",
        order: 5,
        isActive: true,
      },
      {
        question: "Pot primi mașină de înlocuire dacă am asigurare CASCO?",
        answer:
          "Da, poți beneficia de vehicul de înlocuire și în cazul dosarelor CASCO, în următoarele situații: Când asigurătorul CASCO face regres către RCA-ul șoferului vinovat, sau Când polița ta CASCO include clauza pentru mașină de înlocuire și ai confirmare de la asigurator (în cazul în care nu se face regres pe RCA-ul vinovatului).",
        order: 6,
        isActive: true,
      },
      {
        question: "Ce tip de vehicul voi primi?",
        answer:
          "Îți punem la dispoziție o gamă variată de vehicule moderne. Mașina de înlocuire va fi din aceeași categorie cu vehiculul tău avariat, astfel încât să beneficiezi de un confort similar. Facem tot posibilul să îți oferim un automobil cât mai apropiat ca și caracteristici de mașina ta.",
        order: 7,
        isActive: true,
      },
      {
        question: "Este important la ce companie de asigurări are polița vinovatul?",
        answer:
          "Nu contează compania de asigurări, atât timp cât polița RCA este emisă de o societate autorizată să opereze în România. Atenție: nu acceptăm polițe RCA emise în străinătate, chiar dacă au corespondent în țara noastră.",
        order: 8,
        isActive: true,
      },
      {
        question: "Când pot ridica mașina de înlocuire?",
        answer:
          "Vehiculul de înlocuire poate fi livrat după ce prezinți toate documentele necesare (menționate la prima întrebare) și după ce ai confirmat că mașina ta a fost introdusă efectiv în service pentru reparații.",
        order: 9,
        isActive: true,
      },
      {
        question: "Care este cadrul legal pentru acest serviciu?",
        answer:
          "Serviciul de mașină de înlocuire este reglementat prin Norma nr. 18/2022, actualizată prin Hotărârea de Guvern nr. 1.326 din 28 decembrie 2023. Articolul 3 din această normă detaliază condițiile de acordare a vehiculului de înlocuire în cazul lipsei de folosință.",
        order: 10,
        isActive: true,
      },
    ]

    // FAQs from app/flota-noastra/_components/faq.tsx (fleet-specific FAQs)
    const fleetFAQs = [
      {
        question: "Pot alege un model anume sau doar clasa?",
        answer:
          "Poți alege atât clasa de vehicul, cât și un model specific, în funcție de disponibilitate. La rezervare, îți vom confirma modelul exact disponibil în perioada solicitată.",
        order: 11,
        isActive: true,
      },
      {
        question: "Ce echipamente sunt standard?",
        answer:
          "Toate vehiculele din flotă includ aer condiționat, sistem audio, geamuri electrice și oglinzi electrice. Modelele premium includ și navigație GPS, senzori de parcare și alte dotări suplimentare.",
        order: 12,
        isActive: true,
      },
      {
        question: "Pot prelua mașina din alt oraș?",
        answer:
          "Da, oferim servicii de preluare și returnare în 10 orașe din România: București, Craiova, Sibiu, Brașov, Timișoara, Oradea, Cluj-Napoca, Iași, Suceava și Bacău. Beneficiezi de flexibilitate maximă pentru preluare și predare între aceste locații.",
        order: 13,
        isActive: true,
      },
      {
        question: "Cum se calculează garanția/rezervarea pentru RCA/CASCO?",
        answer:
          "Pentru daune acoperite de RCA/CASCO, costurile sunt suportate de asigurător conform poliței tale. Noi te ajutăm cu documentația necesară și comunicăm direct cu asigurătorul pentru aprobare și decontare.",
        order: 14,
        isActive: true,
      },
    ]

    const allFAQs = [...mainFAQs, ...fleetFAQs]

    console.log(`📊 Found ${allFAQs.length} FAQs to migrate`)

    let successCount = 0
    let skipCount = 0

    for (const faq of allFAQs) {
      try {
        // Check if FAQ already exists (by question)
        const existing = await prisma.fAQ.findFirst({
          where: {
            question: faq.question,
          },
        })

        if (existing) {
          console.log(`⏭️  Skipping "${faq.question.substring(0, 50)}..." (already exists)`)
          skipCount++
          continue
        }

        // Create FAQ
        await prisma.fAQ.create({
          data: faq,
        })

        console.log(`✅ Migrated: "${faq.question.substring(0, 50)}..."`)
        successCount++
      } catch (error: any) {
        console.error(`❌ Error migrating "${faq.question.substring(0, 50)}...":`, error.message)
      }
    }

    console.log("\n📈 Migration Summary:")
    console.log(`   ✅ Successfully migrated: ${successCount}`)
    console.log(`   ⏭️  Skipped (already exist): ${skipCount}`)
    console.log(`   📊 Total processed: ${allFAQs.length}`)
    console.log("\n🎉 FAQ migration completed!")
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

