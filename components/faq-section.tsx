"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useState } from "react"

interface FAQ {
  question: string
  answer: string | React.ReactNode
}

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "Ce documente sunt necesare pentru a primi vehiculul de înlocuire?",
      answer: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Documentul de constatare a daunei</li>
          <li>Autorizația pentru efectuarea reparației (dacă este disponibilă)</li>
          <li>Documentul de intrare/ieșire din service</li>
          <li>Copie după Certificatul de Înmatriculare al vehiculului avariat</li>
          <li>Copii după actele de identitate și permisele de conducere (ambele părți implicate)</li>
          <li>Formularul de constatare amiabilă sau procesul verbal al poliției</li>
          <li>Polițele RCA ale ambelor părți</li>
          <li>Devizul estimativ pentru reparații</li>
          <li>Confirmarea că vehiculul a fost introdus în service</li>
        </ul>
      ),
    },
    {
      question: "Există costuri pentru utilizarea mașinii de înlocuire?",
      answer:
        "Nu există niciun cost pentru tine. Cheltuielile de închiriere sunt acoperite direct de asigurătorul șoferului responsabil de accident. Dacă vehiculul tău este considerat daună totală, costul închirierii nu va influența suma pe care o vei primi ca despăgubire. Important: dacă alegi să repari mașina pe cont propriu, fără implicarea asiguratorului, serviciul de mașină de înlocuire va fi disponibil doar contra cost.",
    },
    {
      question: "Care este perioada în care pot folosi mașina de înlocuire?",
      answer: (
        <div className="space-y-4">
          <p>
            Pentru vehiculele care pot fi reparate (nu sunt daună totală), durata de utilizare depinde de timpul necesar
            pentru reparație:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Dacă mașina nu poate fi condusă: de la momentul intrării în service până la finalizarea reparației, cu o
              limită maximă de 30 de zile de la constatarea daunei sau eliberarea autorizației.
            </li>
            <li>
              Dacă mașina poate fi condusă: perioada se stabilește în funcție de estimarea din devizul de reparație.
            </li>
          </ul>
          <p>
            În cazul daunelor totale economice (când reparația nu mai este viabilă), poți beneficia de mașină de
            înlocuire de la data constatării până când primești oferta de despăgubire de la asigurator, în limita a 25%
            din valoarea de piață a vehiculului.
          </p>
        </div>
      ),
    },
    {
      question: "Ce procedură trebuie urmată dacă produc un accident cu mașina de înlocuire?",
      answer:
        "În cazul unui incident, trebuie să anunți imediat autoritățile competente și să obții toate documentele necesare pentru procesarea evenimentului. Pentru detalii complete, consultă secțiunea Termeni și Condiții.",
    },
    {
      question: "Sunt obligat să repar mașina la un anumit service?",
      answer:
        "Ai libertatea completă de a alege service-ul unde dorești să repari vehiculul, indiferent de locație sau de companie. Singura cerință este ca unitatea de reparații să fie autorizată RAR pentru a putea procesa documentația necesară.",
    },
    {
      question: "Pot primi mașină de înlocuire dacă am asigurare CASCO?",
      answer: (
        <div className="space-y-4">
          <p>Da, poți beneficia de vehicul de înlocuire și în cazul dosarelor CASCO, în următoarele situații:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Când asigurătorul CASCO face regres către RCA-ul șoferului vinovat, sau</li>
            <li>
              Când polița ta CASCO include clauza pentru mașină de înlocuire și ai confirmare de la asigurator (în cazul
              în care nu se face regres pe RCA-ul vinovatului).
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Ce tip de vehicul voi primi?",
      answer:
        "Îți punem la dispoziție o gamă variată de vehicule moderne. Mașina de înlocuire va fi din aceeași categorie cu vehiculul tău avariat, astfel încât să beneficiezi de un confort similar. Facem tot posibilul să îți oferim un automobil cât mai apropiat ca și caracteristici de mașina ta.",
    },
    {
      question: "Este important la ce companie de asigurări are polița vinovatul?",
      answer:
        "Nu contează compania de asigurări, atât timp cât polița RCA este emisă de o societate autorizată să opereze în România. Atenție: nu acceptăm polițe RCA emise în străinătate, chiar dacă au corespondent în țara noastră.",
    },
    {
      question: "Când pot ridica mașina de înlocuire?",
      answer:
        "Vehiculul de înlocuire poate fi livrat după ce prezinți toate documentele necesare (menționate la prima întrebare) și după ce ai confirmat că mașina ta a fost introdusă efectiv în service pentru reparații.",
    },
    {
      question: "Care este cadrul legal pentru acest serviciu?",
      answer:
        "Serviciul de mașină de înlocuire este reglementat prin Norma nr. 18/2022, actualizată prin Hotărârea de Guvern nr. 1.326 din 28 decembrie 2023. Articolul 3 din această normă detaliază condițiile de acordare a vehiculului de înlocuire în cazul lipsei de folosință.",
    },
  ])

  // Load FAQs from API
  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => {
        if (!res.ok) {
          console.warn(`[FAQ] API returned ${res.status}, using fallback data`)
          return []
        }
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          console.log(`[FAQ] Successfully loaded ${data.length} FAQs from database`)
          setFaqs(
            data.map((faq: any) => ({
              question: faq.question,
              answer: faq.answer,
            }))
          )
        } else {
          console.warn("[FAQ] No FAQs found in database, using fallback data")
        }
      })
      .catch((error) => {
        console.error("[FAQ] Error loading FAQs from API:", {
          message: error?.message || "Unknown error",
          name: error?.name,
        })
        console.warn("[FAQ] Falling back to static FAQ data")
        // Keep default FAQs if API fails
      })
  }, [])

  // FAQPage Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question, // Fallback for React components
      },
    })),
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      {/* FAQPage Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Întrebări frecvente</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-b-0">
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pt-1 leading-relaxed text-sm md:text-base">
                  {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
