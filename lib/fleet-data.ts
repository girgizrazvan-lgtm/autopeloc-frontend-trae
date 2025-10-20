export interface CarSpecs {
  engine: string
  transmission: string // Can now be "Manual", "Automat", or "Manual / Automat"
  seats: number
  fuel: string
}

export interface Car {
  name: string
  image: string
  specs: CarSpecs
  sippCode: string // SIPP code (stored but not displayed in front-end)
}

export interface CarClass {
  slug: string
  title: string
  description: string
  carCount: number
  acrissCode: string
  sippCodes: string[]
  cars: Car[]
}

export const carClasses: CarClass[] = [
  {
    slug: "economy",
    title: "Economy",
    description: "Mașini economice perfecte pentru oraș",
    acrissCode: "Economy",
    sippCodes: ["MCMR", "MDMR", "NBMH", "HDMR", "EDAR"],
    carCount: 9,
    cars: [
      {
        name: "Opel Corsa",
        image: "/opel-corsa.svg",
        specs: { engine: "1.2 Turbo 100 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "MCMR",
      },
      {
        name: "Fiat 500",
        image: "/fiat-500.svg",
        specs: { engine: "1.0 Hybrid 70 CP", transmission: "Manual", seats: 4, fuel: "Hybrid" },
        sippCode: "MDMR",
      },
      {
        name: "Toyota Aygo X",
        image: "/toyota-aygo-x.svg",
        specs: { engine: "1.0 VVT-i 72 CP", transmission: "Manual", seats: 4, fuel: "Benzină" },
        sippCode: "MDMR",
      },
      {
        name: "Renault Clio",
        image: "/images/renault-clio.svg",
        specs: { engine: "1.0 TCe 100 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "HDMR",
      },
      {
        name: "Peugeot 208",
        image: "/peugeot-208.svg",
        specs: { engine: "1.2 PureTech 100 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "NBMH",
      },
      {
        name: "Škoda Fabia",
        image: "/skoda-fabia.svg", // Updated to use new SVG image
        specs: { engine: "1.0 TSI 95 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "HDMR",
      },
      {
        name: "Citroen C3",
        image: "/citroen-c3.svg",
        specs: { engine: "1.2 PureTech 83 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "HDMR",
      },
      {
        name: "VW Polo",
        image: "/vw-polo.svg",
        specs: { engine: "1.0 TSI 95 CP", transmission: "Automat", seats: 5, fuel: "Benzină" },
        sippCode: "EDAR",
      },
      {
        name: "Toyota Yaris",
        image: "/toyota-yaris.svg",
        specs: { engine: "1.5 Hybrid 116 CP", transmission: "Automat", seats: 5, fuel: "Hybrid" },
        sippCode: "EDAR",
      },
    ],
  },
  {
    slug: "compact",
    title: "Compact",
    description: "Echilibrul perfect între confort și eficiență",
    acrissCode: "Compact",
    sippCodes: ["CDMR", "EGMR", "DDMR", "CDAR", "EGAR", "DDAR"],
    carCount: 5,
    cars: [
      {
        name: "VW Golf",
        image: "/vw-golf.svg", // Updated to use new standardized SVG
        specs: { engine: "1.5 TSI 130 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "CDMR",
      },
      {
        name: "Dacia Sandero Stepway",
        image: "/dacia-sandero-stepway.svg",
        specs: { engine: "1.0 TCe 90 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "EGMR",
      },
      {
        name: "Škoda Scala",
        image: "/images/skoda-scala.svg",
        specs: { engine: "1.0 TSI 110 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "DDMR",
      },
      {
        name: "Ford Focus",
        image: "/ford-focus.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 EcoBoost 125 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "CDAR",
      },
      {
        name: "Renault Megane",
        image: "/renault-megane.svg", // Updated to use new standardized SVG
        specs: { engine: "1.3 TCe 140 CP", transmission: "Automat", seats: 5, fuel: "Benzină" },
        sippCode: "EGAR",
      },
    ],
  },
  {
    slug: "crossover",
    title: "Crossover",
    description: "Versatilitate urbană cu stil aventuros",
    acrissCode: "Crossover",
    sippCodes: ["CGMR", "SFMR", "FFNR", "CGAR", "SFAR"],
    carCount: 15,
    cars: [
      {
        name: "Peugeot 2008",
        image: "/images/peugeot-2008.svg",
        specs: { engine: "1.2 PureTech 130 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "CGMR",
      },
      {
        name: "Citroen C3 Aircross",
        image: "/citroen-c3-aircross.svg",
        specs: { engine: "1.2 PureTech 110 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "CGMR",
      },
      {
        name: "Seat Arona",
        image: "/seat-arona.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 TSI 110 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "SFMR",
      },
      {
        name: "Ford EcoSport",
        image: "/ford-ecosport.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 EcoBoost 125 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "SFMR",
      },
      {
        name: "Renault Captur",
        image: "/renault-captur.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 TCe 100 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "SFMR",
      },
      {
        name: "Opel Mokka",
        image: "/opel-mokka.svg", // Updated to use new standardized SVG
        specs: { engine: "1.2 Turbo 110 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "FFNR",
      },
      {
        name: "Nissan Juke",
        image: "/images/Nissan Juke.svg",
        specs: { engine: "1.0 DIG-T 114 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "FFNR",
      },
      {
        name: "VW T-Roc",
        image: "/vw-t-roc.svg", // Updated to use new standardized SVG
        specs: { engine: "1.5 TSI 150 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "CGMR",
      },
      {
        name: "VW T-Cross",
        image: "/vw-t-cross.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 TSI 110 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "CGMR",
      },
      {
        name: "VW Taigo",
        image: "/vw-taigo.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 TSI 95 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "FFNR",
      },
      {
        name: "Opel Crossland",
        image: "/opel-crossland.svg", // Updated to use new standardized SVG
        specs: { engine: "1.2 Turbo 110 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "SFMR",
      },
      {
        name: "Škoda Kamiq",
        image: "/skoda-kamiq.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 TSI 110 CP", transmission: "Manual / Automat", seats: 5, fuel: "Benzină" },
        sippCode: "SFAR",
      },
      {
        name: "Toyota C-HR",
        image: "/toyota-c-hr.svg", // Updated to use new standardized SVG
        specs: { engine: "1.8 Hybrid 122 CP", transmission: "Automat", seats: 5, fuel: "Hybrid" },
        sippCode: "SFAR",
      },
      {
        name: "Ford Puma",
        image: "/ford-puma.svg",
        specs: { engine: "1.0 EcoBoost 125 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "FFNR",
      },
      {
        name: "Opel Crossland",
        image: "/opel-crossland.svg",
        specs: { engine: "1.2 Turbo 110 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "CGMR",
      },
    ],
  },
  {
    slug: "estate-suv",
    title: "Estate & SUV",
    description: "Spațiu generos și confort ridicat",
    acrissCode: "Estate/SUV",
    sippCodes: ["CWMR", "GFBR", "PLAR"],
    carCount: 7,
    cars: [
      {
        name: "Ford Focus SW",
        image: "/ford-focus-sw.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 EcoBoost 125 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "CWMR",
      },
      {
        name: "Kia Ceed Estate",
        image: "/images/kia-ceed-estate.svg",
        specs: { engine: "1.0 T-GDI 120 CP", transmission: "Manual", seats: 5, fuel: "Benzină" },
        sippCode: "CWMR",
      },
      {
        name: "Peugeot 3008",
        image: "/peugeot-3008.svg", // Updated to use new standardized SVG
        specs: { engine: "1.5 BlueHDi 130 CP", transmission: "Automat", seats: 5, fuel: "Diesel" },
        sippCode: "GFBR",
      },
      {
        name: "Nissan Qashqai",
        image: "/nissan-qashqai.svg", // Updated to use new standardized SVG
        specs: { engine: "1.3 DIG-T 140 CP", transmission: "Automat", seats: 5, fuel: "Benzină" },
        sippCode: "GFBR",
      },
      {
        name: "Seat Ateca",
        image: "/seat-ateca.svg", // Updated to use new standardized SVG
        specs: { engine: "1.5 TSI 150 CP", transmission: "Automat", seats: 5, fuel: "Benzină" },
        sippCode: "GFBR",
      },
      {
        name: "Ford Kuga",
        image: "/ford-kuga.svg", // Updated to use new standardized SVG
        specs: { engine: "1.5 EcoBoost 150 CP", transmission: "Automat", seats: 5, fuel: "Benzină" },
        sippCode: "PLAR",
      },
      {
        name: "Jeep Compass",
        image: "/jeep-compass.svg", // Updated to use new standardized SVG
        specs: { engine: "1.3 Turbo 150 CP", transmission: "Automat", seats: 5, fuel: "Benzină" },
        sippCode: "PLAR",
      },
    ],
  },
  {
    slug: "monovolum",
    title: "Monovolum",
    description: "Spațiu maxim pentru familii mari",
    acrissCode: "Monovolum",
    sippCodes: ["FVMR"],
    carCount: 1,
    cars: [
      {
        name: "Dacia Jogger 7 seats",
        image: "/dacia-jogger.svg", // Updated to use new standardized SVG
        specs: { engine: "1.0 TCe 110 CP", transmission: "Manual", seats: 7, fuel: "Benzină" },
        sippCode: "FVMR",
      },
    ],
  },
  {
    slug: "van-8-seats",
    title: "VAN 8 seats",
    description: "Transport pentru grupuri mari",
    acrissCode: "VAN 8 seats",
    sippCodes: ["XMMR"],
    carCount: 1,
    cars: [
      {
        name: "Renault Trafic 8 Seats",
        image: "/renault-trafic.svg", // Updated to use new standardized SVG
        specs: { engine: "2.0 dCi 120 CP", transmission: "Manual", seats: 8, fuel: "Diesel" },
        sippCode: "XMMR",
      },
    ],
  },
  {
    slug: "utility-van",
    title: "Utility VAN",
    description: "Capacitate maximă pentru transport marfă",
    acrissCode: "Utility VAN",
    sippCodes: ["XKMD"],
    carCount: 2,
    cars: [
      {
        name: "Peugeot Boxer",
        image: "/peugeot-boxer.svg", // Updated to use new standardized SVG
        specs: { engine: "2.2 BlueHDi 140 CP", transmission: "Manual", seats: 3, fuel: "Diesel" },
        sippCode: "XKMD",
      },
      {
        name: "Fiat Ducato",
        image: "/images/Fiat Ducato.svg",
        specs: { engine: "2.3 MultiJet 140 CP", transmission: "Manual", seats: 3, fuel: "Diesel" },
        sippCode: "XKMD",
      },
    ],
  },
  {
    slug: "small-suv-luxury",
    title: "Small SUV Luxury",
    description: "Lux compact pentru oraș",
    acrissCode: "Small SUV Luxury",
    sippCodes: ["PFAR"],
    carCount: 1,
    cars: [
      {
        name: "Mercedes GLA",
        image: "/mercedes-gla.svg", // Updated to use new standardized SVG
        specs: { engine: "1.3 Turbo 163 CP", transmission: "Automatic", seats: 5, fuel: "Benzină" },
        sippCode: "PFAR",
      },
    ],
  },
  {
    slug: "medium-suv-luxury",
    title: "Medium SUV Luxury",
    description: "Lux și performanță superioară",
    acrissCode: "Medium SUV Luxury",
    sippCodes: ["LFBR"],
    carCount: 1,
    cars: [
      {
        name: "Mercedes GLC",
        image: "/mercedes-glc.png", // Updated to use new PNG image
        specs: { engine: "2.0 Turbo 204 CP", transmission: "Automatic", seats: 5, fuel: "Benzină" },
        sippCode: "LFBR",
      },
    ],
  },
]

// Helper function to get all cars from all categories
export function getAllCars(): Car[] {
  return carClasses.flatMap((category) => category.cars)
}

// Helper function to get total car count
export function getTotalCarCount(): number {
  return carClasses.reduce((total, category) => total + category.carCount, 0)
}
