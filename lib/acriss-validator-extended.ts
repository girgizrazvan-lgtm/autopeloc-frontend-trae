// ACRISS (SIPP) Validator & Matching Engine Extended
// Uses SIPP_MASTER_EXTENDED.csv (2005-2025) as master database
// Includes year-based matching and generational penalties

export interface SIPPMasterRecord {
  Brand: string
  Model: string
  Ani_fabricatie: string // Body type (CSV columns are swapped)
  Caroserie: string // Year range (e.g., "2005–2012")
  Transmisie: string // "Automata" or "Manuala"
  Combustibil: string // "Benzina", "Diesel", "Hybrid", "Electric"
  Cod_SIPP: string
  Descriere_oficiala: string
}

export interface VehicleSelection {
  brand: string
  model: string
  year: number
  transmission?: string // "Automată", "Manuală", etc.
  fuel_type?: string // "Benzina", "Diesel", etc.
}

export interface FleetVehicle {
  id: string
  name: string
  sippCode: string
  category: string
  transmission: string
  year?: number
  image?: string
}

export interface MatchResult {
  vehicle: FleetVehicle
  score: number
  matchType: "exact" | "upgrade" | "downgrade"
  yearDelta: number
  explanation: string
}

export interface ValidationResult {
  sipp: string
  interval_detectat: string
  year: number
  brand: string
  model: string
  confidence: number
  rationale: string[]
  exactMatches: MatchResult[]
  upgrades: MatchResult[]
  downgrades: MatchResult[]
  recommendedVehicle: MatchResult | null
  document_justificativ: string
  error?: string
}

// SIPP code hierarchy for class comparison
const SIPP_CLASS_HIERARCHY: Record<string, number> = {
  M: 1, // Mini
  N: 2, // Mini Elite
  E: 3, // Economy
  H: 4, // Economy Elite
  C: 5, // Compact
  D: 6, // Compact Elite
  I: 7, // Intermediate
  J: 8, // Intermediate Elite
  S: 9, // Standard
  R: 10, // Standard Elite
  F: 11, // Fullsize
  G: 12, // Fullsize Elite
  P: 13, // Premium
  U: 14, // Premium Elite
  L: 15, // Luxury
  W: 16, // Luxury Elite
  O: 17, // Oversize
  X: 18, // Special
}

// Remove diacritics from Romanian text
function removeDiacritics(text: string): string {
  const diacriticsMap: Record<string, string> = {
    ă: "a",
    â: "a",
    î: "i",
    ș: "s",
    ț: "t",
    Ă: "A",
    Â: "A",
    Î: "I",
    Ș: "S",
    Ț: "T",
  }
  return text.replace(/[ăâîșțĂÂÎȘȚ]/g, (match) => diacriticsMap[match] || match)
}

// Normalize brand/model for comparison
function normalizeText(text: string): string {
  return removeDiacritics(text.trim().toLowerCase()).replace(/\s+/g, " ")
}

// Normalize transmission input to "Automata" or "Manuala"
function normalizeTransmission(trans: string | undefined): string | undefined {
  if (!trans) return undefined

  const normalized = normalizeText(trans)

  const autoKeywords = ["auto", "automata", "automatic", "e-cvt", "ecvt", "dsg", "dct", "cvt"]
  const manualKeywords = ["man", "manuala", "mt"]

  if (autoKeywords.some((kw) => normalized.includes(kw))) {
    return "Automata"
  }
  if (manualKeywords.some((kw) => normalized.includes(kw))) {
    return "Manuala"
  }

  return undefined
}

// Normalize fuel type to title case
function normalizeFuel(fuel: string | undefined): string | undefined {
  if (!fuel) return undefined

  const normalized = normalizeText(fuel)

  if (normalized.includes("benzin")) return "Benzina"
  if (normalized.includes("diesel") || normalized.includes("motorina")) return "Diesel"
  if (normalized.includes("hybrid") || normalized.includes("hibrid")) return "Hybrid"
  if (normalized.includes("electric") || normalized.includes("electr")) return "Electric"

  return undefined
}

// Parse year interval from string (supports both - and –)
function parseYearInterval(rangeStr: string): { start: number; end: number } | null {
  if (!rangeStr) return null

  // Handle both regular dash and en-dash
  const parts = rangeStr
    .replace(/–/g, "-")
    .split("-")
    .map((p) => Number.parseInt(p.trim()))

  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return { start: parts[0], end: parts[1] }
  }

  return null
}

// Check if year is in interval (inclusive)
function isYearInInterval(year: number, rangeStr: string): boolean {
  const interval = parseYearInterval(rangeStr)
  if (!interval) return false
  return year >= interval.start && year <= interval.end
}

// Calculate generational distance
function calculateGenerationalDistance(year: number, rangeStr: string): number {
  const interval = parseYearInterval(rangeStr)
  if (!interval) return Number.POSITIVE_INFINITY

  if (year >= interval.start && year <= interval.end) return 0
  if (year < interval.start) return interval.start - year
  return year - interval.end
}

// Normalize SIPP code (AM → MR for ACRISS 2023 compliance)
function normalizeSIPPCode(code: string): string {
  if (!code) return code

  if (code.endsWith("AM")) {
    code = code.replace(/AM$/, "MR")
  }

  return code.toUpperCase()
}

// Fetch and parse CSV data
async function fetchSIPPMasterData(): Promise<SIPPMasterRecord[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIPP_MASTER_EXTENDED-TcHwno6JlNiKogSuNdSebEV7BUoLJF.csv",
    )

    if (!response.ok) {
      console.error("[v0] CSV fetch failed:", response.status)
      return []
    }

    const csvText = await response.text()
    const lines = csvText.split("\n")
    const headers = lines[0].split(";").map((h) => h.trim().replace(/"/g, ""))

    const records: SIPPMasterRecord[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = line.split(";").map((v) => v.trim().replace(/"/g, ""))
      const record: any = {}

      headers.forEach((header, index) => {
        record[header] = values[index] || ""
      })

      if (record.Brand && record.Model && record.Cod_SIPP) {
        records.push(record as SIPPMasterRecord)
      }
    }

    return records
  } catch (error) {
    console.error("[v0] Failed to fetch SIPP master data:", error)
    return []
  }
}

export async function findCanonicalSIPP(selection: VehicleSelection): Promise<{
  sipp: string
  interval_detectat: string
  confidence: number
  rationale: string[]
  error?: string
} | null> {
  const masterData = await fetchSIPPMasterData()

  if (masterData.length === 0) {
    return {
      sipp: "",
      interval_detectat: "",
      confidence: 0,
      rationale: [],
      error: "CSV-ul SIPP_MASTER_EXTENDED nu a putut fi încărcat",
    }
  }

  // Normalize input
  const brand_norm = normalizeText(selection.brand)
  const model_norm = normalizeText(selection.model)
  const trans_norm = normalizeTransmission(selection.transmission)
  const fuel_norm = normalizeFuel(selection.fuel_type)

  const rationale: string[] = []

  // Step 1: Filter by brand (exact match, normalized)
  let candidates = masterData.filter((r) => normalizeText(r.Brand) === brand_norm)

  if (candidates.length === 0) {
    return {
      sipp: "",
      interval_detectat: "",
      confidence: 0,
      rationale: [`Marca "${selection.brand}" nu există în baza de date`],
      error: `Marca "${selection.brand}" nu există în SIPP_MASTER_EXTENDED`,
    }
  }

  // Step 2: Filter by model (exact match, normalized)
  candidates = candidates.filter((r) => normalizeText(r.Model) === model_norm)

  if (candidates.length === 0) {
    return {
      sipp: "",
      interval_detectat: "",
      confidence: 0,
      rationale: [`Modelul "${selection.model}" nu există pentru marca ${selection.brand}`],
      error: `Modelul "${selection.model}" nu există în SIPP_MASTER_EXTENDED pentru ${selection.brand}`,
    }
  }

  rationale.push(`Match exact: ${selection.brand} ${selection.model}`)

  // Step 3: Filter by year in interval
  let yearMatches = candidates.filter((r) => isYearInInterval(selection.year, r.Caroserie))

  let usedFallback1 = false

  // Fallback #1: If no year matches, find closest generational interval
  if (yearMatches.length === 0) {
    let minDistance = Number.POSITIVE_INFINITY
    const distances = candidates.map((r) => ({
      record: r,
      distance: calculateGenerationalDistance(selection.year, r.Caroserie),
    }))

    minDistance = Math.min(...distances.map((d) => d.distance))
    yearMatches = distances.filter((d) => d.distance === minDistance).map((d) => d.record)

    usedFallback1 = true
    rationale.push(`Fallback generațional: interval apropiat (Δan = ${minDistance} ani)`)
  } else {
    rationale.push(`An ${selection.year} în intervalul detectat`)
  }

  if (yearMatches.length === 0) {
    return {
      sipp: "",
      interval_detectat: "",
      confidence: 0,
      rationale,
      error: "Nu există niciun interval de ani pentru acest model",
    }
  }

  // Step 4: Filter by transmission (if provided)
  let transMatches = yearMatches
  let usedFallback2 = false

  if (trans_norm) {
    transMatches = yearMatches.filter((r) => r.Transmisie === trans_norm)

    // Fallback #2: If no transmission match, search neighboring generation
    if (transMatches.length === 0) {
      // Find next closest generation with same transmission
      const allWithTrans = candidates.filter((r) => r.Transmisie === trans_norm)

      if (allWithTrans.length > 0) {
        const distances = allWithTrans.map((r) => ({
          record: r,
          distance: calculateGenerationalDistance(selection.year, r.Caroserie),
        }))

        const minDist = Math.min(...distances.map((d) => d.distance))
        transMatches = distances.filter((d) => d.distance === minDist).map((d) => d.record)

        usedFallback2 = true
        rationale.push(`Fallback transmisie: generație vecină cu ${trans_norm}`)
      } else {
        // No transmission match at all, keep year matches
        transMatches = yearMatches
        rationale.push(`Transmisie ${trans_norm} nu disponibilă, folosim orice transmisie`)
      }
    } else {
      rationale.push(`Transmisie ${trans_norm} match`)
    }
  }

  // Step 5: Filter by fuel (optional, don't reject if not found)
  let fuelMatches = transMatches

  if (fuel_norm) {
    const withFuel = transMatches.filter((r) => r.Combustibil === fuel_norm)
    if (withFuel.length > 0) {
      fuelMatches = withFuel
      rationale.push(`Combustibil ${fuel_norm} match`)
    }
  }

  // Step 6: Select final row (if multiple remain)
  let finalRecord = fuelMatches[0]

  if (fuelMatches.length > 1) {
    // Tiebreak priority: Electric > Hybrid > Benzina > Diesel
    const fuelPriority: Record<string, number> = {
      Electric: 4,
      Hybrid: 3,
      Benzina: 2,
      Diesel: 1,
    }

    fuelMatches.sort((a, b) => {
      // Prefer transmission match
      if (trans_norm) {
        if (a.Transmisie === trans_norm && b.Transmisie !== trans_norm) return -1
        if (b.Transmisie === trans_norm && a.Transmisie !== trans_norm) return 1
      }

      // Prefer fuel match
      if (fuel_norm) {
        if (a.Combustibil === fuel_norm && b.Combustibil !== fuel_norm) return -1
        if (b.Combustibil === fuel_norm && a.Combustibil !== fuel_norm) return 1
      }

      // Prefer year in interval
      const aInInterval = isYearInInterval(selection.year, a.Caroserie)
      const bInInterval = isYearInInterval(selection.year, b.Caroserie)
      if (aInInterval && !bInInterval) return -1
      if (bInInterval && !aInInterval) return 1

      // Tiebreak by fuel priority
      return (fuelPriority[b.Combustibil] || 0) - (fuelPriority[a.Combustibil] || 0)
    })

    finalRecord = fuelMatches[0]
  }

  // Calculate confidence
  let confidence = 0.98
  if (usedFallback1) confidence = 0.93
  if (usedFallback2) confidence = 0.88

  // Normalize SIPP code
  const normalizedSIPP = normalizeSIPPCode(finalRecord.Cod_SIPP)
  if (normalizedSIPP !== finalRecord.Cod_SIPP) {
    rationale.push(`Cod normalizat: ${finalRecord.Cod_SIPP} → ${normalizedSIPP} (ACRISS 2023)`)
  }

  return {
    sipp: normalizedSIPP,
    interval_detectat: finalRecord.Caroserie,
    confidence,
    rationale,
  }
}

// Compare SIPP codes
function compareSIPPCodes(
  customerSIPP: string,
  fleetSIPP: string,
): { matchType: "exact" | "upgrade" | "downgrade"; score: number } {
  const customerClass = customerSIPP[0]
  const fleetClass = fleetSIPP[0]
  const customerBody = customerSIPP[1]
  const fleetBody = fleetSIPP[1]
  const customerTrans = customerSIPP[3]
  const fleetTrans = fleetSIPP[3]

  const customerClassRank = SIPP_CLASS_HIERARCHY[customerClass] || 0
  const fleetClassRank = SIPP_CLASS_HIERARCHY[fleetClass] || 0

  let score = 1.0
  let matchType: "exact" | "upgrade" | "downgrade" = "exact"

  // Class comparison
  if (fleetClassRank > customerClassRank) {
    matchType = "upgrade"
    score -= 0.1 * (fleetClassRank - customerClassRank)
  } else if (fleetClassRank < customerClassRank) {
    matchType = "downgrade"
    score -= 0.2 * (customerClassRank - fleetClassRank)
  }

  // Body type comparison
  if (customerBody !== fleetBody) {
    score -= 0.05
  }

  // Transmission comparison
  if (customerTrans !== fleetTrans) {
    score -= 0.1
    if (matchType === "exact") {
      matchType = "downgrade"
    }
  }

  return { matchType, score }
}

// Validate and match fleet
export async function validateAndMatchFleet(
  selection: VehicleSelection,
  fleet: FleetVehicle[],
): Promise<ValidationResult> {
  // Find canonical SIPP
  const sippResult = await findCanonicalSIPP(selection)

  if (!sippResult) {
    throw new Error(`Nu s-a găsit codul SIPP pentru ${selection.brand} ${selection.model} (${selection.year})`)
  }

  const { sipp: canonicalSIPP, interval_detectat: yearRange, confidence, rationale, error } = sippResult

  // Match fleet vehicles
  const matches: MatchResult[] = []

  for (const vehicle of fleet) {
    const comparison = compareSIPPCodes(canonicalSIPP, vehicle.sippCode)
    const yearDelta = vehicle.year ? Math.abs(selection.year - vehicle.year) : 0
    const yearPenalty = calculateYearPenalty(yearDelta)

    const finalScore = Math.max(0, comparison.score + yearPenalty)

    matches.push({
      vehicle,
      score: finalScore,
      matchType: comparison.matchType,
      yearDelta,
      explanation: generateMatchExplanation(canonicalSIPP, vehicle.sippCode, comparison.matchType, yearDelta),
    })
  }

  // Categorize matches
  const exactMatches = matches.filter((m) => m.matchType === "exact" && m.score >= 0.9)
  const upgrades = matches.filter((m) => m.matchType === "upgrade" && m.score >= 0.7)
  const downgrades = matches.filter((m) => m.matchType === "downgrade")

  // Sort by score
  exactMatches.sort((a, b) => b.score - a.score)
  upgrades.sort((a, b) => b.score - a.score)
  downgrades.sort((a, b) => b.score - a.score)

  // Recommend best match (no downgrade)
  const recommendedVehicle = exactMatches[0] || upgrades[0] || null

  // Generate justification document
  const justificationDocument = generateJustificationDocument(
    selection,
    canonicalSIPP,
    yearRange,
    exactMatches,
    upgrades,
    downgrades,
    recommendedVehicle,
  )

  return {
    sipp: canonicalSIPP,
    interval_detectat: yearRange,
    year: selection.year,
    brand: selection.brand,
    model: selection.model,
    confidence,
    rationale,
    exactMatches,
    upgrades,
    downgrades,
    recommendedVehicle,
    document_justificativ: justificationDocument,
    error,
  }
}

// Generate match explanation
function generateMatchExplanation(
  customerSIPP: string,
  fleetSIPP: string,
  matchType: string,
  yearDelta: number,
): string {
  const parts: string[] = []

  if (matchType === "exact") {
    parts.push("Potrivire perfectă SIPP")
  } else if (matchType === "upgrade") {
    parts.push("Upgrade (clasă superioară)")
  } else {
    parts.push("Downgrade (clasă inferioară)")
  }

  if (yearDelta > 0) {
    parts.push(`Δan = ${yearDelta} ani`)
  }

  if (customerSIPP[3] !== fleetSIPP[3]) {
    parts.push("Transmisie diferită")
  }

  return parts.join(", ")
}

// Generate justification document
function generateJustificationDocument(
  selection: VehicleSelection,
  canonicalSIPP: string,
  yearRange: string,
  exactMatches: MatchResult[],
  upgrades: MatchResult[],
  downgrades: MatchResult[],
  recommended: MatchResult | null,
): string {
  const now = new Date().toISOString().split("T")[0]

  let doc = `# Justificare potrivire SIPP & alocare flotă – ${selection.brand} ${selection.model} ${selection.year}\n\n`
  doc += `**Data:** ${now}  \n`
  doc += `**Standard:** ACRISS SIPP 2023 (clasificare oficială)  \n\n`

  doc += `## 1. Identificare vehicul selectat\n\n`
  doc += `- **Marcă/Model:** ${selection.brand} ${selection.model}\n`
  doc += `- **An fabricație:** ${selection.year}\n`
  doc += `- **Atribut generațional:** ${yearRange} (interval corespunzător)\n`
  if (selection.transmission) doc += `- **Transmisie:** ${selection.transmission}\n`
  if (selection.fuel_type) doc += `- **Combustibil:** ${selection.fuel_type}\n`

  doc += `\n## 2. Determinare cod SIPP oficial\n\n`
  doc += `- **Cod SIPP:** \`${canonicalSIPP}\`\n`
  doc += `- **Determinat din:** fișierul oficial SIPP_MASTER_EXTENDED.csv\n`
  doc += `- **Argumente:**\n`
  doc += `  - **Lit.1 (${canonicalSIPP[0]}):** Clasă vehicul\n`
  doc += `  - **Lit.2 (${canonicalSIPP[1]}):** Tip caroserie\n`
  doc += `  - **Lit.3 (${canonicalSIPP[2]}):** Echipament (AC/Hybrid)\n`
  doc += `  - **Lit.4 (${canonicalSIPP[3]}):** Transmisie\n`

  doc += `\n## 3. Comparare cu flota disponibilă (inclusiv anul)\n\n`

  if (exactMatches.length > 0) {
    doc += `### Match „verde" (aceeași clasă și generație ±2 ani):\n\n`
    exactMatches.forEach((m) => {
      doc += `- **${m.vehicle.name}** (${m.vehicle.sippCode}) - Scor: ${(m.score * 100).toFixed(0)}%\n`
      doc += `  - ${m.explanation}\n`
    })
    doc += `\n`
  }

  if (upgrades.length > 0) {
    doc += `### Upgrade „albastru" (clasă superioară, generație apropiată):\n\n`
    upgrades.forEach((m) => {
      doc += `- **${m.vehicle.name}** (${m.vehicle.sippCode}) - Scor: ${(m.score * 100).toFixed(0)}%\n`
      doc += `  - ${m.explanation}\n`
    })
    doc += `\n`
  }

  if (downgrades.length > 0) {
    doc += `### Downgrade „galben" (clasă inferioară sau generație veche >5 ani):\n\n`
    downgrades.forEach((m) => {
      doc += `- **${m.vehicle.name}** (${m.vehicle.sippCode}) - Scor: ${(m.score * 100).toFixed(0)}%\n`
      doc += `  - ${m.explanation}\n`
    })
    doc += `\n`
  }

  doc += `## 4. Decizie recomandată\n\n`
  if (recommended) {
    doc += `- **Vehicul alocat:** ${recommended.vehicle.name}\n`
    doc += `- **Cod:** ${recommended.vehicle.sippCode}\n`
    doc += `- **Scor potrivire:** ${(recommended.score * 100).toFixed(0)}%\n`
    doc += `- **Justificare:** ${recommended.explanation}\n`
  } else {
    doc += `- **Nicio potrivire disponibilă** fără downgrade\n`
  }

  doc += `\n## 5. Conformitate și standardizare\n\n`
  doc += `- Clasificare conform **ACRISS (SIPP 2023)**\n`
  doc += `- Respectare politică: **fără downgrade implicit**\n`
  doc += `- Audit: ${now}, sursă: SIPP_MASTER_EXTENDED.csv\n`

  doc += `\n## 6. Observații suplimentare\n\n`
  doc += `Diferențele de generație sau transmisie sunt documentate mai sus. `
  doc += `Documentul servește ca justificare legală pentru alocarea vehiculului conform clasei ACRISS și anului de fabricație.\n`

  return doc
}

// Calculate year penalty
function calculateYearPenalty(yearDelta: number): number {
  if (yearDelta <= 2) return 0
  if (yearDelta <= 5) return -0.05
  return -0.1
}
