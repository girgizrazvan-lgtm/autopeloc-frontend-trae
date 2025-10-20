"use client"


export function RomaniaCoverageMap() {
  return (
    <section className="w-full py-16 md:py-24 bg-background" aria-labelledby="coverage-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="coverage-heading" className="text-3xl md:text-4xl font-bold mb-4">
              Acoperire Națională
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Suntem prezenți în principalele orașe din România, gata să vă oferim mobilitate{" "}
              <span className="font-bold text-teal-600 dark:text-teal-400">#peloc</span>
            </p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative w-full aspect-[4/3]">
              <img
          src="/romania-peloc.svg"
                alt="Harta României cu acoperire #peloc în orașele București, Craiova, Sibiu, Brașov, Timișoara, Oradea, Cluj-Napoca, Iași, Suceava și Bacău"
                className="absolute inset-0 w-full h-full object-contain dark:invert dark:brightness-90"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
