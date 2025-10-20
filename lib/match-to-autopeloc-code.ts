type Row = {
  Brand: string
  Model: string
  Year_Start: number | null
  Year_End: number | null
  Transmisie_norm: "Manual" | "Automatic" | ""
  Cod_SIPP_Comercial: string
}

const BRAND_ALIAS: Record<string, string> = {
  vw: "volkswagen",
  "v w": "volkswagen",
  mb: "mercedes-benz",
  mercedes: "mercedes-benz",
  "mercedes benz": "mercedes-benz",
  landrover: "land rover",
  "land-rover": "land rover",
  bmv: "bmw",
  vauxhall: "opel",
  citroen: "citroen",
  citroën: "citroen",
  skoda: "skoda",
  škoda: "skoda",
}

const FAMILIES = {
  // SUV Luxury / Premium (Large & Mid-size) → LFBR
  LFBR: [
    // Large luxury SUVs
    "q7",
    "q8",
    "x5",
    "x6",
    "x7",
    "gle",
    "gls",
    "range rover",
    "range rover sport",
    "discovery",
    "xc90",
    "touareg",
    "cayenne",
    "gv80",
    "gx",
    "lx",
    "g class",
    "g-class",
    "model x",
    // Mid-size luxury SUVs
    "q5",
    "x3",
    "x4",
    "glc",
    "xc60",
    "discovery sport",
    "macan",
    "gv70",
    "nx",
    "rx",
    "model y",
  ],

  // SUV Premium Small → PLAR
  PLAR: ["gla", "x1", "x2", "q3", "xc40", "ux", "enyaq", "enyaq coupe"],

  // SUV Mainstream Medium → GFBR
  GFBR: [
    "qashqai",
    "qashqai+2",
    "kuga",
    "tucson",
    "sportage",
    "3008",
    "tiguan",
    "ateca",
    "korando",
    "compass",
    "koleos",
    "outlander",
    "rav4",
    "cx-5",
    "cx 5",
  ],

  // Crossover/SUV Small → SF (Manual=SFMR, Automatic=SFAR)
  SF: [
    "2008",
    "captur",
    "arona",
    "ecosport",
    "t-roc",
    "t roc",
    "t-cross",
    "t cross",
    "taigo",
    "karoq",
    "kamiq",
    "mokka",
    "mokka-e",
    "juke",
    "hr-v",
    "hr v",
    "yaris cross",
    "bayon",
    "stonic",
    "puma",
    "crossland",
  ],

  // Compact hatch/sedan → CD (Manual=CDMR, Automatic=CDAR)
  CD: [
    "golf",
    "focus",
    "megane",
    "scala",
    "i30",
    "astra",
    "308",
    "leon",
    "ceed",
    "cee'd",
    "octavia",
    "civic",
    "mazda3",
    "mazda 3",
    "corolla",
    "elantra",
    "sentra",
  ],

  // Economy / Mini → ED (Manual=EDMR, Automatic=EDAR)
  ED: [
    "clio",
    "fabia",
    "polo",
    "208",
    "c3",
    "yaris",
    "fiesta",
    "corsa",
    "micra",
    "rio",
    "i20",
    "ibiza",
    "sandero",
    "up",
    "aygo",
    "picanto",
    "spark",
  ],

  // Passenger VAN 8-9 seats → XMMR
  XMMR: [
    "multivan",
    "zafira life",
    "trafic passenger",
    "vito tourer",
    "caravelle",
    "tourneo",
    "tourneo custom",
    "tourneo connect",
    "proace verso",
    "spacetourer",
  ],

  // Utility VAN (cargo) + Pick-ups → XKMD
  XKMD: [
    // Small vans
    "caddy",
    "combo",
    "kangoo",
    "berlingo",
    "partner",
    "doblo",
    "nv200",
    "connect",
    // Medium vans
    "transit custom",
    "transit",
    "trafic",
    "vivaro",
    "jumpy",
    "expert",
    "scudo",
    "proace",
    // Large vans
    "sprinter",
    "crafter",
    "ducato",
    "boxer",
    "jumper",
    "master",
    "movano",
    // Pick-ups
    "ranger",
    "hilux",
    "navara",
    "l200",
    "amarok",
    "d-max",
    "d max",
    "bt-50",
    "bt 50",
    "alaskan",
  ],

  // MPV 7 seats (optional) → FVMR
  FVMR: [
    "jogger",
    "lodgy",
    "touran",
    "c-max",
    "c max",
    "s-max",
    "s max",
    "zafira",
    "grand scenic",
    "5008",
    "sharan",
    "alhambra",
    "galaxy",
  ],
}

const ESTATE_TRIGGERS = ["estate", "wagon", "tourer", "touring", "combi", "break", "variant", "sw", "avant"]

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function brandAlias(b: string) {
  const n = normalize(b)
  return BRAND_ALIAS[n] ?? n
}

function cleanupModel(m: string) {
  let n = normalize(m)

  // Remove estate/wagon indicators (will be checked separately)
  n = n.replace(/\b(estate|wagon|tourer|touring|combi|break|variant|sw|avant)\b/g, "")

  // Remove passenger/tourer indicators
  n = n.replace(/\b(passenger|tourer)\b/g, "")

  // Remove drivetrain/fuel indicators
  n = n.replace(/\b(4x4|awd|4wd|phev|mhev|hev|ev|plug in|plug-in)\b/g, "")

  // Remove generation indicators
  n = n.replace(/\b(mk\d+|ii|iii|iv|v|vi|vii|viii|ix|x)\b/g, "")

  // Normalize spacing
  n = n.replace(/\s+/g, " ").trim()

  // Specific model normalizations
  n = n.replace(/\bqashqai\+2\b/, "qashqai")
  n = n.replace(/\bt-roc\b/, "t roc")
  n = n.replace(/\bt-cross\b/, "t cross")
  n = n.replace(/\bhr-v\b/, "hr v")
  n = n.replace(/\bcx-5\b/, "cx 5")
  n = n.replace(/\bmazda 3\b/, "mazda3")
  n = n.replace(/\bd-max\b/, "d max")
  n = n.replace(/\bbt-50\b/, "bt 50")

  // BMW/Mercedes series normalization
  n = n.replace(/\b(\d) series\b/, "$1")
  n = n.replace(/\bclass\b/, "")
  n = n.replace(/\bglc coupe\b/, "glc")
  n = n.replace(/\bx4\b/, "x4") // Keep as is, treated as X5 family

  return n.trim()
}

function pickByFamilies(model: string, transmission: "Manual" | "Automatic" | ""): string | null {
  const m = model.toLowerCase()

  // Helper to check if model matches any in the family list
  const IN = (list: string[]) =>
    list.some((x) => {
      const normalized = x.toLowerCase()
      // Exact match or model contains the family model
      return m === normalized || m.includes(normalized) || normalized.includes(m)
    })

  // Check families in priority order
  if (IN(FAMILIES.LFBR)) return "LFBR"
  if (IN(FAMILIES.PLAR)) return "PLAR"
  if (IN(FAMILIES.GFBR)) return "GFBR"
  if (IN(FAMILIES.SF)) return transmission === "Automatic" ? "SFAR" : "SFMR"
  if (IN(FAMILIES.CD)) return transmission === "Automatic" ? "CDAR" : "CDMR"
  if (IN(FAMILIES.ED)) return transmission === "Automatic" ? "EDAR" : "EDMR"
  if (IN(FAMILIES.XMMR)) return "XMMR"
  if (IN(FAMILIES.XKMD)) return "XKMD"
  if (IN(FAMILIES.FVMR)) return "FVMR"

  return null
}

export function matchToAutopelocCode(input: {
  brand: string
  model: string
  year?: number
  transmission?: string
}) {
  const brand = brandAlias(input.brand)
  const originalModel = normalize(input.model)
  const cleanedModel = cleanupModel(input.model)

  const transmission = /auto/i.test(input.transmission || "")
    ? "Automatic"
    : /man/i.test(input.transmission || "")
      ? "Manual"
      : ("" as const)

  // 1) Critical overrides: Family-based matching
  const familyCode = pickByFamilies(cleanedModel, transmission)
  if (familyCode) {
    return {
      code: familyCode,
      confidence: 0.92,
      reason: "family-match",
    }
  }

  // 2) Estate check (only if not SUV/Van)
  const hasEstateTrigger = ESTATE_TRIGGERS.some((trigger) => new RegExp(`\\b${trigger}\\b`, "i").test(originalModel))
  const isSuvOrVan = /\b(suv|crossover|van|multivan|trafic|vito)\b/i.test(originalModel)

  if (hasEstateTrigger && !isSuvOrVan) {
    return {
      code: "CWMR",
      confidence: 0.85,
      reason: "estate-body",
    }
  }

  // 3) Heuristic fallbacks for unmatched models

  // SUV indicators
  if (
    /\b(qashqai|3008|kuga|tucson|sportage|tiguan|ateca|compass|q5|x3|x4|macan|gv70|rx|model y)\b/i.test(cleanedModel)
  ) {
    return { code: "GFBR", confidence: 0.75, reason: "suv-mid-fallback" }
  }

  if (/\b(2008|captur|arona|t roc|t cross|juke|mokka)\b/i.test(cleanedModel)) {
    return {
      code: transmission === "Automatic" ? "SFAR" : "SFMR",
      confidence: 0.75,
      reason: "suv-small-fallback",
    }
  }

  // Compact indicators
  if (/\b(golf|focus|astra|308|megane|i30|octavia|leon|ceed)\b/i.test(cleanedModel)) {
    return {
      code: transmission === "Automatic" ? "CDAR" : "CDMR",
      confidence: 0.75,
      reason: "compact-fallback",
    }
  }

  // Economy indicators
  if (/\b(clio|fabia|polo|208|c3|yaris|corsa|fiesta|micra)\b/i.test(cleanedModel)) {
    return {
      code: transmission === "Automatic" ? "EDAR" : "EDMR",
      confidence: 0.75,
      reason: "economy-fallback",
    }
  }

  // Van indicators
  if (/\b(van|cargo|utility|transporter|transit|ducato|sprinter)\b/i.test(cleanedModel)) {
    return { code: "XKMD", confidence: 0.7, reason: "van-keyword" }
  }

  // 4) Default fallback: Compact category
  return {
    code: transmission === "Automatic" ? "CDAR" : "CDMR",
    confidence: 0.5,
    reason: "default-compact",
  }
}
