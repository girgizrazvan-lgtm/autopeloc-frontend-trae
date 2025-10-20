import type { SIPPCode } from "./types"

/**
 * ACRISS 2024 Standard Vehicle Classification System
 *
 * ACRISS Code Format: XXXX
 * Position 1: Category (M=Mini, E=Economy, C=Compact, I=Intermediate, S=Standard, F=Fullsize, P=Premium, L=Luxury, X=Special)
 * Position 2: Type (B=2-3 Door, C=2/4 Door, D=4-5 Door, W=Wagon, V=Van, F=SUV, G=Crossover, P/Q=Pickup, K=Commercial)
 * Position 3: Transmission (M=Manual, A=Auto, N=Manual 4WD, B=Auto 4WD, C=Manual AWD, D=Auto AWD)
 * Position 4: Fuel/AC (R=Unspecified with AC, N=No AC, D=Diesel AC, H=Hybrid, I=Plug-in Hybrid, E=Electric, V=Petrol AC)
 *
 * Reference: https://www.acriss.org/ (September 2024)
 */

export const FLEET_SIPP_CODES = {
  // Mini (M) - City cars, A-segment
  MCMR: { category: "Economy", transmission: "Manual", description: "Mini 2/4 Door Manual" },
  MDMR: { category: "Economy", transmission: "Manual", description: "Mini 4-5 Door Manual" },

  // Economy (E/N) - Superminis, B-segment
  NBMH: { category: "Economy", transmission: "Manual", description: "Economy Elite 2-3 Door Manual" },
  HDMR: { category: "Economy", transmission: "Manual", description: "Economy Elite 4-5 Door Manual" },
  EDAR: { category: "Economy", transmission: "Automat", description: "Economy 4-5 Door Automatic" },

  // Compact (C/D) - C-segment, small family cars
  CDMR: { category: "Compact", transmission: "Manual", description: "Compact 4-5 Door Manual" },
  EGMR: { category: "Compact", transmission: "Manual", description: "Economy Crossover Manual" },
  DDMR: { category: "Compact", transmission: "Manual", description: "Compact Elite 4-5 Door Manual" },
  CDAR: { category: "Compact", transmission: "Automat", description: "Compact 4-5 Door Automatic" },
  EGAR: { category: "Compact", transmission: "Automat", description: "Economy Crossover Automatic" },
  DDAR: { category: "Compact", transmission: "Automat", description: "Compact Elite 4-5 Door Automatic" },

  // Intermediate category for D-segment sedans like Skoda Superb
  IDMR: { category: "Intermediate", transmission: "Manual", description: "Intermediate 4-5 Door Manual" },
  IDAR: { category: "Intermediate", transmission: "Automat", description: "Intermediate 4-5 Door Automatic" },
  IWMR: { category: "Intermediate Estate", transmission: "Manual", description: "Intermediate Wagon Manual" },
  IWAR: { category: "Intermediate Estate", transmission: "Automat", description: "Intermediate Wagon Automatic" },

  // Compact/Intermediate Crossover (C/I with G type)
  CGMR: { category: "Crossover", transmission: "Manual", description: "Compact Crossover Manual" },
  SFMR: { category: "Crossover", transmission: "Manual", description: "Standard SUV Manual" },
  FFNR: { category: "Crossover", transmission: "Manual", description: "Fullsize SUV Manual" },
  CGAR: { category: "Crossover", transmission: "Automat", description: "Compact Crossover Automatic" },
  SPAR: { category: "Crossover", transmission: "Automat", description: "Standard Pickup Automatic" },

  // Estate/Wagon (W type)
  CWMR: { category: "Estate", transmission: "Manual", description: "Compact Wagon Manual" },

  // Standard/Fullsize SUV (S/F with F type)
  GFBR: { category: "SUV", transmission: "Automat", description: "Fullsize Elite SUV Auto 4WD" },
  PLAR: { category: "SUV", transmission: "Automat", description: "Premium Luxury Sedan Automatic" },

  // Passenger Van (V type)
  FVMR: { category: "Monovolum", transmission: "Manual", description: "Fullsize Van 7 seats Manual" },

  // Large Passenger Van (X category with V type)
  XMMR: { category: "VAN 8 seats", transmission: "Manual", description: "Special Monospace 8+ seats Manual" },

  // Commercial Van/Truck (K type)
  XKMD: { category: "Utility VAN", transmission: "Manual", description: "Special Commercial Van Manual Diesel" },

  // Premium SUV (P with F type)
  PFAR: { category: "Small SUV Luxury", transmission: "Automat", description: "Premium SUV Automatic" },

  // Luxury SUV (L with F type)
  LFBR: { category: "Medium SUV Luxury", transmission: "Automat", description: "Luxury SUV Auto 4WD" },

  // Standard (S) category for E-segment sedans
  SDMR: { category: "Standard", transmission: "Manual", description: "Standard 4-5 Door Manual" },
  SDAR: { category: "Standard", transmission: "Automat", description: "Standard 4-5 Door Automatic" },
  SWMR: { category: "Standard Estate", transmission: "Manual", description: "Standard Wagon Manual" },
  SWAR: { category: "Standard Estate", transmission: "Automat", description: "Standard Wagon Automatic" },
} as const

/**
 * Comprehensive vehicle model database with correct SIPP classifications
 * Based on real-world vehicle segments and ACRISS standards
 *
 * Removed all trim variants (S-line, Sportline, RS, GTI, AMG, M, etc.)
 * Removed generation numbers (Golf 7, Golf 8, etc.)
 * Kept only base models and essential body style variants (wagon/estate/combi)
 */
export const VEHICLE_DATABASE: Record<string, Record<string, SIPPCode>> = {
  // MINI SEGMENT (M) - A-segment city cars
  fiat: {
    "500": "MCMR",
    "500x": "CGMR",
    "500l": "FVMR",
    panda: "MDMR",
    tipo: "CDMR",
    "tipo sw": "CWMR",
    ducato: "XKMD",
    doblo: "XKMD",
    scudo: "XMMR",
    talento: "XMMR",
  },
  toyota: {
    aygo: "MCMR",
    yaris: "NBMH",
    corolla: "CDMR",
    "corolla touring": "CWMR",
    camry: "IDMR",
    "c-hr": "CGMR",
    "yaris cross": "CGMR",
    rav4: "SFMR",
    highlander: "GFBR",
    "land cruiser": "LFBR",
    "proace city verso": "FVMR",
    proace: "XMMR",
    hiace: "XKMD",
    prius: "CDAR",
    bz4x: "SFMR",
  },
  volkswagen: {
    up: "MCMR",
    polo: "NBMH",
    golf: "CDMR",
    "golf variant": "CWMR",
    id3: "CDAR",
    id4: "SFMR",
    id5: "SFMR",
    passat: "IDMR",
    "passat variant": "IWMR",
    arteon: "IDMR",
    "t-cross": "CGMR",
    "t-roc": "SFMR",
    taigo: "CGMR",
    tiguan: "GFBR",
    touareg: "LFBR",
    caddy: "FVMR",
    touran: "FVMR",
    sharan: "FVMR",
    transporter: "XMMR",
    caravelle: "XMMR",
    crafter: "XKMD",
    amarok: "SPAR",
  },
  opel: {
    corsa: "NBMH",
    astra: "CDMR",
    "astra sports tourer": "CWMR",
    insignia: "IDMR",
    "insignia sports tourer": "IWMR",
    crossland: "CGMR",
    grandland: "SFMR",
    mokka: "CGMR",
    "combo life": "FVMR",
    zafira: "FVMR",
    vivaro: "XMMR",
    movano: "XKMD",
  },
  renault: {
    twingo: "MCMR",
    clio: "NBMH",
    zoe: "CDAR",
    megane: "CDMR",
    "megane estate": "CWMR",
    captur: "CGMR",
    arkana: "SFMR",
    kadjar: "SFMR",
    austral: "SFMR",
    koleos: "GFBR",
    kangoo: "FVMR",
    scenic: "FVMR",
    espace: "FVMR",
    trafic: "XMMR",
    master: "XKMD",
  },
  peugeot: {
    "108": "MCMR",
    "208": "NBMH",
    "308": "CDMR",
    "308 sw": "CWMR",
    "408": "CDMR",
    "508": "IDMR",
    "508 sw": "IWMR",
    "2008": "CGMR",
    "3008": "SFMR",
    "5008": "GFBR",
    rifter: "FVMR",
    traveller: "FVMR",
    expert: "XMMR",
    boxer: "XKMD",
    partner: "XKMD",
  },
  skoda: {
    citigo: "MCMR",
    fabia: "NBMH",
    "fabia combi": "CWMR",
    scala: "CDMR",
    rapid: "CDMR",
    octavia: "CDMR",
    "octavia combi": "CWMR",
    superb: "IDMR",
    "superb combi": "IWMR",
    kamiq: "CGMR",
    karoq: "CGMR",
    kodiaq: "SFMR",
    enyaq: "SFMR",
  },
  ford: {
    ka: "MCMR",
    fiesta: "NBMH",
    focus: "CDMR",
    "focus sw": "CWMR",
    mondeo: "IDMR",
    "mondeo estate": "IWMR",
    puma: "CGMR",
    kuga: "SFMR",
    explorer: "GFBR",
    "mustang mach-e": "LFBR",
    "tourneo connect": "FVMR",
    "tourneo courier": "FVMR",
    "transit custom": "XMMR",
    transit: "XKMD",
    ranger: "SPAR",
    "s-max": "FVMR",
    galaxy: "FVMR",
  },
  seat: {
    mii: "MCMR",
    ibiza: "NBMH",
    leon: "CDMR",
    "leon sportstourer": "CWMR",
    arona: "CGMR",
    ateca: "SFMR",
    tarraco: "GFBR",
    alhambra: "FVMR",
  },
  hyundai: {
    i10: "MCMR",
    i20: "NBMH",
    i30: "CDMR",
    "i30 wagon": "CWMR",
    ioniq: "CDAR",
    "ioniq 5": "SFMR",
    "ioniq 6": "CDAR",
    kona: "CGMR",
    tucson: "SFMR",
    "santa fe": "GFBR",
    nexo: "SFMR",
    staria: "XMMR",
    i40: "IDMR",
    "i40 wagon": "IWMR",
    elantra: "CDMR",
    sonata: "IDMR",
    bayon: "CGMR",
  },
  kia: {
    picanto: "MCMR",
    rio: "NBMH",
    ceed: "CDMR",
    "ceed sw": "CWMR",
    proceed: "CWMR",
    stonic: "CGMR",
    xceed: "CGMR",
    niro: "CGMR",
    sportage: "SFMR",
    sorento: "GFBR",
    ev6: "SFMR",
    ev9: "GFBR",
    carnival: "XMMR",
    optima: "IDMR",
    stinger: "IDMR",
    seltos: "CGMR",
  },
  nissan: {
    micra: "NBMH",
    leaf: "CDAR",
    ariya: "SFMR",
    juke: "CGMR",
    qashqai: "SFMR",
    "x-trail": "GFBR",
    navara: "SPAR",
    nv200: "XKMD",
    nv300: "XKMD",
    nv400: "XKMD",
    primastar: "XMMR",
  },
  suzuki: {
    ignis: "MCMR",
    swift: "NBMH",
    baleno: "NBMH",
    vitara: "CGMR",
    "s-cross": "SFMR",
    across: "SFMR",
    jimny: "CGMR",
  },
  dacia: {
    spring: "MCMR",
    sandero: "NBMH",
    logan: "NBMH",
    "logan mcv": "CWMR",
    duster: "CGMR",
    jogger: "FVMR",
    lodgy: "FVMR",
    dokker: "XKMD",
  },
  mazda: {
    "2": "NBMH",
    "3": "CDMR",
    "6": "IDMR",
    "6 wagon": "IWMR",
    "cx-3": "CGMR",
    "cx-30": "SFMR",
    "cx-5": "GFBR",
    "cx-60": "GFBR",
    "cx-9": "GFBR",
    mx30: "CDAR",
    "mx-5": "CDMR",
  },
  honda: {
    jazz: "NBMH",
    e: "CDAR",
    civic: "CDMR",
    "hr-v": "CGMR",
    "cr-v": "SFMR",
    pilot: "GFBR",
    "zr-v": "SFMR",
  },
  jeep: {
    renegade: "CGMR",
    compass: "SFMR",
    "grand cherokee": "LFBR",
    wrangler: "LFBR",
    gladiator: "SPAR",
  },
  mitsubishi: {
    "space star": "MCMR",
    asx: "CGMR",
    eclipse: "SFMR",
    outlander: "SFMR",
    pajero: "GFBR",
    l200: "SPAR",
  },
  bmw: {
    "1 series": "CDMR",
    "2 series": "CDMR",
    "2 series active tourer": "FVMR",
    "2 series gran tourer": "FVMR",
    "3 series": "IDMR",
    "3 series touring": "IWMR",
    "4 series": "IDMR",
    "5 series": "SDMR",
    "5 series touring": "SWMR",
    "7 series": "PLAR",
    i3: "CDAR",
    i4: "CDAR",
    ix: "LFBR",
    ix3: "PFAR",
    x1: "PFAR",
    x2: "PFAR",
    x3: "LFBR",
    x4: "LFBR",
    x5: "LFBR",
    x6: "LFBR",
    x7: "LFBR",
  },
  audi: {
    a1: "NBMH",
    a3: "CDMR",
    a4: "IDMR",
    "a4 avant": "IWMR",
    a5: "IDMR",
    a6: "SDMR",
    "a6 avant": "SWMR",
    a7: "PLAR",
    a8: "PLAR",
    q2: "CGMR",
    q3: "PFAR",
    q4: "PFAR",
    q5: "LFBR",
    q7: "LFBR",
    q8: "LFBR",
    "e-tron": "LFBR",
  },
  mercedes: {
    "a-class": "CDMR",
    "b-class": "CDMR",
    "c-class": "IDMR",
    "c-class estate": "IWMR",
    "e-class": "SDMR",
    "e-class estate": "SWMR",
    "s-class": "PLAR",
    cla: "CDMR",
    "cla shooting brake": "CWMR",
    eqc: "LFBR",
    eqa: "PFAR",
    eqb: "PFAR",
    eqe: "PLAR",
    eqs: "PLAR",
    gla: "PFAR",
    glb: "PFAR",
    glc: "LFBR",
    gle: "LFBR",
    gls: "LFBR",
    "g-class": "LFBR",
    vito: "XMMR",
    "v-class": "XMMR",
    sprinter: "XKMD",
    citan: "XKMD",
    "x-class": "SPAR",
    cls: "PLAR",
  },
  volvo: {
    xc40: "PFAR",
    c40: "PFAR",
    xc60: "LFBR",
    xc90: "LFBR",
    v60: "CWMR",
    v90: "CWMR",
    s60: "IDMR",
    s90: "PLAR",
    v40: "CDMR",
  },
  lexus: {
    ux: "PFAR",
    nx: "PFAR",
    rx: "LFBR",
    lx: "LFBR",
    es: "IDMR",
    is: "IDMR",
    ls: "PLAR",
  },
  mini: {
    mini: "NBMH",
    clubman: "CDMR",
    countryman: "PFAR",
  },
  "range rover": {
    evoque: "PFAR",
    sport: "LFBR",
    velar: "LFBR",
    "range rover": "LFBR",
  },
  jaguar: {
    "e-pace": "PFAR",
    "f-pace": "LFBR",
    "i-pace": "LFBR",
  },
  porsche: {
    macan: "PFAR",
    cayenne: "LFBR",
    taycan: "PLAR",
  },
  "land rover": {
    discovery: "LFBR",
    "discovery sport": "PFAR",
    defender: "LFBR",
  },
  tesla: {
    "model 3": "CDAR",
    "model s": "PLAR",
    "model x": "LFBR",
    "model y": "LFBR",
  },
  alfa: {
    mito: "NBMH",
    giulietta: "CDMR",
    giulia: "IDMR",
    stelvio: "PFAR",
    tonale: "PFAR",
  },
  "alfa romeo": {
    mito: "NBMH",
    giulietta: "CDMR",
    giulia: "IDMR",
    stelvio: "PFAR",
    tonale: "PFAR",
  },
  subaru: {
    impreza: "CDMR",
    xv: "CGMR",
    forester: "SFMR",
    outback: "CWMR",
    legacy: "IDMR",
  },
  ssangyong: {
    tivoli: "CGMR",
    korando: "SFMR",
    rexton: "GFBR",
  },
  ds: {
    "ds 3": "NBMH",
    "ds 4": "CDMR",
    "ds 7": "SFMR",
  },
  mg: {
    mg3: "NBMH",
    mg4: "CDAR",
    mg5: "CDMR",
    zs: "CGMR",
    hs: "SFMR",
    "marvel r": "LFBR",
  },
  byd: {
    atto: "SFMR",
    tang: "LFBR",
    han: "PLAR",
    dolphin: "CDAR",
    seal: "CDAR",
  },
  cupra: {
    born: "CDAR",
    formentor: "PFAR",
    ateca: "PFAR",
    leon: "CDMR",
  },
  smart: {
    fortwo: "MCMR",
    forfour: "MCMR",
    "#1": "CGMR",
  },
  lynk: {
    "01": "CGMR",
    "02": "CGMR",
    "03": "CDMR",
  },
  "lynk & co": {
    "01": "CGMR",
    "02": "CGMR",
    "03": "CDMR",
  },
  genesis: {
    g70: "IDMR",
    g80: "PLAR",
    gv70: "PFAR",
    gv80: "LFBR",
  },
  infiniti: {
    q30: "CDMR",
    q50: "IDMR",
    qx30: "CGMR",
    qx50: "PFAR",
    qx60: "LFBR",
    qx70: "LFBR",
  },
  acura: {
    mdx: "LFBR",
    rdx: "PFAR",
  },
  cadillac: {
    xt4: "PFAR",
    xt5: "LFBR",
    xt6: "LFBR",
    escalade: "LFBR",
  },
  lincoln: {
    corsair: "PFAR",
    nautilus: "LFBR",
    aviator: "LFBR",
    navigator: "LFBR",
  },
  maserati: {
    ghibli: "PLAR",
    levante: "LFBR",
    grecale: "PFAR",
  },
  bentley: {
    bentayga: "LFBR",
    "flying spur": "PLAR",
  },
  "rolls-royce": {
    cullinan: "LFBR",
    ghost: "PLAR",
    phantom: "PLAR",
  },
  "aston martin": {
    dbx: "LFBR",
  },
  lamborghini: {
    urus: "LFBR",
  },
  ferrari: {
    purosangue: "LFBR",
  },
}

/**
 * Normalize brand name for matching
 */
function normalizeBrand(brand: string): string {
  const normalized = brand.toLowerCase().trim()

  // Handle common aliases
  const aliases: Record<string, string> = {
    vw: "volkswagen",
    merc: "mercedes",
    "mercedes-benz": "mercedes",
    bmw: "bmw",
    alfa: "alfa romeo",
    "alfa-romeo": "alfa romeo",
  }

  return aliases[normalized] || normalized
}

/**
 * Normalize model name for matching
 */
function normalizeModel(model: string): string {
  return model.toLowerCase().trim().replace(/\s+/g, " ").replace(/[-_]/g, " ")
}

/**
 * Get SIPP code for a vehicle based on brand, model, and transmission
 */
export function getVehicleSIPP(
  brand: string,
  model: string,
  transmission: "Manual" | "Automat" | "Automata",
): { sippCode: SIPPCode; confidence: number; category: string } | null {
  const normalizedTransmission = transmission === "Automata" ? "Automat" : transmission

  const normalizedBrand = normalizeBrand(brand)
  const normalizedModel = normalizeModel(model)

  console.log("[v0] Looking up vehicle:", { normalizedBrand, normalizedModel, normalizedTransmission })

  // Look up in database
  const brandModels = VEHICLE_DATABASE[normalizedBrand]
  if (!brandModels) {
    console.log("[v0] Brand not found in database:", normalizedBrand)
    return null
  }

  // Try exact match first
  let sippCode = brandModels[normalizedModel]

  // Try partial match if exact fails
  if (!sippCode) {
    for (const [dbModel, code] of Object.entries(brandModels)) {
      if (normalizedModel.includes(dbModel) || dbModel.includes(normalizedModel)) {
        sippCode = code
        console.log("[v0] Partial match found:", { dbModel, code })
        break
      }
    }
  } else {
    console.log("[v0] Exact match found:", { normalizedModel, sippCode })
  }

  if (!sippCode) {
    console.log("[v0] No model match found for:", normalizedModel)
    return null
  }

  // Adjust for transmission
  const fleetInfo = FLEET_SIPP_CODES[sippCode]
  if (!fleetInfo) {
    console.log("[v0] SIPP code not in fleet:", sippCode)
    return null
  }

  // If transmission doesn't match, try to find alternative code in same category
  if (fleetInfo.transmission !== normalizedTransmission) {
    console.log("[v0] Transmission mismatch, looking for alternative:", {
      requested: normalizedTransmission,
      found: fleetInfo.transmission,
    })

    // Find alternative SIPP code with same category but different transmission
    for (const [altCode, altInfo] of Object.entries(FLEET_SIPP_CODES)) {
      if (altInfo.category === fleetInfo.category && altInfo.transmission === normalizedTransmission) {
        console.log("[v0] Found alternative SIPP code:", { altCode, category: altInfo.category })
        return {
          sippCode: altCode as SIPPCode,
          confidence: 0.95,
          category: altInfo.category,
        }
      }
    }

    // If no alternative found, return original with lower confidence
    console.log("[v0] No alternative found, using original with lower confidence")
    return {
      sippCode,
      confidence: 0.85,
      category: fleetInfo.category,
    }
  }

  return {
    sippCode,
    confidence: 1.0,
    category: fleetInfo.category,
  }
}

/**
 * Get all available SIPP codes in fleet
 */
export function getAvailableFleetCodes(): SIPPCode[] {
  return Object.keys(FLEET_SIPP_CODES) as SIPPCode[]
}

/**
 * Get category for a SIPP code
 */
export function getCategoryForSIPP(sippCode: SIPPCode): string | null {
  const info = FLEET_SIPP_CODES[sippCode]
  return info ? info.category : null
}
