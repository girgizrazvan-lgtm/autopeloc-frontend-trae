// SIPP Code Matching System for Car Rental Standardization
// SIPP = Standard Interline Passenger Procedure
// 4-character code: [Category][Type][Transmission][Fuel/AC]

export interface SIPPMatch {
  category: string
  sippCodes: string[]
  confidence: "exact" | "similar" | "fallback"
}

// Car size categories based on length and segment
const CAR_SIZE_MAPPING: Record<string, string[]> = {
  // Mini/Economy (< 4m)
  economy: [
    "fiat 500",
    "toyota aygo",
    "peugeot 108",
    "citroen c1",
    "smart fortwo",
    "volkswagen up",
    "seat mii",
    "skoda citigo",
    "hyundai i10",
    "kia picanto",
    "suzuki celerio",
    "opel karl",
    "renault twingo",
    "chevrolet spark",
    "fiat panda",
    "dacia spring",
  ],
  // Compact (4.0-4.3m)
  compact: [
    "volkswagen polo",
    "ford fiesta",
    "opel corsa",
    "peugeot 208",
    "renault clio",
    "seat ibiza",
    "skoda fabia",
    "toyota yaris",
    "honda jazz",
    "mazda 2",
    "nissan micra",
    "citroen c3",
    "hyundai i20",
    "kia rio",
    "suzuki swift",
    "mini cooper",
    "audi a1",
    "volkswagen golf",
    "ford focus",
    "opel astra",
    "peugeot 308",
    "renault megane",
    "seat leon",
    "skoda scala",
    "skoda octavia",
    "toyota corolla",
    "honda civic",
    "mazda 3",
    "nissan sentra",
    "hyundai i30",
    "kia ceed",
    "bmw 1 series",
    "bmw seria 1",
    "mercedes a-class",
    "mercedes clasa a",
    "audi a3",
    "dacia sandero",
    "dacia logan",
    "chevrolet aveo",
    "chevrolet cruze",
    "fiat tipo",
    "citroen c4",
    "peugeot 508",
    "renault talisman",
    "ford mondeo",
    "opel insignia",
    "skoda superb",
    "toyota camry",
    "honda accord",
    "mazda 6",
    "bmw seria 2",
    "bmw seria 3",
    "bmw seria 4",
    "bmw seria 5",
    "mercedes clasa b",
    "mercedes clasa c",
    "mercedes clasa e",
    "audi a4",
    "audi a5",
    "audi a6",
    "volvo v40",
    "volvo v60",
    "alfa romeo giulietta",
    "alfa romeo giulia",
  ],
  // Crossover/SUV Compact (4.2-4.5m)
  crossover: [
    "dacia sandero stepway",
    "peugeot 2008",
    "citroen c3 aircross",
    "opel crossland",
    "renault captur",
    "nissan juke",
    "ford ecosport",
    "seat arona",
    "skoda kamiq",
    "volkswagen t-cross",
    "volkswagen t-roc",
    "volkswagen taigo",
    "toyota c-hr",
    "honda hr-v",
    "mazda cx-3",
    "mazda cx-30",
    "hyundai kona",
    "kia stonic",
    "kia niro",
    "suzuki vitara",
    "jeep renegade",
    "fiat 500x",
    "mini countryman",
    "mini clubman",
    "opel mokka",
    "ford puma",
    "mitsubishi asx",
  ],
  // SUV Medium/Large (4.5m+)
  "estate-suv": [
    "dacia duster",
    "peugeot 3008",
    "peugeot 5008",
    "citroen c5 aircross",
    "citroen c5",
    "renault kadjar",
    "renault koleos",
    "nissan qashqai",
    "nissan x-trail",
    "ford kuga",
    "seat ateca",
    "seat tarraco",
    "skoda karoq",
    "skoda kodiaq",
    "volkswagen tiguan",
    "toyota rav4",
    "toyota highlander",
    "honda cr-v",
    "mazda cx-5",
    "hyundai tucson",
    "hyundai santa fe",
    "kia sportage",
    "kia sorento",
    "jeep compass",
    "jeep cherokee",
    "jeep wrangler",
    "bmw x1",
    "bmw x3",
    "bmw x5",
    "mercedes gla",
    "mercedes glb",
    "mercedes glc",
    "mercedes gle",
    "audi q2",
    "audi q3",
    "audi q5",
    "audi q7",
    "volvo xc40",
    "volvo xc60",
    "volvo xc90",
    "land rover discovery sport",
    "land rover discovery",
    "range rover evoque",
    "range rover",
    "ford focus sw",
    "ford focus wagon",
    "kia ceed estate",
    "kia ceed sw",
    "volkswagen golf variant",
    "skoda octavia combi",
    "peugeot 308 sw",
    "renault megane estate",
    "volvo v90",
    "mitsubishi outlander",
    "mitsubishi eclipse cross",
    "suzuki s-cross",
    "alfa romeo stelvio",
    "opel grandland",
  ],
  // MPV/Van
  monovolum: [
    "dacia jogger",
    "dacia lodgy",
    "dacia dokker",
    "citroen berlingo",
    "peugeot rifter",
    "opel combo",
    "volkswagen caddy",
    "ford tourneo",
    "seat alhambra",
    "volkswagen touran",
    "renault scenic",
    "citroen c4 picasso",
  ],
  "van-8-seats": [
    "renault trafic",
    "ford transit custom",
    "volkswagen transporter",
    "mercedes vito",
    "opel vivaro",
    "peugeot expert",
    "citroen jumpy",
    "fiat talento",
  ],
  "utility-van": [
    "peugeot boxer",
    "fiat ducato",
    "citroen jumper",
    "ford transit",
    "mercedes sprinter",
    "volkswagen crafter",
    "renault master",
    "iveco daily",
  ],
  // Luxury Sports/Convertible Cars
  "luxury-sports": [
    "porsche 911",
    "porsche 718",
    "porsche boxster",
    "porsche cayman",
    "ford mustang",
    "chevrolet corvette",
    "bmw z4",
    "mercedes slc",
    "mercedes sl",
    "audi tt",
    "jaguar f-type",
    "alfa romeo 4c",
  ],
  // Luxury Sedans
  "luxury-sedan": [
    "bmw seria 7",
    "bmw 7 series",
    "mercedes clasa s",
    "mercedes s-class",
    "audi a8",
    "porsche panamera",
    "tesla model s",
    "jaguar xj",
    "lexus ls",
    "maserati quattroporte",
    "volkswagen arteon",
  ],
  // Luxury SUVs (Macan, Cayenne, etc.)
  "small-suv-luxury": [
    "mercedes gla",
    "bmw x1",
    "audi q3",
    "audi q2",
    "volvo xc40",
    "lexus ux",
    "range rover evoque",
    "mini countryman",
    "porsche macan",
  ],
  // Large Luxury SUVs and Electric Cars
  "medium-suv-luxury": [
    "mercedes glc",
    "bmw x3",
    "audi q5",
    "volvo xc60",
    "lexus nx",
    "land rover discovery sport",
    "porsche cayenne",
    "bmw x5",
    "mercedes gle",
    "audi q7",
    "volvo xc90",
    "tesla model 3",
    "tesla model x",
    "tesla model y",
    "renault zoe",
    "nissan leaf",
    "volkswagen id.3",
    "volkswagen id3",
    "volkswagen id.4",
    "volkswagen id4",
  ],
}

// Normalize car name for matching
function normalizeCarName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
}

// Find category for a given car
function findCarCategory(make: string, model: string): string | null {
  const fullName = normalizeCarName(`${make} ${model}`)

  for (const [category, cars] of Object.entries(CAR_SIZE_MAPPING)) {
    for (const car of cars) {
      const normalizedCar = normalizeCarName(car)
      if (fullName.includes(normalizedCar) || normalizedCar.includes(fullName)) {
        return category
      }
    }
  }

  return null
}

// Get SIPP codes for a category and transmission
function getSIPPCodesForCategory(category: string, transmission: "manual" | "automat"): string[] {
  const categoryMap: Record<string, { manual: string[]; automat: string[] }> = {
    economy: {
      manual: ["MCMR", "MDMR", "NBMH", "HDMR"],
      automat: ["EDAR"],
    },
    compact: {
      manual: ["CDMR", "EGMR", "DDMR"],
      automat: ["CDAR", "EGAR", "DDAR"],
    },
    crossover: {
      manual: ["CGMR", "SFMR", "FFNR"],
      automat: ["CGAR", "SFAR"],
    },
    "estate-suv": {
      manual: ["CWMR"],
      automat: ["GFBR", "PLAR"],
    },
    monovolum: {
      manual: ["FVMR"],
      automat: [],
    },
    "van-8-seats": {
      manual: ["XMMR"],
      automat: [],
    },
    "utility-van": {
      manual: ["XKMD"],
      automat: [],
    },
    // Luxury Sports Cars (convertible/coupe)
    "luxury-sports": {
      manual: ["LTMR"],
      automat: ["LTAR", "LXAR"], // T=Convertible, X=Special
    },
    // Luxury Sedans
    "luxury-sedan": {
      manual: [],
      automat: ["LDAR", "LWAR"], // D=4-5 Door, W=Wagon/Estate
    },
    "small-suv-luxury": {
      manual: [],
      automat: ["PFAR"],
    },
    "medium-suv-luxury": {
      manual: [],
      automat: ["LFBR"],
    },
  }

  const categoryData = categoryMap[category]
  if (!categoryData) return []

  return transmission === "manual" ? categoryData.manual : categoryData.automat
}

// Main matching function
export function matchCarToSIPP(
  make: string,
  model: string,
  transmission: "manual" | "automat",
  isOtherCar = false,
): SIPPMatch | null {
  // Find the category
  const category = findCarCategory(make, model)

  if (!category) {
    // For dropdown selections, provide a sensible fallback
    if (isOtherCar) {
      return null
    }

    // Fallback for dropdown selections: try to infer from model name keywords
    const modelLower = model.toLowerCase()
    let fallbackCategory = "compact" // Default fallback

    if (modelLower.includes("suv") || modelLower.includes("x") || modelLower.includes("q")) {
      fallbackCategory = "estate-suv"
    } else if (modelLower.includes("van") || modelLower.includes("transporter")) {
      fallbackCategory = "van-8-seats"
    } else if (modelLower.includes("mini") || modelLower.includes("smart")) {
      fallbackCategory = "economy"
    } else if (modelLower.includes("porsche") || modelLower.includes("mustang") || modelLower.includes("corvette")) {
      fallbackCategory = "luxury-sports"
    } else if (modelLower.includes("bmw") || modelLower.includes("mercedes") || modelLower.includes("audi")) {
      fallbackCategory = "luxury-sedan"
    }

    const sippCodes = getSIPPCodesForCategory(fallbackCategory, transmission)
    if (sippCodes.length > 0) {
      return {
        category: fallbackCategory,
        sippCodes,
        confidence: "fallback",
      }
    }

    return null
  }

  // Get SIPP codes for the matched category
  const sippCodes = getSIPPCodesForCategory(category, transmission)

  // If no SIPP codes for this transmission, try to find similar category
  if (sippCodes.length === 0) {
    // Try opposite transmission as fallback
    const oppositeTrans = transmission === "manual" ? "automat" : "manual"
    const fallbackCodes = getSIPPCodesForCategory(category, oppositeTrans)

    if (fallbackCodes.length > 0) {
      return {
        category,
        sippCodes: fallbackCodes,
        confidence: "similar",
      }
    }

    return null
  }

  return {
    category,
    sippCodes,
    confidence: "exact",
  }
}

// Get all matching categories for SIPP codes
export function getCategoriesForSIPPCodes(sippCodes: string[]): string[] {
  const categories: string[] = []

  const categoryMap: Record<string, string[]> = {
    economy: ["MCMR", "MDMR", "NBMH", "HDMR", "EDAR"],
    compact: ["CDMR", "EGMR", "DDMR", "CDAR", "EGAR", "DDAR"],
    crossover: ["CGMR", "SFMR", "FFNR", "CGAR", "SFAR"],
    "estate-suv": ["CWMR", "GFBR", "PLAR"],
    monovolum: ["FVMR"],
    "van-8-seats": ["XMMR"],
    "utility-van": ["XKMD"],
    // Luxury Sports Cars (convertible/coupe)
    "luxury-sports": ["LTMR", "LTAR", "LXAR"],
    // Luxury Sedans
    "luxury-sedan": ["LDAR", "LWAR"],
    "small-suv-luxury": ["PFAR"],
    "medium-suv-luxury": ["LFBR"],
  }

  for (const [category, codes] of Object.entries(categoryMap)) {
    if (codes.some((code) => sippCodes.includes(code))) {
      categories.push(category)
    }
  }

  return categories
}
