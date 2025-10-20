// Commercial Fleet Matcher for autopeloc.ro
// Matches customer vehicles to fleet inventory using ACRISS 2024 standard

import Papa from "papaparse"
import { carClasses } from "./fleet-data"
import { getVehicleSIPP, VEHICLE_DATABASE } from "./vehicle-classification"

// Types
export interface CustomerSelection {
  brand: string
  model: string
  year: number
  transmission?: string
  fuel_type?: string
  city?: string
  insurer_case_id?: string
}

export interface CommercialProfile {
  brand: string
  model: string
  interval: string
  caroserie: string
  transmisie: string
  combustibil: string
  categorie_comerciala: string
  cod_sipp_comercial: string
  sipp_acriss_oficial: string
  comentariu: string
  confidence: number
}

export interface FleetVehicle {
  id: string
  brand: string
  model: string
  year: number
  transmission: string
  fuel: string
  city?: string
  mileage: number // Rulaj
  features: string[] // Dotări, ex: "Navigație", "Scaune încălzite"
  sipp_comercial: string
  categorie_comerciala: string
  image: string
  score: number
  finalScore: number
  why: string[]
  reason_codes: string[]
}

export interface AuditEntry {
  timestamp: string
  event: string
  details: Record<string, any>
}

export interface MatchResult {
  target: CommercialProfile
  perfect_match: FleetVehicle[]
  exchange_ready_100: FleetVehicle[]
  upgrade: FleetVehicle[]
  downgrade: FleetVehicle[]
  recommended: FleetVehicle | null
  warnings: string[]
  auditLog: AuditEntry[]
}

export interface JustificationDocument {
  markdown: string
  offer_class: string
  offer_class_categorie: string
}

// CSV data cache
let csvData: any[] | null = null

// Normalization functions
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function normalizeTransmission(trans: string): string {
  const t = trans.toLowerCase()
  if (["auto", "automat", "automata", "automată", "automatic", "dsg", "dct", "cvt", "e-cvt"].includes(t)) {
    return "Automata"
  }
  if (["man", "manual", "manuala", "manuală", "mt"].includes(t)) {
    return "Manuala"
  }
  return trans
}

function normalizeFuel(fuel: string): string {
  const f = fuel.toLowerCase()
  if (f.includes("benz")) return "Benzina"
  if (f.includes("dies")) return "Diesel"
  if (f.includes("hybrid") || f.includes("hibrid")) return "Hybrid"
  if (f.includes("elect")) return "Electric"
  return fuel
}

// Parse year interval
function parseYearInterval(interval: string): { start: number; end: number } | null {
  const cleaned = interval.replace(/–/g, "-").trim()
  const match = cleaned.match(/(\d{4})\s*-\s*(\d{4})/)
  if (match) {
    return { start: Number.parseInt(match[1]), end: Number.parseInt(match[2]) }
  }
  return null
}

function isYearInInterval(year: number, interval: string): { inRange: boolean; distance: number } {
  const parsed = parseYearInterval(interval)
  if (!parsed) return { inRange: false, distance: 999 }

  if (year >= parsed.start && year <= parsed.end) {
    return { inRange: true, distance: 0 }
  }

  const distToStart = Math.abs(year - parsed.start)
  const distToEnd = Math.abs(year - parsed.end)
  return { inRange: false, distance: Math.min(distToStart, distToEnd) }
}

// Fetch and parse CSV
async function loadCSVData(): Promise<any[]> {
  if (csvData) return csvData

  const response = await fetch(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIPP_COMMERCIAL_EXTENDED_FIXED-qKmEbpj6TZYvjQuSP366laUsayhszj.csv",
  )
  const csvText = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        if (results.errors.length > 0) {
          console.error("[v0] CSV parse errors:", results.errors)
          return reject(new Error("CSV parsing failed"))
        }
        csvData = results.data
        console.log("[v0] CSV loaded:", csvData.length, "records")
        resolve(csvData)
      },
      error: (error: Error) => {
        console.error("[v0] CSV parse error:", error)
        reject(error)
      },
    })
  })
}

function fuzzyMatchBrand(brand1: string, brand2: string): boolean {
  const norm1 = normalize(brand1)
  const norm2 = normalize(brand2)

  // Exact match
  if (norm1 === norm2) return true

  // Remove spaces and hyphens for brand comparison (e.g., "Alfa Romeo" vs "Alfa-Romeo")
  const compact1 = norm1.replace(/[\s-]/g, "")
  const compact2 = norm2.replace(/[\s-]/g, "")
  if (compact1 === compact2) return true

  // Check if one is a prefix of the other (e.g., "Alfa" vs "Alfa Romeo")
  // But only if the shorter one is at least 4 characters to avoid false matches
  const shorter = norm1.length < norm2.length ? norm1 : norm2
  const longer = norm1.length < norm2.length ? norm2 : norm1
  if (shorter.length >= 4 && longer.startsWith(shorter)) return true

  return false
}

function exactMatchModel(model1: string, model2: string): boolean {
  const norm1 = normalize(model1)
  const norm2 = normalize(model2)

  // Exact match only
  if (norm1 === norm2) return true

  // Allow minor variations like spaces/hyphens (e.g., "T-Cross" vs "T Cross")
  const compact1 = norm1.replace(/[\s-]/g, "")
  const compact2 = norm2.replace(/[\s-]/g, "")
  if (compact1 === compact2) return true

  return false
}

// Find commercial profile from CSV
async function findCommercialProfile(selection: CustomerSelection): Promise<CommercialProfile | null> {
  const result = getVehicleSIPP(selection.brand, selection.model, selection.transmission as "Manual" | "Automat")

  if (!result) {
    console.log("[v0] Vehicle not found in classification database")
    return null
  }

  console.log("[v0] Vehicle classification:", result)

  return {
    brand: selection.brand,
    model: selection.model,
    interval: `${selection.year}–${selection.year + 5}`,
    caroserie: "Standard",
    transmisie: selection.transmission || "Automata",
    combustibil: selection.fuel_type || "Benzina",
    categorie_comerciala: result.category,
    cod_sipp_comercial: result.sippCode,
    sipp_acriss_oficial: result.sippCode,
    comentariu: `ACRISS-compliant classification (confidence: ${result.confidence})`,
    confidence: result.confidence,
  }
}

// Convert fleet data to FleetVehicle format
function getFleetInventory(): FleetVehicle[] {
  const vehicles: FleetVehicle[] = []
  let id = 1

  carClasses.forEach((category) => {
    category.cars.forEach((car) => {
      // Handle cars with multiple transmissions
      const transmissions = car.specs.transmission.includes("/")
        ? car.specs.transmission.split("/").map((t) => t.trim())
        : [car.specs.transmission]

      transmissions.forEach((trans) => {
        vehicles.push({
          id: `${id++}`,
          brand: car.name.split(" ")[0],
          model: car.name.split(" ").slice(1).join(" "),
          year: 2024, // Default year for fleet vehicles
          transmission: normalizeTransmission(trans),
          fuel: car.specs.fuel,
          sipp_comercial: car.sippCode,
          categorie_comerciala: category.acrissCode,
          image: car.image,
          mileage: 0,
          features: [],
          score: 0,
          finalScore: 0,
          why: [],
          reason_codes: [],
        })
      })
    })
  })

  return vehicles
}

// Map CSV commercial categories to fleet categories
function mapCSVCategoryToFleet(csvCategory: string): string {
  const mapping: Record<string, string> = {
    // Direct mappings from CSV categories to fleet categories
    Economy: "Economy",
    Compact: "Compact",
    Crossover: "Crossover",
    "Estate/SUV": "Estate",
    SUV: "SUV",
    Monovolum: "Monovolum",
    "VAN 8 seats": "VAN 8 seats",
    "Utility VAN": "Utility VAN",
    "Small SUV Luxury": "Small SUV Luxury",
    "Medium SUV Luxury": "Medium SUV Luxury",

    "Premium SUV": "Small SUV Luxury", // PLAR should upgrade to Medium SUV Luxury (Mercedes GLC)
    "Intermediate Sedan": "Compact",
    "Small SUV": "Crossover",
    "Compact Sedan": "Compact",
    "Economy Sedan": "Economy",
    "Luxury Sedan": "Medium SUV Luxury",
    "Compact SUV": "Crossover",
    "Mid-size SUV": "SUV",
    "Full-size SUV": "Medium SUV Luxury",
    Mini: "Economy",
    Subcompact: "Economy",
    Standard: "Compact",
    Intermediate: "Compact",
    "Full-size": "Estate",
    Premium: "Medium SUV Luxury",
    Luxury: "Medium SUV Luxury",
  }

  return mapping[csvCategory] || csvCategory
}

// Brand groups for matching logic
const BRAND_GROUPS = {
  "dacia-renault": ["dacia", "renault"],
  "vw-group": ["volkswagen", "vw", "skoda", "seat", "audi"],
  stellantis: ["peugeot", "opel", "fiat", "citroen", "citroën"],
}

function getBrandGroup(brand: string): string | null {
  const normalized = normalize(brand)
  for (const [groupName, brands] of Object.entries(BRAND_GROUPS)) {
    if (brands.some((b) => normalize(b) === normalized)) {
      return groupName
    }
  }
  return null
}

function isSameGroup(brand1: string, brand2: string): boolean {
  const group1 = getBrandGroup(brand1)
  const group2 = getBrandGroup(brand2)
  return group1 !== null && group1 === group2
}

// Category families for logical matching across the file
const CATEGORY_FAMILY: Record<string, string> = {
  Economy: "passenger",
  Compact: "passenger",
  Intermediate: "passenger",
  "Intermediate Estate": "passenger",
  Crossover: "passenger",
  Estate: "passenger",
  SUV: "passenger",
  Monovolum: "passenger",
  "Small SUV Luxury": "passenger-luxury",
  "Medium SUV Luxury": "passenger-luxury",
  "Luxury Sedan": "passenger-luxury",
  "VAN 8 seats": "van-passenger",
  "Utility VAN": "van-cargo",
}
export const getCategoryFamily = (cat: string) => CATEGORY_FAMILY[cat] || "unknown"

// Calculate match score
function calculateScore(
  vehicle: FleetVehicle,
  target: CommercialProfile,
  selection: CustomerSelection,
  allowTransmissionCompromise = false,
): { matchScore: number; finalScore: number; why: string[]; reason_codes: string[] } {
  let matchScore = 1.0
  const why: string[] = []
  const reason_codes: string[] = []

  const targetFleetCategory = mapCSVCategoryToFleet(target.categorie_comerciala)

  // Category gap penalty: direction-aware
  const vehicleIndex = getCategoryIndex(vehicle.categorie_comerciala)
  const targetIndex = getCategoryIndex(targetFleetCategory)
  const delta = vehicleIndex - targetIndex
  const gapAbs = Math.abs(delta)
  if (gapAbs > 0) {
    const penaltyPerStep = delta > 0 ? 0.18 : 0.22
    matchScore -= penaltyPerStep * gapAbs
    why.push(delta > 0 ? `Upgrade cu ${gapAbs} trepte` : `Downgrade cu ${gapAbs} trepte`)
    reason_codes.push(delta > 0 ? `upgrade_by_${gapAbs}` : `downgrade_by_${gapAbs}`)
  } else {
    why.push("Categorie identică")
    reason_codes.push("perfect_sipp")
  }

  // Transmission penalty: -0.10 mismatch; -0.20 if compromise allowed
  const transmissionMatch =
    !selection.transmission || vehicle.transmission === normalizeTransmission(selection.transmission)
  if (!transmissionMatch) {
    matchScore -= allowTransmissionCompromise ? 0.2 : 0.1
    why.push(allowTransmissionCompromise ? "Transmisie diferită (compromis)" : "Transmisie diferită")
    reason_codes.push(allowTransmissionCompromise ? "transmisie_compromis" : "transmisie_mismatch")
  } else {
    why.push("Transmisie identică")
    reason_codes.push("transmisie_ok")
  }

  // Year difference penalty: -0.02 per year beyond 3, capped at -0.20
  const yearDiff = Math.abs(vehicle.year - selection.year)
  if (yearDiff > 3) {
    const yearPenalty = Math.min(0.2, 0.02 * (yearDiff - 3))
    matchScore -= yearPenalty
    why.push(`Diferență an: ${yearDiff} ani`)
    reason_codes.push(`delta_an_${yearDiff}`)
  }

  // Brand match bonus: +0.08; Same group: +0.05
  const sameBrand = normalize(vehicle.brand) === normalize(selection.brand)
  if (sameBrand) {
    matchScore += 0.08
    why.push("Brand identic")
    reason_codes.push("same_brand")
  } else {
    const sameGroup = isSameGroup(vehicle.brand, selection.brand)
    if (sameGroup) {
      matchScore += 0.05
      why.push("Același grup de mărci")
      reason_codes.push("same_group")
    }
  }

  // City match bonus: +0.04
  if (selection.city && vehicle.city === selection.city) {
    matchScore += 0.04
    why.push("Oraș identic")
    reason_codes.push("same_city")
  }

  // Clamp match score
  matchScore = Math.max(0, Math.min(1, matchScore))

  // Final score = Confidence × MatchScore
  const finalScore = target.confidence * matchScore

  return { matchScore, finalScore, why, reason_codes }
}

// Match fleet to target
export async function matchFleetToTarget(selection: CustomerSelection): Promise<MatchResult> {
  const warnings: string[] = []

  // Find commercial profile
  const target = await findCommercialProfile(selection)
  if (!target) {
    throw new Error(`Nu s-a găsit profilul comercial pentru ${selection.brand} ${selection.model} (${selection.year})`)
  }

  console.log("[v0] Target profile:", target)

  // Get fleet inventory
  const fleet = getFleetInventory()
  console.log("[v0] Fleet inventory:", fleet.length, "vehicles")

  const targetSIPP = target.cod_sipp_comercial
  console.log("[v0] Target SIPP code:", targetSIPP)

  // Score all vehicles
  const scoredFleet = fleet.map((vehicle) => {
    const { matchScore, finalScore, why, reason_codes } = calculateScore(vehicle, target, selection, false)
    return { ...vehicle, score: matchScore, finalScore, why, reason_codes }
  })

  const auditLog: AuditEntry[] = []

  // Priority 1: Exchange Ready 100%
  // SIPP identic + transmisie identică + |Δan| ≤ 5 + city identic + brand identic (sau același grup)
  const exchange_ready_100 = scoredFleet.filter((v) => {
    const exactSIPP = v.sipp_comercial === targetSIPP
    const yearOk = Math.abs(v.year - selection.year) <= 5
    const transOk = !selection.transmission || v.transmission === normalizeTransmission(selection.transmission)
    const cityOk = !selection.city || v.city === selection.city
    const brandOk = normalize(v.brand) === normalize(selection.brand)
    const groupOk = isSameGroup(v.brand, selection.brand)

    return exactSIPP && yearOk && transOk && cityOk && (brandOk || groupOk)
  })

  console.log("[v0] Exchange ready 100%:", exchange_ready_100.length, "vehicles")

  // Priority 2: Perfect Match
  // SIPP identic + transmisie identică + |Δan| ≤ 5 + city identic
  const perfect_match = scoredFleet.filter((v) => {
    const exactSIPP = v.sipp_comercial === targetSIPP
    const yearOk = Math.abs(v.year - selection.year) <= 5
    const transOk = !selection.transmission || v.transmission === normalizeTransmission(selection.transmission)
    const cityOk = !selection.city || v.city === selection.city

    return exactSIPP && yearOk && transOk && cityOk
  })

  console.log("[v0] Perfect match (exact SIPP):", perfect_match.length, "vehicles")

  let upgrade: FleetVehicle[] = []
  let downgrade: FleetVehicle[] = []

  // Priority 3 & 4: Upgrade/Downgrade (only if no perfect match)
  if (perfect_match.length === 0) {
    console.log("[v0] No perfect match found, looking for upgrade/downgrade")

    const targetCategory = target.categorie_comerciala
    const targetIndex = getCategoryIndex(targetCategory)
    const targetFamily = getCategoryFamily(targetCategory)

    // Filter vehicles: city/transmission must match and category family must be the same
    const candidateVehicles = scoredFleet.filter((v) => {
      const cityOk = !selection.city || v.city === selection.city
      const transOk = !selection.transmission || v.transmission === normalizeTransmission(selection.transmission)
      const sameFamily = getCategoryFamily(v.categorie_comerciala) === targetFamily
      return cityOk && transOk && sameFamily
    })

    auditLog.push({
      timestamp: new Date().toISOString(),
      event: "upgrade_downgrade_candidates",
      details: {
        targetCategory,
        targetFamily,
        candidateCount: candidateVehicles.length,
      },
    })

    candidateVehicles.forEach((v) => {
      const vehicleIndex = getCategoryIndex(v.categorie_comerciala)
      const deltaGap = vehicleIndex - targetIndex
      const absGap = Math.abs(deltaGap)

      // Priority 3: Upgrade controlled (gap ≤ 1, score ≥ 0.78)
      if (deltaGap > 0 && absGap <= 1 && v.finalScore >= 0.78) {
        upgrade.push(v)
      }
      // Priority 4: Downgrade controlled (gap ≤ 1, score ≥ 0.72)
      else if (deltaGap < 0 && absGap <= 1 && v.finalScore >= 0.72) {
        downgrade.push(v)
      }
    })

    // Deduplication: max 2 results per brand
    const deduplicateByBrand = (vehicles: FleetVehicle[]) => {
      const brandCounts = new Map<string, number>()
      return vehicles.filter((v) => {
        const brand = normalize(v.brand)
        const count = brandCounts.get(brand) || 0
        if (count < 2) {
          brandCounts.set(brand, count + 1)
          return true
        }
        return false
      })
    }

    upgrade = deduplicateByBrand(upgrade)
    downgrade = deduplicateByBrand(downgrade)

    console.log("[v0] Upgrade options:", upgrade.length, "vehicles")
    console.log("[v0] Downgrade options:", downgrade.length, "vehicles")
  }

  const sortBucket = (bucket: FleetVehicle[]) => {
    return bucket.sort((a, b) => {
      // 1. FinalScore desc
      if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore

      // 2. |Δyear| asc
      const yearDiffA = Math.abs(a.year - selection.year)
      const yearDiffB = Math.abs(b.year - selection.year)
      if (yearDiffA !== yearDiffB) return yearDiffA - yearDiffB

      // 3. same_brand > same_group > others
      const sameBrandA = normalize(a.brand) === normalize(selection.brand)
      const sameBrandB = normalize(b.brand) === normalize(selection.brand)
      if (sameBrandA && !sameBrandB) return -1
      if (!sameBrandA && sameBrandB) return 1

      const sameGroupA = isSameGroup(a.brand, selection.brand)
      const sameGroupB = isSameGroup(b.brand, selection.brand)
      if (sameGroupA && !sameGroupB) return -1
      if (!sameGroupA && sameGroupB) return 1

      // 4. Tie-break: alphabetic (brand, model)
      const brandCompare = a.brand.localeCompare(b.brand)
      if (brandCompare !== 0) return brandCompare
      return a.model.localeCompare(b.model)
    })
  }

  const sortedExchange = sortBucket([...exchange_ready_100])
  const sortedPerfect = sortBucket([...perfect_match])
  const sortedUpgrade = sortBucket([...upgrade])
  const sortedDowngrade = sortBucket([...downgrade])

  auditLog.push({
    timestamp: new Date().toISOString(),
    event: "bucket_counts",
    details: {
      exchange_ready_100: sortedExchange.length,
      perfect_match: sortedPerfect.length,
      upgrade: sortedUpgrade.length,
      downgrade: sortedDowngrade.length,
    },
  })

  let recommended: FleetVehicle | null = null
  if (sortedExchange.length > 0) {
    recommended = sortedExchange[0]
    console.log("[v0] Recommended from Exchange Ready 100%")
    auditLog.push({
      timestamp: new Date().toISOString(),
      event: "recommendation_selected",
      details: {
        bucket: "exchange_ready_100",
        vehicle: { id: recommended.id, brand: recommended.brand, model: recommended.model },
        finalScore: recommended.finalScore,
        reason_codes: recommended.reason_codes,
      },
    })
  } else if (sortedPerfect.length > 0) {
    recommended = sortedPerfect[0]
    console.log("[v0] Recommended from Perfect Match")
    auditLog.push({
      timestamp: new Date().toISOString(),
      event: "recommendation_selected",
      details: {
        bucket: "perfect_match",
        vehicle: { id: recommended.id, brand: recommended.brand, model: recommended.model },
        finalScore: recommended.finalScore,
        reason_codes: recommended.reason_codes,
      },
    })
  } else if (sortedUpgrade.length > 0) {
    recommended = sortedUpgrade[0]
    warnings.push("Recomandăm un upgrade - categoria exactă nu este disponibilă")
    console.log("[v0] Recommended from Upgrade")
    auditLog.push({
      timestamp: new Date().toISOString(),
      event: "recommendation_selected",
      details: {
        bucket: "upgrade",
        vehicle: { id: recommended.id, brand: recommended.brand, model: recommended.model },
        finalScore: recommended.finalScore,
        reason_codes: recommended.reason_codes,
      },
    })
  } else if (sortedDowngrade.length > 0) {
    recommended = sortedDowngrade[0]
    warnings.push("Recomandăm un downgrade - categoria exactă nu este disponibilă")
    console.log("[v0] Recommended from Downgrade")
    auditLog.push({
      timestamp: new Date().toISOString(),
      event: "recommendation_selected",
      details: {
        bucket: "downgrade",
        vehicle: { id: recommended.id, brand: recommended.brand, model: recommended.model },
        finalScore: recommended.finalScore,
        reason_codes: recommended.reason_codes,
      },
    })
  } else {
    console.log("[v0] No match found - Priority 5 Fallback")
    warnings.push("no_match_found")
    auditLog.push({
      timestamp: new Date().toISOString(),
      event: "no_match_found",
      details: {},
    })
  }

  // Warnings
  if (selection.year < 2005) {
    warnings.push("Vehicul mai vechi de 2005 - verificare manuală recomandată")
  }
  if (target.confidence < 0.95) {
    warnings.push("confidence_low")
  }
  if (perfect_match.length === 0 && upgrade.length === 0 && downgrade.length === 0) {
    warnings.push(
      `Nu există vehicule disponibile pentru categoria ${target.categorie_comerciala} - contactați-ne pentru alternative`,
    )
  }

  return {
    target,
    perfect_match: sortedPerfect,
    exchange_ready_100: sortedExchange,
    upgrade: sortedUpgrade,
    downgrade: sortedDowngrade,
    recommended,
    warnings,
    auditLog,
  }
}

// Generate justification document
export function generateJustificationDocument(
  selection: CustomerSelection,
  matchResult: MatchResult,
  offer_class: string,
): JustificationDocument {
  const { target, perfect_match, exchange_ready_100, upgrade, downgrade } = matchResult

  // Find offer class details
  let offer_class_categorie = ""
  let motiv_alegere = ""

  if (offer_class === target.cod_sipp_comercial) {
    offer_class_categorie = target.categorie_comerciala
    motiv_alegere = "Echivalență 1:1 (match perfect)"
  } else {
    // Check if it's an upgrade
    const upgradeVehicle = upgrade.find((v) => v.sipp_comercial === offer_class)
    if (upgradeVehicle) {
      offer_class_categorie = upgradeVehicle.categorie_comerciala
      motiv_alegere =
        "Lipsă disponibilitate în clasa țintă; oferim clasă superioară conform politicii comerciale (beneficiu client)"
    } else {
      // Check if it's a downgrade
      const downgradeVehicle = downgrade.find((v) => v.sipp_comercial === offer_class)
      if (downgradeVehicle) {
        offer_class_categorie = downgradeVehicle.categorie_comerciala
        motiv_alegere =
          "Doar cu acord client; justificare logistică / termen de livrare; ajustare tarifară dacă e cazul"
      }
    }
  }

  const timestamp = new Date().toISOString()
  const hash_recomandare = Math.random().toString(36).substring(2, 10).toUpperCase()

  const markdown = `# Dosar schimb – ${selection.insurer_case_id || "Fără ID"}

**Model avariat:** ${selection.brand} ${selection.model} ${selection.year}  
**Profil comercial țintă:** ${target.categorie_comerciala}/${target.cod_sipp_comercial} (interval ${target.interval})

**Clasă oferită la schimb:** ${offer_class} — ${offer_class_categorie}

---

## 1) Fundamentare comercială

- Clasificare pe baza fișierului comercial (2005–2025) și a flotei live.
- Modelul selectat se încadrează la: **${target.categorie_comerciala}** → **${target.cod_sipp_comercial}**.
- Alegerea clasei oferite: ${motiv_alegere}

## 2) Potriviri din flotă (rezumat)

- **Perfect match:** ${perfect_match.length} vehicule
- **100% la schimb:** ${exchange_ready_100.length} vehicule (criterii stricte: brand/grup, caroserie, Δan ≤5)
- **Upgrade disponibil:** ${upgrade.length} vehicule
- **Downgrade (informativ):** ${downgrade.length} vehicule

### Detalii vehicule recomandate:

${exchange_ready_100
  .slice(0, 3)
  .map(
    (v) => `- **${v.brand} ${v.model}** (${v.year}) - ${v.sipp_comercial} - Scor: ${v.score.toFixed(2)}
  - Motiv: ${v.why.join(", ")}`,
  )
  .join("\n")}

## 3) Argumente pentru asigurator

- **Politică comercială internă:** Încadrăm crossovers/SUV-uri în coduri comerciale unificate pentru predictibilitate operațională.
- **Codul ACRISS oficial pentru modelul de bază:** ${target.sipp_acriss_oficial} (diferențele față de codul comercial sunt deliberate pentru uniformizarea tarifară).
- În lipsa disponibilității clasei țintă, oferim **${offer_class}** pentru a asigura continuitatea mobilității, fără diminuarea valorii de utilizare.

## 4) Trasabilitate și audit

- **Sursă:** SIPP_COMMERCIAL_EXTENDED.csv (interval ${target.interval}), FLEET live.
- **Timestamp:** ${timestamp}
- **Reguli scor:** category_gap, transmisie, Δan, brand proximity.
- **ID recomandare:** ${hash_recomandare}
- **Audit evenimente (ultimele 3):**
${matchResult.auditLog.slice(-3).map((e) => `  - ${e.timestamp} — ${e.event}: ${JSON.stringify(e.details)}`).join("\n")}

---

*Document generat automat de Fleet Intelligence - powered by autopeloc*
`

  return {
    markdown,
    offer_class,
    offer_class_categorie,
  }
}

// Get all unique brands and models from CSV
export async function getAllCarsFromCSV(): Promise<Array<{ brand: string; model: string }>> {
  const data = await loadCSVData()

  const uniqueCars = new Map<string, Set<string>>()

  data.forEach((row) => {
    const brand = row.Brand?.trim()
    const model = row.Model?.trim()

    if (brand && model) {
      if (!uniqueCars.has(brand)) {
        uniqueCars.set(brand, new Set())
      }
      uniqueCars.get(brand)!.add(model)
    }
  })

  Object.entries(VEHICLE_DATABASE).forEach(([brand, models]) => {
    const capitalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1)

    if (!uniqueCars.has(capitalizedBrand)) {
      uniqueCars.set(capitalizedBrand, new Set())
    }

    Object.keys(models).forEach((model) => {
      // Capitalize model name properly
      const capitalizedModel = model
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      uniqueCars.get(capitalizedBrand)!.add(capitalizedModel)
    })
  })

  const result: Array<{ brand: string; model: string }> = []

  uniqueCars.forEach((models, brand) => {
    models.forEach((model) => {
      result.push({ brand, model })
    })
  })

  // Sort by brand, then model
  result.sort((a, b) => {
    const brandCompare = a.brand.localeCompare(b.brand)
    if (brandCompare !== 0) return brandCompare
    return a.model.localeCompare(b.model)
  })

  console.log("[v0] Loaded", result.length, "unique cars from CSV + vehicle database")

  return result
}

export async function getCarCategory(
  brand: string,
  model: string,
  year: number,
  transmission?: string,
): Promise<string | null> {
  try {
    const result = getVehicleSIPP(brand, model, transmission as "Manual" | "Automat")

    console.log("[v0] Autopeloc match:", result)
    return result?.category ?? null
  } catch (error: unknown) {
    console.error("[v0] Error getting car category:", error)
    return null
  }
}

function getCategoryIndex(category: string): number {
  const index = carClasses.findIndex((cat) => cat.acrissCode === category)
  return index === -1 ? 999 : index
}

function getCategoryGap(cat1: string, cat2: string): number {
  return Math.abs(getCategoryIndex(cat1) - getCategoryIndex(cat2))
}
