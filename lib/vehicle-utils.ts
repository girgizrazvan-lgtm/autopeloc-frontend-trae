/**
 * Extracts brand and model from a vehicle name
 * Handles formats like: "VW Golf", "Dacia Sandero Stepway", "Toyota Aygo X", "Škoda Fabia"
 */
export function extractBrandAndModel(name: string): { brand: string; model: string } {
  if (!name || typeof name !== "string") {
    return { brand: "", model: "" }
  }

  const trimmedName = name.trim()

  // Common brand names (must be in order of longest to shortest for better matching)
  const brands = [
    "Škoda",
    "Mercedes",
    "Volkswagen",
    "Audi",
    "BMW",
    "Toyota",
    "Dacia",
    "Renault",
    "Peugeot",
    "Citroen",
    "Opel",
    "Ford",
    "VW",
    "Fiat",
    "Seat",
    "Hyundai",
    "Kia",
    "Mazda",
    "Nissan",
    "Suzuki",
  ]

  // Try to match brand from the beginning
  for (const brand of brands) {
    if (trimmedName.toLowerCase().startsWith(brand.toLowerCase())) {
      const brandLength = brand.length
      const remaining = trimmedName.substring(brandLength).trim()

      // If there's remaining text, it's the model
      if (remaining) {
        return {
          brand: brand,
          model: remaining,
        }
      } else {
        // Only brand name provided
        return {
          brand: brand,
          model: "",
        }
      }
    }
  }

  // If no brand match, split by first space
  const firstSpaceIndex = trimmedName.indexOf(" ")
  if (firstSpaceIndex > 0) {
    return {
      brand: trimmedName.substring(0, firstSpaceIndex),
      model: trimmedName.substring(firstSpaceIndex + 1).trim(),
    }
  }

  // Fallback: entire name as brand, empty model
  return {
    brand: trimmedName,
    model: "",
  }
}

