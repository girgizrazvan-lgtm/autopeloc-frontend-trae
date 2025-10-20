import { NextResponse } from "next/server"

export async function GET() {
  try {
    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIPP_COMMERCIAL_EXTENDED_FIXED-lFVtShGcnRHycy2w31N5Pi5j1WrF5u.csv"

    const response = await fetch(csvUrl)
    const csvText = await response.text()

    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(";")

    const brandIndex = headers.indexOf("Brand")
    const modelIndex = headers.indexOf("Model")

    if (brandIndex === -1 || modelIndex === -1) {
      return NextResponse.json({ error: "Brand or Model column not found in CSV" }, { status: 400 })
    }

    // Extract unique brands and models
    const brandsSet = new Set<string>()
    const modelsMap = new Map<string, Set<string>>()

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(";")
      const brand = values[brandIndex]?.trim()
      const model = values[modelIndex]?.trim()

      if (brand && model) {
        brandsSet.add(brand)

        if (!modelsMap.has(brand)) {
          modelsMap.set(brand, new Set())
        }
        modelsMap.get(brand)!.add(model)
      }
    }

    // Convert to arrays for JSON response
    const brands = Array.from(brandsSet).sort()
    const modelsData: Record<string, string[]> = {}

    brands.forEach((brand) => {
      modelsData[brand] = Array.from(modelsMap.get(brand) || []).sort()
    })

    return NextResponse.json({
      totalBrands: brands.length,
      totalModels: Array.from(modelsMap.values()).reduce((sum, set) => sum + set.size, 0),
      totalRecords: lines.length - 1,
      brands,
      modelsData,
    })
  } catch (error) {
    console.error("Error syncing car data:", error)
    return NextResponse.json({ error: "Failed to sync car data" }, { status: 500 })
  }
}
