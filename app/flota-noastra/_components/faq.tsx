"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Pot alege un model anume sau doar clasa?",
    answer:
      "Poți alege atât clasa de vehicul, cât și un model specific, în funcție de disponibilitate. La rezervare, îți vom confirma modelul exact disponibil în perioada solicitată.",
  },
  {
    question: "Ce echipamente sunt standard?",
    answer:
      "Toate vehiculele din flotă includ aer condiționat, sistem audio, geamuri electrice și oglinzi electrice. Modelele premium includ și navigație GPS, senzori de parcare și alte dotări suplimentare.",
  },
  {
    question: "Pot prelua mașina din alt oraș?",
    answer:
      "Da, oferim servicii de preluare și returnare în 10 orașe din România: București, Craiova, Sibiu, Brașov, Timișoara, Oradea, Cluj-Napoca, Iași, Suceava și Bacău. Beneficiezi de flexibilitate maximă pentru preluare și predare între aceste locații.",
  },
  {
    question: "Cum se calculează garanția/rezervarea pentru RCA/CASCO?",
    answer:
      "Pentru daune acoperite de RCA/CASCO, costurile sunt suportate de asigurător conform poliței tale. Noi te ajutăm cu documentația necesară și comunicăm direct cu asigurătorul pentru aprobare și decontare.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Întrebări frecvente</h2>
            <p className="text-lg text-muted-foreground">Tot ce trebuie să știi despre flota noastră</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl border-2 border-border overflow-hidden">
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
