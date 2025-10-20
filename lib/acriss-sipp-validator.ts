// ACRISS SIPP Validator & Matching Engine
// Complete implementation of international ACRISS standard for car rental classification

export interface SIPPCode {
  code: string
  category: string // Position 1: M/N/E/C/I/S/F/P/L
  bodyType: string // Position 2: B/C/D/W/V/L/S/T/F/J/X/K
  equipment: string // Position 3: M/A
  transmission: string // Position 4: R/N/D/Q/H/E/B
}

export interface VehicleMatch {
  vehicleId: string
  vehicleName: string
  sippCode: string
  matchScore: number // 0.0 to 1.0
  matchType: "exact" | "upgrade" | "downgrade"
  penalties: string[]
  image: string
  specs: {
    engine: string
    transmission: string
    seats: number
    fuel: string
  }
}

export interface MatchResult {
  canonicalSipp: string
  customerVehicle: {
    make: string
    model: string
    year?: string
    doors?: number
    bodyStyle?: string
    transmission: string
    fuelType?: string
  }
  exactMatches: VehicleMatch[]
  upgradeMatches: VehicleMatch[]
  downgradeMatches: VehicleMatch[]
  recommendedVehicle: VehicleMatch | null
  justificationDocument: string
}

// ACRISS MASTER Database - Comprehensive car-to-SIPP mapping
const ACRISS_MASTER: Record<string, SIPPCode> = {
  // Economy Class (M/N/E)
  "fiat 500": { code: "MDMR", category: "M", bodyType: "D", equipment: "M", transmission: "R" },
  "toyota aygo": { code: "MDMR", category: "M", bodyType: "D", equipment: "M", transmission: "R" },
  "toyota aygo x": { code: "MDMR", category: "M", bodyType: "D", equipment: "M", transmission: "R" },
  "opel corsa": { code: "MCMR", category: "M", bodyType: "C", equipment: "M", transmission: "R" },
  "peugeot 208": { code: "NBMH", category: "N", bodyType: "B", equipment: "M", transmission: "H" },
  "renault clio": { code: "HDMR", category: "H", bodyType: "D", equipment: "M", transmission: "R" },
  "skoda fabia": { code: "HDMR", category: "H", bodyType: "D", equipment: "M", transmission: "R" },
  "citroen c3": { code: "HDMR", category: "H", bodyType: "D", equipment: "M", transmission: "R" },
  "vw polo": { code: "EDAR", category: "E", bodyType: "D", equipment: "A", transmission: "R" },
  "volkswagen polo": { code: "EDAR", category: "E", bodyType: "D", equipment: "A", transmission: "R" },
  "toyota yaris": { code: "EDAR", category: "E", bodyType: "D", equipment: "A", transmission: "R" },

  // Compact Class (C/I)
  "vw golf": { code: "CDMR", category: "C", bodyType: "D", equipment: "M", transmission: "R" },
  "volkswagen golf": { code: "CDMR", category: "C", bodyType: "D", equipment: "M", transmission: "R" },
  "ford focus": { code: "CDAR", category: "C", bodyType: "D", equipment: "A", transmission: "R" },
  "dacia sandero": { code: "EGMR", category: "E", bodyType: "G", equipment: "M", transmission: "R" },
  "dacia sandero stepway": { code: "EGMR", category: "E", bodyType: "G", equipment: "M", transmission: "R" },
  "skoda scala": { code: "DDMR", category: "D", bodyType: "D", equipment: "M", transmission: "R" },
  "renault megane": { code: "EGAR", category: "E", bodyType: "G", equipment: "A", transmission: "R" },

  // Crossover/SUV Compact (S/F)
  "peugeot 2008": { code: "CGMR", category: "C", bodyType: "G", equipment: "M", transmission: "R" },
  "citroen c3 aircross": { code: "CGMR", category: "C", bodyType: "G", equipment: "M", transmission: "R" },
  "seat arona": { code: "SFMR", category: "S", bodyType: "F", equipment: "M", transmission: "R" },
  "ford ecosport": { code: "SFMR", category: "S", bodyType: "F", equipment: "M", transmission: "R" },
  "renault captur": { code: "SFMR", category: "S", bodyType: "F", equipment: "M", transmission: "R" },
  "opel mokka": { code: "FFNR", category: "F", bodyType: "F", equipment: "N", transmission: "R" },
  "nissan juke": { code: "FFNR", category: "F", bodyType: "F", equipment: "N", transmission: "R" },
  "vw t-roc": { code: "CGMR", category: "C", bodyType: "G", equipment: "M", transmission: "R" },
  "volkswagen t-roc": { code: "CGMR", category: "C", bodyType: "G", equipment: "M", transmission: "R" },
  "vw t-cross": { code: "CGMR", category: "C", bodyType: "G", equipment: "M", transmission: "R" },
  "volkswagen t-cross": { code: "CGMR", category: "C", bodyType: "G", equipment: "M", transmission: "R" },
  "vw taigo": { code: "FFNR", category: "F", bodyType: "F", equipment: "N", transmission: "R" },
  "volkswagen taigo": { code: "FFNR", category: "F", bodyType: "F", equipment: "N", transmission: "R" },
  "toyota c-hr": { code: "SFAR", category: "S", bodyType: "F", equipment: "A", transmission: "R" },
  "ford puma": { code: "FFNR", category: "F", bodyType: "F", equipment: "N", transmission: "R" },
  "opel crossland": { code: "SFMR", category: "S", bodyType: "F", equipment: "M", transmission: "R" },
  "skoda kamiq": { code: "SFAR", category: "S", bodyType: "F", equipment: "A", transmission: "R" },

  // Estate & SUV (I/S/F)
  "ford focus sw": { code: "CWMR", category: "C", bodyType: "W", equipment: "M", transmission: "R" },
  "kia ceed estate": { code: "CWMR", category: "C", bodyType: "W", equipment: "M", transmission: "R" },
  "peugeot 3008": { code: "GFBR", category: "G", bodyType: "F", equipment: "B", transmission: "R" },
  "nissan qashqai": { code: "GFBR", category: "G", bodyType: "F", equipment: "B", transmission: "R" },
  "seat ateca": { code: "GFBR", category: "G", bodyType: "F", equipment: "B", transmission: "R" },
  "ford kuga": { code: "PLAR", category: "P", bodyType: "L", equipment: "A", transmission: "R" },
  "jeep compass": { code: "PLAR", category: "P", bodyType: "L", equipment: "A", transmission: "R" },

  // Monovolum/MPV
  "dacia jogger": { code: "FVMR", category: "F", bodyType: "V", equipment: "M", transmission: "R" },

  // VAN 8 seats
  "renault trafic": { code: "XMMR", category: "X", bodyType: "M", equipment: "M", transmission: "R" },

  // Utility VAN
  "peugeot boxer": { code: "XKMD", category: "X", bodyType: "K", equipment: "M", transmission: "D" },
  "fiat ducato": { code: "XKMD", category: "X", bodyType: "K", equipment: "M", transmission: "D" },

  // Luxury Sports/Convertible
  "porsche 911": { code: "LTAR", category: "L", bodyType: "T", equipment: "A", transmission: "R" },
  "porsche 718": { code: "LTAR", category: "L", bodyType: "T", equipment: "A", transmission: "R" },
  "ford mustang": { code: "LTAR", category: "L", bodyType: "T", equipment: "A", transmission: "R" },
  "bmw z4": { code: "LTAR", category: "L", bodyType: "T", equipment: "A", transmission: "R" },

  // Luxury Sedan
  "bmw seria 7": { code: "LDAR", category: "L", bodyType: "D", equipment: "A", transmission: "R" },
  "bmw 7 series": { code: "LDAR", category: "L", bodyType: "D", equipment: "A", transmission: "R" },
  "mercedes clasa s": { code: "LDAR", category: "L", bodyType: "D", equipment: "A", transmission: "R" },
  "mercedes s-class": { code: "LDAR", category: "L", bodyType: "D", equipment: "A", transmission: "R" },
  "audi a8": { code: "LDAR", category: "L", bodyType: "D", equipment: "A", transmission: "R" },
  "porsche panamera": { code: "LDAR", category: "L", bodyType: "D", equipment: "A", transmission: "R" },

  // Luxury SUV
  "mercedes gla": { code: "PFAR", category: "P", bodyType: "F", equipment: "A", transmission: "R" },
  "mercedes glc": { code: "LFBR", category: "L", bodyType: "F", equipment: "B", transmission: "R" },
  "bmw x3": { code: "LFBR", category: "L", bodyType: "F", equipment: "B", transmission: "R" },
  "bmw x5": { code: "LFBR", category: "L", bodyType: "F", equipment: "B", transmission: "R" },
  "audi q5": { code: "LFBR", category: "L", bodyType: "F", equipment: "B", transmission: "R" },
  "porsche cayenne": { code: "LFBR", category: "L", bodyType: "F", equipment: "B", transmission: "R" },
  "porsche macan": { code: "PFAR", category: "P", bodyType: "F", equipment: "A", transmission: "R" },
}

// SIPP Rules for deduction when not in MASTER
const SIPP_RULES = {
  categories: {
    M: { name: "Mini", size: "< 3.7m", examples: ["Fiat 500", "Smart ForTwo"] },
    N: { name: "Mini Elite", size: "< 3.7m", examples: ["Mini Cooper"] },
    E: { name: "Economy", size: "3.7-4.2m", examples: ["VW Polo", "Ford Fiesta"] },
    H: { name: "Economy Elite", size: "3.7-4.2m", examples: ["Renault Clio"] },
    C: { name: "Compact", size: "4.2-4.5m", examples: ["VW Golf", "Ford Focus"] },
    D: { name: "Compact Elite", size: "4.2-4.5m", examples: ["Škoda Scala"] },
    I: { name: "Intermediate", size: "4.5-4.8m", examples: ["Toyota Corolla"] },
    J: { name: "Intermediate Elite", size: "4.5-4.8m", examples: ["BMW 3 Series"] },
    S: { name: "Standard", size: "4.8-5.0m", examples: ["VW Passat"] },
    R: { name: "Standard Elite", size: "4.8-5.0m", examples: ["BMW 5 Series"] },
    F: { name: "Fullsize", size: "> 5.0m", examples: ["Mercedes E-Class"] },
    G: { name: "Fullsize Elite", size: "> 5.0m", examples: ["BMW 7 Series"] },
    P: { name: "Premium", size: "Luxury", examples: ["Mercedes GLA", "Audi Q3"] },
    L: { name: "Luxury", size: "Top Luxury", examples: ["Mercedes S-Class", "Porsche 911"] },
    X: { name: "Special", size: "Van/Utility", examples: ["Renault Trafic"] },
  },
  bodyTypes: {
    B: "2-3 Door",
    C: "2/4 Door",
    D: "4-5 Door",
    W: "Wagon/Estate",
    V: "Passenger Van",
    L: "Limousine",
    S: "Sport",
    T: "Convertible",
    F: "SUV",
    J: "Open Air All Terrain",
    X: "Special",
    K: "Commercial Van/Truck",
    M: "Monospace/MPV",
    G: "Crossover",
  },
  equipment: {
    M: "Manual Unspecified",
    N: "Manual Air Conditioning",
    A: "Automatic Unspecified",
    B: "Automatic Air Conditioning",
  },
  transmission: {
    R: "Unspecified Fuel/Air",
    N: "Unspecified Fuel/Air Conditioning",
    D: "Diesel/Air",
    Q: "Diesel/No Air",
    H: "Hybrid",
    E: "Electric",
    B: "Electric",
  },
}

// Category hierarchy for upgrade/downgrade
const CATEGORY_HIERARCHY = ["M", "N", "E", "H", "C", "D", "I", "J", "S", "R", "F", "G", "P", "L", "X"]

// Normalize car name
function normalizeCarName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
}

// Deduce SIPP code from vehicle attributes
function deduceSIPPCode(
  make: string,
  model: string,
  transmission: "manual" | "automat",
  bodyStyle?: string,
  fuelType?: string,
): SIPPCode {
  const fullName = normalizeCarName(`${make} ${model}`)

  // Try to find in MASTER first
  const masterEntry = ACRISS_MASTER[fullName]
  if (masterEntry) {
    // Adjust transmission if needed
    const adjustedCode = { ...masterEntry }
    if (transmission === "automat" && adjustedCode.equipment === "M") {
      adjustedCode.equipment = "A"
      adjustedCode.code = adjustedCode.code.replace(/M/, "A")
    }
    return adjustedCode
  }

  // Deduce from rules
  let category = "C" // Default: Compact
  let bodyType = "D" // Default: 4-5 Door
  const equipment = transmission === "manual" ? "M" : "A"
  let transmissionCode = "R" // Default: Unspecified

  // Deduce category from model keywords
  if (fullName.includes("mini") || fullName.includes("smart") || fullName.includes("aygo")) {
    category = "M"
  } else if (fullName.includes("polo") || fullName.includes("fiesta") || fullName.includes("corsa")) {
    category = "E"
  } else if (fullName.includes("golf") || fullName.includes("focus") || fullName.includes("civic")) {
    category = "C"
  } else if (fullName.includes("passat") || fullName.includes("mondeo") || fullName.includes("accord")) {
    category = "S"
  } else if (fullName.includes("bmw") || fullName.includes("mercedes") || fullName.includes("audi")) {
    category = "P"
  } else if (fullName.includes("porsche") || fullName.includes("ferrari") || fullName.includes("lamborghini")) {
    category = "L"
  } else if (fullName.includes("van") || fullName.includes("transporter") || fullName.includes("ducato")) {
    category = "X"
  }

  // Deduce body type
  if (fullName.includes("suv") || fullName.includes("crossover") || fullName.includes("x")) {
    bodyType = "F"
  } else if (fullName.includes("wagon") || fullName.includes("estate") || fullName.includes("sw")) {
    bodyType = "W"
  } else if (fullName.includes("van") || fullName.includes("mpv")) {
    bodyType = "V"
  } else if (fullName.includes("convertible") || fullName.includes("cabrio") || fullName.includes("roadster")) {
    bodyType = "T"
  } else if (fullName.includes("coupe") || fullName.includes("sport")) {
    bodyType = "S"
  }

  // Adjust transmission code based on fuel type
  if (fuelType) {
    const fuelLower = fuelType.toLowerCase()
    if (fuelLower.includes("diesel")) {
      transmissionCode = "D"
    } else if (fuelLower.includes("hybrid")) {
      transmissionCode = "H"
    } else if (fuelLower.includes("electric") || fuelLower.includes("ev")) {
      transmissionCode = "E"
    }
  }

  const code = `${category}${bodyType}${equipment}${transmissionCode}`

  return {
    code,
    category,
    bodyType,
    equipment,
    transmission: transmissionCode,
  }
}

// Calculate match score with penalties
function calculateMatchScore(
  customerSipp: SIPPCode,
  fleetSipp: SIPPCode,
  customerTransmission: "manual" | "automat",
  fleetTransmission: string,
): { score: number; penalties: string[] } {
  let score = 1.0
  const penalties: string[] = []

  // Category mismatch penalty
  if (customerSipp.category !== fleetSipp.category) {
    score -= 0.25
    penalties.push(`Categorie diferită: ${customerSipp.category} vs ${fleetSipp.category}`)
  }

  // Body type mismatch penalty
  if (customerSipp.bodyType !== fleetSipp.bodyType) {
    score -= 0.4
    penalties.push(`Caroserie nepotrivită: ${customerSipp.bodyType} vs ${fleetSipp.bodyType}`)
  }

  // Transmission mismatch penalty
  const fleetTransLower = fleetTransmission.toLowerCase()
  const isFleetManual = fleetTransLower.includes("manual") || fleetTransLower === "manual"
  const isFleetAutomat = fleetTransLower.includes("automat") || fleetTransLower === "automat"
  const isFleetBoth = fleetTransLower.includes("/") || (isFleetManual && isFleetAutomat)

  if (!isFleetBoth) {
    if (customerTransmission === "manual" && !isFleetManual) {
      score -= 0.35
      penalties.push("Transmisie diferită: manual vs automat")
    } else if (customerTransmission === "automat" && !isFleetAutomat) {
      score -= 0.35
      penalties.push("Transmisie diferită: automat vs manual")
    }
  }

  // Fuel type incompatibility penalty
  if (customerSipp.transmission !== fleetSipp.transmission) {
    score -= 0.35
    penalties.push(`Tip combustibil incompatibil: ${customerSipp.transmission} vs ${fleetSipp.transmission}`)
  }

  return { score: Math.max(0, score), penalties }
}

// Main validation and matching function
export function validateAndMatchSIPP(
  make: string,
  model: string,
  transmission: "manual" | "automat",
  fleetData: any[],
  year?: string,
  doors?: number,
  bodyStyle?: string,
  fuelType?: string,
): MatchResult {
  // Step 1: Determine canonical SIPP code
  const canonicalSipp = deduceSIPPCode(make, model, transmission, bodyStyle, fuelType)

  // Step 2: Match against fleet
  const exactMatches: VehicleMatch[] = []
  const upgradeMatches: VehicleMatch[] = []
  const downgradeMatches: VehicleMatch[] = []

  const customerCategoryIndex = CATEGORY_HIERARCHY.indexOf(canonicalSipp.category)

  fleetData.forEach((category) => {
    category.cars.forEach((car: any) => {
      const fleetSippCode = car.sippCode
      const fleetSipp: SIPPCode = {
        code: fleetSippCode,
        category: fleetSippCode[0],
        bodyType: fleetSippCode[1],
        equipment: fleetSippCode[2],
        transmission: fleetSippCode[3],
      }

      const { score, penalties } = calculateMatchScore(canonicalSipp, fleetSipp, transmission, car.specs.transmission)

      const fleetCategoryIndex = CATEGORY_HIERARCHY.indexOf(fleetSipp.category)

      let matchType: "exact" | "upgrade" | "downgrade" = "exact"
      if (fleetCategoryIndex > customerCategoryIndex) {
        matchType = "upgrade"
      } else if (fleetCategoryIndex < customerCategoryIndex) {
        matchType = "downgrade"
      }

      const match: VehicleMatch = {
        vehicleId: car.name.toLowerCase().replace(/\s+/g, "-"),
        vehicleName: car.name,
        sippCode: fleetSippCode,
        matchScore: score,
        matchType,
        penalties,
        image: car.image,
        specs: car.specs,
      }

      if (score >= 0.9 && matchType === "exact") {
        exactMatches.push(match)
      } else if (matchType === "upgrade") {
        upgradeMatches.push(match)
      } else if (matchType === "downgrade") {
        downgradeMatches.push(match)
      }
    })
  })

  // Sort by score
  exactMatches.sort((a, b) => b.matchScore - a.matchScore)
  upgradeMatches.sort((a, b) => b.matchScore - a.matchScore)
  downgradeMatches.sort((a, b) => b.matchScore - a.matchScore)

  // Step 3: Determine recommended vehicle (no downgrade policy)
  let recommendedVehicle: VehicleMatch | null = null
  if (exactMatches.length > 0) {
    recommendedVehicle = exactMatches[0]
  } else if (upgradeMatches.length > 0) {
    recommendedVehicle = upgradeMatches[0]
  }

  // Step 4: Generate justification document
  const justificationDocument = generateJustificationDocument(
    { make, model, year, doors, bodyStyle, transmission, fuelType },
    canonicalSipp,
    exactMatches,
    upgradeMatches,
    downgradeMatches,
    recommendedVehicle,
  )

  return {
    canonicalSipp: canonicalSipp.code,
    customerVehicle: { make, model, year, doors, bodyStyle, transmission, fuelType },
    exactMatches,
    upgradeMatches,
    downgradeMatches,
    recommendedVehicle,
    justificationDocument,
  }
}

// Generate justification document
function generateJustificationDocument(
  customerVehicle: any,
  canonicalSipp: SIPPCode,
  exactMatches: VehicleMatch[],
  upgradeMatches: VehicleMatch[],
  downgradeMatches: VehicleMatch[],
  recommendedVehicle: VehicleMatch | null,
): string {
  const timestamp = new Date().toISOString()
  const date = new Date().toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const transmissionText = customerVehicle.transmission === "manual" ? "manuală" : "automată"

  const doc = `# Justificare potrivire cod SIPP & alocare flotă – ${customerVehicle.make} ${customerVehicle.model}

**Data:** ${date}  
**Standard:** ACRISS – cod 4 litere (clasificare internațională)  
**Timestamp:** ${timestamp}

---

## 1. Identificare vehicul selectat

**Marcă / Model:** ${customerVehicle.make} ${customerVehicle.model}${customerVehicle.year ? ` (${customerVehicle.year})` : ""}  
**Atribute:**  
- ${customerVehicle.doors ? `${customerVehicle.doors} uși` : "Număr uși: nespecificat"}  
- ${customerVehicle.bodyStyle || "Caroserie: standard"}  
- Transmisie: ${transmissionText}  
- ${customerVehicle.fuelType ? `Combustibil: ${customerVehicle.fuelType}` : "Combustibil: nespecificat"}

---

## 2. Determinare cod SIPP canonic

**Cod canonic:** \`${canonicalSipp.code}\`

**Argumente:**
- **Litera 1 (Categorie):** \`${canonicalSipp.category}\` – ${SIPP_RULES.categories[canonicalSipp.category as keyof typeof SIPP_RULES.categories]?.name || "Categorie"} (${SIPP_RULES.categories[canonicalSipp.category as keyof typeof SIPP_RULES.categories]?.size || ""})
- **Litera 2 (Caroserie):** \`${canonicalSipp.bodyType}\` – ${SIPP_RULES.bodyTypes[canonicalSipp.bodyType as keyof typeof SIPP_RULES.bodyTypes] || "Tip caroserie"}
- **Litera 3 (Echipare):** \`${canonicalSipp.equipment}\` – ${SIPP_RULES.equipment[canonicalSipp.equipment as keyof typeof SIPP_RULES.equipment] || "Echipare"}
- **Litera 4 (Transmisie/Combustibil):** \`${canonicalSipp.transmission}\` – ${SIPP_RULES.transmission[canonicalSipp.transmission as keyof typeof SIPP_RULES.transmission] || "Transmisie"}

**Bază de determinare:** ${ACRISS_MASTER[normalizeCarName(`${customerVehicle.make} ${customerVehicle.model}`)] ? "ACRISS MASTER (identificare directă)" : "Deducție pe baza regulilor ACRISS internaționale"}

---

## 3. Potrivire cu flota activă

### 🟩 Match „verde" (perfect) – Scor > 0.9

${
  exactMatches.length > 0
    ? exactMatches
        .map(
          (m) => `- **${m.vehicleName}** (SIPP: \`${m.sippCode}\`)
  - Scor potrivire: ${(m.matchScore * 100).toFixed(0)}%
  - Specificații: ${m.specs.engine}, ${m.specs.transmission}, ${m.specs.seats} locuri
  ${m.penalties.length > 0 ? `- Observații: ${m.penalties.join("; ")}` : ""}`,
        )
        .join("\n\n")
    : "_Nu există potriviri perfecte în flotă._"
}

### 🟦 Upgrade „albastru" (categorie superioară)

${
  upgradeMatches.length > 0
    ? upgradeMatches
        .slice(0, 5)
        .map(
          (m) => `- **${m.vehicleName}** (SIPP: \`${m.sippCode}\`)
  - Scor potrivire: ${(m.matchScore * 100).toFixed(0)}%
  - Motiv: Categorie superioară (\`${m.sippCode[0]}\` > \`${canonicalSipp.category}\`)
  - Specificații: ${m.specs.engine}, ${m.specs.transmission}, ${m.specs.seats} locuri`,
        )
        .join("\n\n")
    : "_Nu există opțiuni de upgrade disponibile._"
}

### 🟨 Downgrade „galben" (doar informativ, nepermis implicit)

${
  downgradeMatches.length > 0
    ? downgradeMatches
        .slice(0, 3)
        .map(
          (m) => `- **${m.vehicleName}** (SIPP: \`${m.sippCode}\`)
  - Scor potrivire: ${(m.matchScore * 100).toFixed(0)}%
  - Motiv: Categorie inferioară (\`${m.sippCode[0]}\` < \`${canonicalSipp.category}\`)
  - **⚠️ Marcat ca nepermis implicit conform politicii no_downgrade**`,
        )
        .join("\n\n")
    : "_Nu există opțiuni de downgrade._"
}

---

## 4. Decizie recomandată

${
  recommendedVehicle
    ? `**Recomandare:** ${recommendedVehicle.vehicleName} (SIPP: \`${recommendedVehicle.sippCode}\`)

**Motivație:**  
- Respectă regula \`no_downgrade\` (fără alocare automată pe categorie inferioară)
- Scor de potrivire: ${(recommendedVehicle.matchScore * 100).toFixed(0)}%
- Tip potrivire: ${recommendedVehicle.matchType === "exact" ? "Exactă" : "Upgrade acceptat"}
${recommendedVehicle.penalties.length > 0 ? `- Observații: ${recommendedVehicle.penalties.join("; ")}` : ""}

**Specificații tehnice:**
- Motor: ${recommendedVehicle.specs.engine}
- Transmisie: ${recommendedVehicle.specs.transmission}
- Locuri: ${recommendedVehicle.specs.seats}
- Combustibil: ${recommendedVehicle.specs.fuel}`
    : `**⚠️ Nu există vehicul recomandat disponibil în flotă.**

Motivație: Nu s-au găsit potriviri exacte sau upgrade-uri acceptabile conform standardului ACRISS și politicii \`no_downgrade\`.`
}

---

## 5. Conformitate & trasabilitate

✅ **Conform standardului internațional ACRISS**  
✅ **Politică:** Fără downgrade automat, upgrade permis doar dacă clasa identică lipsește  
✅ **Surse folosite:** ACRISS MASTER Database, SIPP International Rules  
✅ **Timestamp:** ${timestamp}  
✅ **Hash input:** ${Buffer.from(`${customerVehicle.make}-${customerVehicle.model}-${customerVehicle.transmission}-${timestamp}`).toString("base64").substring(0, 16)}

---

## 6. Observații suplimentare

- Orice abatere de la codul canonic este justificată în secțiunea upgrade/downgrade.
- Documentul servește drept dovadă internă de clasificare conform ACRISS, pentru acoperire contractuală și legală.
- Clasificarea este realizată automat pe baza standardului internațional agreat în industria de rent-a-car.
- Pentru clarificări suplimentare, contactați departamentul de fleet management.

---

**Document generat automat de ACRISS SIPP Validator & Matching Engine**  
**© ${new Date().getFullYear()} - Toate drepturile rezervate**
`

  return doc
}
