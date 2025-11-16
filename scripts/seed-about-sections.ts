import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("📄 Starting About sections migration...")

  try {
    // About sections extracted from app/despre-noi/page.tsx
    const aboutSections = [
      {
        section: "hero",
        title: null,
        content:
          "Experiență internațională în servicii auto și soluții de mobilitate. La autopeloc.ro aducem împreună peste un deceniu de experiență în industria automotive și servicii de mobilitate, acumulată atât pe piața românească cât și internațională.",
        order: 0,
      },
      {
        section: "journey",
        title: "Parcursul nostru profesional",
        content:
          "O călătorie de peste 10 ani prin diferite aspecte ale mobilității moderne. Aventura noastră în industria auto a început în cadrul grupului Porsche Romania, unde am petrecut cinci ani îmbogățind cunoștințele despre standardele înalte de calitate în automotive. Următorul pas în evoluția noastră profesională a fost intrarea în domeniul rent-a-car pe piața românească. Timp de doi ani ne-am concentrat pe dezvoltarea și optimizarea serviciilor de închiriere auto. Partea poate cea mai valoroasă a experienței noastre vine din cei cinci ani petrecuți în Marea Britanie, unde am avut privilegiul să experimentez și să înțeleg în profunzime piața europeană de soluții alternative de transport urban, ca utilizator intensiv al serviciilor Zipcar și Ubeeqo.",
        order: 1,
      },
      {
        section: "vision",
        title: "Nașterea conceptului autopeloc.ro",
        content:
          "Combinând experiența din automotive premium, cunoștințele operaționale din rent-a-car românesc și perspectivele dobândite din piața avansată de mobilitate britanică, am conceput autopeloc.ro ca o platformă care să aducă în România cele mai bune practici internaționale. Viziunea noastră: Am observat că piața românească de servicii auto și mobilitate are un potențial imens de dezvoltare, mai ales dacă se aplică lecțiile învățate din piețele mature europene. autopeloc.ro își propune să fie pionierul acestei transformări. Focusul nostru: Ne concentrăm pe dezvoltarea de servicii care să răspundă nevoilor reale ale românilor, fie că vorbim de business-uri care caută soluții eficiente de mobilitate pentru angajați, fie de particulari care doresc alternative flexibile la proprietatea vehiculului personal.",
        order: 2,
      },
      {
        section: "expertise",
        title: "Expertiza care ne diferențiază",
        content:
          "Înțelegerea ecosistemului automotive complet: Experiența acumulată în diverse segmente ale industriei auto ne oferă o perspectivă completă asupra nevoilor și provocărilor din acest domeniu. Știm cum gândesc dealerii, înțelegem așteptările clienților premium și cunoaștem realitățile operaționale ale companiilor de închiriere. Cunoașterea tendințelor europene în mobilitate: Timpul petrecut în UK ne-a expus la cele mai avansate concepte de mobilitate urbană și ne-a arătat cum arată viitorul transportului în orașele europene. Această experiență ne permite să anticipăm și să pregătim piața românească pentru schimbările care vin. Abordarea pragmatică și orientată spre rezultate: Experiența combinată ne-a învățat că succesul în serviciile de mobilitate vine din echilibrul dintre inovație și pragmatism. Știm ce funcționează în teorie și, mai important, ce funcționează în practică.",
        order: 3,
      },
      {
        section: "commitment",
        title: "Angajamentul nostru către piața românească",
        content:
          "La autopeloc.ro ne-am asumat misiunea de a aduce în România cele mai bune practici din serviciile de mobilitate europene, adaptate la specificul și nevoile locale. Lucrăm pentru a dezvolta soluții care să fie: Accesibile și ușor de înțeles pentru utilizatorii români, indiferent de nivelul lor de familiaritate cu tehnologia. Eficiente din punct de vedere economic, oferind alternative reale la modelele tradiționale de transport. Sustenabile pe termen lung, contribuind la dezvoltarea unei mobilități mai responsabile în România. Scalabile și adaptabile la evoluția rapidă a tehnologiilor și a așteptărilor consumatorilor.",
        order: 4,
      },
      {
        section: "cta",
        title: "De ce să colaborezi cu autopeloc.ro",
        content:
          "Când alegi să lucrezi cu noi, beneficiezi de o experiență unică în piața românească: combinația dintre standardele premium Porsche, pragmatismul operațional al rent-a-car-ului local și viziunea internațională dobândită în una dintre cele mai avansate piețe de mobilitate din Europa. autopeloc.ro nu este doar o companie de servicii auto - este rezultatul unei călătorii de peste zece ani prin diferite aspecte ale mobilității moderne, de la luxury automotive la car-sharing comunitar.",
        order: 5,
      },
    ]

    console.log(`📊 Found ${aboutSections.length} sections to migrate`)

    let successCount = 0
    let skipCount = 0

    for (const section of aboutSections) {
      try {
        // Check if section already exists
        const existing = await prisma.aboutPage.findUnique({
          where: {
            section: section.section,
          },
        })

        if (existing) {
          // Update existing section
          await prisma.aboutPage.update({
            where: { section: section.section },
            data: {
              title: section.title,
              content: section.content,
              order: section.order,
            },
          })
          console.log(`🔄 Updated: ${section.section}`)
          skipCount++
          continue
        }

        // Create section
        await prisma.aboutPage.create({
          data: section,
        })

        console.log(`✅ Migrated: ${section.section}`)
        successCount++
      } catch (error: any) {
        console.error(`❌ Error migrating ${section.section}:`, error.message)
      }
    }

    console.log("\n📈 Migration Summary:")
    console.log(`   ✅ Successfully migrated: ${successCount}`)
    console.log(`   🔄 Updated (already exist): ${skipCount}`)
    console.log(`   📊 Total processed: ${aboutSections.length}`)
    console.log("\n🎉 About sections migration completed!")
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

