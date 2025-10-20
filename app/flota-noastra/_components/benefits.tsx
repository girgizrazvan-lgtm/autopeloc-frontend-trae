import { Sparkles, Clock, Wallet, MapPin } from "lucide-react"

const benefits = [
  {
    icon: Sparkles,
    title: "Flota mereu nouă",
    description: "Vehicule noi, reînnoite la fiecare 2 ani. Conduci ultimele modele și rămâi mereu în trend.",
  },
  {
    icon: Clock,
    title: "Asistență 24/7 și înlocuire #peloc",
    description: "Acoperire tehnică non-stop. Dacă apare o problemă, îți oferim înlocuire imediată.",
  },
  {
    icon: Wallet,
    title: "Toate costurile incluse",
    description: "Fără surprize neplăcute. Tu pui doar benzina, noi ne ocupăm de rest. Explorează fără grizi.",
  },
  {
    icon: MapPin,
    title: "Flexibilitate între 10 orașe",
    description: "Preia și predă mașina în oricare dintre cele 10 orașe active. Mobilitate adaptată nevoilor tale.",
  },
]

export function Benefits() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">De ce să alegi flota noastră</h2>
            <p className="text-lg text-muted-foreground">Beneficii și garanții pentru liniștea ta</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal to-cyan-500 flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
