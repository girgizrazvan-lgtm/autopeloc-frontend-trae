import Papa from "papaparse"

// OCR result structure
export interface TalonOCRResult {
  nume_prenume_pagubit: string
  data_avizarii: string
  marca: string
  model: string

  // Validation fields
  validare_status: "VALID" | "NEVALID"
  validare_observatie: string
  categorie_comerciala?: string
  cod_sipp_comercial?: string
  acriss_oficial?: string
  comentariu?: string

  suggested_lookup?: {
    brand: string
    model: string
    year: number
  }
}

interface CSVRow {
  Brand: string
  Model: string
  Ani_fabricatie: string // Year range like "2005–2012"
  Caroserie: string
  Transmisie: string
  Combustibil: string
  Categorie_Comerciala: string
  Cod_SIPP_Comercial: string
  SIPP_ACRISS_Oficial: string
  Comentariu: string
}

// Normalize text: remove diacritics, lowercase, trim
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

// Parse year interval from CSV (e.g., "2005–2012" or "2005-2012")
function parseYearInterval(interval: string): { start: number; end: number } | null {
  const match = interval.match(/(\d{4})[–-](\d{4})/)
  if (match) {
    return { start: Number.parseInt(match[1]), end: Number.parseInt(match[2]) }
  }
  return null
}

// Check if year is in interval
function isYearInInterval(year: number, interval: string): boolean {
  const parsed = parseYearInterval(interval)
  if (!parsed) return false
  return year >= parsed.start && year <= parsed.end
}

// Validate against commercial database
async function validateInCommercialDB(
  marca: string,
  model: string,
  anFabricatie: string,
  transmisie?: string,
): Promise<{
  status: "VALID" | "NEVALID"
  observatie: string
  categorie_comerciala?: string
  cod_sipp_comercial?: string
  acriss_oficial?: string
  comentariu?: string
}> {
  try {
    console.log("[v0] Validating in commercial DB:", { marca, model, anFabricatie, transmisie })

    // Fetch CSV
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIPP_COMMERCIAL_EXTENDED_FIXED-qKmEbpj6TZYvjQuSP366laUsayhszj.csv",
    )
    const csvText = await response.text()

    // Parse CSV
    const parsed = Papa.parse<CSVRow>(csvText, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
    })

    console.log("[v0] CSV parsed:", parsed.data.length, "rows")

    if (!parsed.data || parsed.data.length === 0) {
      return {
        status: "NEVALID",
        observatie: "Baza comercială nu a putut fi încărcată.",
      }
    }

    // Normalize search terms
    const brandNorm = normalize(marca)
    const modelNorm = normalize(model)
    const year = Number.parseInt(anFabricatie)

    if (!brandNorm || !modelNorm || isNaN(year)) {
      return {
        status: "NEVALID",
        observatie: "Date incomplete pentru validare (marcă, model sau an lipsă).",
      }
    }

    console.log("[v0] Searching for:", { brandNorm, modelNorm, year })

    // Find matching rows
    const matches = parsed.data.filter((row) => {
      const rowBrand = normalize(row.Brand)
      const rowModel = normalize(row.Model)

      // Brand must match exactly
      if (rowBrand !== brandNorm) return false

      // Model must match (exact or partial)
      if (rowModel !== modelNorm && !rowModel.includes(modelNorm) && !modelNorm.includes(rowModel)) return false

      // Year must be in interval (Ani_fabricatie contains the year range)
      if (!isYearInInterval(year, row.Ani_fabricatie)) return false

      // If transmission is provided, try to match
      if (transmisie) {
        const transNorm = normalize(transmisie)
        const rowTrans = normalize(row.Transmisie)
        // Allow partial match for transmission
        if (!rowTrans.includes(transNorm) && !transNorm.includes(rowTrans)) return false
      }

      return true
    })

    console.log("[v0] Found matches:", matches.length)

    if (matches.length === 0) {
      return {
        status: "NEVALID",
        observatie: "Model neidentificat în baza comercială. Verificare manuală necesară.",
      }
    }

    // Use first match
    const match = matches[0]

    console.log("[v0] Using match:", {
      brand: match.Brand,
      model: match.Model,
      category: match.Categorie_Comerciala,
      sipp: match.Cod_SIPP_Comercial,
    })

    return {
      status: "VALID",
      observatie: "Model identificat în baza comercială.",
      categorie_comerciala: match.Categorie_Comerciala,
      cod_sipp_comercial: match.Cod_SIPP_Comercial,
      acriss_oficial: match.SIPP_ACRISS_Oficial,
      comentariu: `Potrivire completă pe brand+model+interval ${match.Ani_fabricatie}`,
    }
  } catch (error) {
    console.error("[v0] Error validating in commercial DB:", error)
    return {
      status: "NEVALID",
      observatie: "Eroare la validarea în baza comercială.",
    }
  }
}

export async function processTalonAuto(
  fileFront: File | null,
  fileBack?: File,
  sourceCity?: string,
  operator?: string,
  // Manual entry fields for nota de constatare
  nume_prenume_pagubit?: string,
  data_avizarii?: string,
  marca?: string,
  model?: string,
): Promise<TalonOCRResult> {
  console.log("[v0] Processing nota de constatare with manual entry...")

  // If manual entry is provided, use it directly
  if (marca && model && data_avizarii) {
    console.log("[v0] Using manual entry:", { nume_prenume_pagubit, data_avizarii, marca, model })

    // Extract year from data_avizarii (format: YYYY-MM-DD)
    const year = new Date(data_avizarii).getFullYear()

    const validation = await validateInCommercialDB(marca, model, year.toString())

    const result: TalonOCRResult = {
      nume_prenume_pagubit: nume_prenume_pagubit || "",
      data_avizarii: data_avizarii,
      marca,
      model,
      validare_status: validation.status,
      validare_observatie: validation.observatie,
      categorie_comerciala: validation.categorie_comerciala,
      cod_sipp_comercial: validation.cod_sipp_comercial,
      acriss_oficial: validation.acriss_oficial,
      comentariu: validation.comentariu,
    }

    if (validation.status === "VALID") {
      result.suggested_lookup = {
        brand: marca,
        model: model,
        year: year,
      }
    }

    return result
  }

  // If no manual entry, return error
  return {
    nume_prenume_pagubit: "",
    data_avizarii: "",
    marca: "",
    model: "",
    validare_status: "NEVALID",
    validare_observatie: "Te rog completează datele manual pentru validare.",
  }
}
