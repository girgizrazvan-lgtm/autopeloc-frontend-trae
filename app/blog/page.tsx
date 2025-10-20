import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Informații utile despre mașini de înlocuire | autopeloc.ro",
  description:
    "Articole despre drepturile șoferilor, legislație RCA, mașini de înlocuire și tot ce trebuie să știi despre despăgubiri în urma accidentelor rutiere.",
  openGraph: {
    title: "Blog - Informații utile | autopeloc.ro",
    description: "Articole despre drepturile șoferilor și legislație RCA",
  },
  alternates: {
    canonical: "https://autopeloc.ro/blog",
  },
}

const blogPosts = [
  {
    slug: "masina-la-schimb-2025-drepturi-pagubit",
    title: "Mașina la schimb în 2025 – Drepturile păgubitului, explicate pas cu pas",
    excerpt:
      "Legislația în vigoare garantează dreptul la o mașină la schimb pentru orice șofer păgubit. Află cum poți beneficia de acest drept și ce pași trebuie să urmezi.",
    date: "8 septembrie 2025",
    category: "Legislație",
    readTime: "5 min",
  },
  {
    slug: "provocari-masina-la-schimb-2025",
    title: "Provocări reale la obținerea mașinii la schimb: Ce trebuie să știi în 2025",
    excerpt:
      "Flote insuficiente, întârzieri birocratice și costuri ascunse - descoperă provocările practice în obținerea mașinii la schimb și cum să le depășești.",
    date: "12 septembrie 2025",
    category: "Ghid Practic",
    readTime: "6 min",
  },
  {
    slug: "tendinte-masina-la-schimb-2025",
    title: "Noile tendințe în sistemul de mașină la schimb pentru accidente în 2025",
    excerpt:
      "Digitalizarea și platformele online transformă radical modul în care șoferii păgubiți obțin mașini la schimb. Descoperă ce s-a schimbat în 2025 și ce ne așteaptă.",
    date: "16 septembrie 2025",
    category: "Tendințe",
    readTime: "5 min",
  },
  {
    slug: "flux-reparatii-service-masina-schimb-2025",
    title: "Fluxul reparațiilor în service pentru mașina la schimb: pașii critici pentru 2025",
    excerpt:
      "Înțelege procesul complet de reparații și cum să obții mașina la schimb. Ghid detaliat despre deschiderea dosarului de daună, predarea mașinii în service și calcularea perioadei de înlocuire.",
    date: "20 septembrie 2025",
    category: "Ghid Service",
    readTime: "7 min",
  },
  {
    slug: "reparatie-neconforma-dupa-accident",
    title: "Ce se întâmplă dacă reparația mașinii după accident nu este conformă?",
    excerpt:
      "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă. Află cum identifici problemele, ce pași să urmezi și cum să îți protejezi drepturile.",
    date: "24 septembrie 2025",
    category: "Drepturi Consumator",
    readTime: "6 min",
  },
  {
    slug: "practici-neetice-reparatii-rca-2025",
    title: "Practici neetice în reparațiile auto pe RCA: ce trebuie să știe păgubitții în 2025",
    excerpt:
      "Devize umflate, piese de calitate inferioară și întârzieri nejustificate - descoperă practicile neetice în reparațiile auto și cum să te protejezi eficient.",
    date: "28 septembrie 2025",
    category: "Protecție Consumator",
    readTime: "8 min",
  },
  {
    slug: "imbogatire-service-uri-masina-schimb",
    title: "Cum s-au îmbogățit service-urile nejust de pe urma legilor cu mașina la schimb",
    excerpt:
      "Investigație despre abuzurile sistemice în piața mașinilor la schimb: cazuri concrete de devize umflate, mecanisme de îmbogățire și impactul asupra prețurilor RCA.",
    date: "2 octombrie 2025",
    category: "Investigație",
    readTime: "10 min",
  },
  {
    slug: "masuri-asf-reducere-fraude-2025",
    title: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025",
    excerpt:
      "Descoperă cele 12 măsuri concrete implementate de ASF, ANAF și ANPC pentru combaterea fraudelor în sistemul RCA și reducerea prețurilor nejustificate.",
    date: "6 octombrie 2025",
    category: "Legislație",
    readTime: "10 min",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-teal-600 text-teal-600">
              Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Articole și informații utile</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
              Tot ce trebuie să știi despre drepturile tale ca șofer și legislația în vigoare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border-border/50">
                  {/* Gradient top section */}
                  <div className="h-2 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500" />

                  <div className="p-6 flex flex-col h-full">
                    {/* Category badge with gradient */}
                    <Badge className="w-fit mb-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0">
                      {post.category}
                    </Badge>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-teal-600 transition-colors text-balance leading-tight">
                      {post.title}
                    </h2>

                    {/* Separator */}
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 flex-grow text-pretty text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Date and read time */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} citire</span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-teal-600 font-medium group-hover:gap-2 transition-all">
                      Citește articolul
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
