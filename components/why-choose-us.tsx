const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export function WhyChooseUs() {
  const benefits = [
    { text: "1000 de mașini noi" },
    { text: "Costuri 0 pentru păgubit" },
    { text: "Livrare și colectare gratuită" },
  ]

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-block mb-8 px-4 py-2 bg-teal/10 border border-teal/30 rounded-full">
            <span className="text-sm font-semibold text-teal">
              Pune-ți încrederea în experți și profită de experiență!
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal flex items-center justify-center">
                <CheckIcon />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground whitespace-nowrap">{benefit.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">Gata să experimentezi diferența?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-teal text-white rounded-full font-semibold hover:bg-teal/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Solicită o mașină acum
            </a>
            <a
              href="#fleet"
              className="inline-flex items-center gap-2 px-8 py-3 bg-teal/10 text-teal border-2 border-teal/30 rounded-full font-semibold hover:bg-teal/20 hover:border-teal/50 transition-colors duration-300"
            >
              Vezi flota noastră
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
