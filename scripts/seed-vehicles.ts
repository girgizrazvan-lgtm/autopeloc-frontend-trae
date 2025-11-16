import { PrismaClient } from "@prisma/client"
import { carClasses, getAllCars } from "../lib/fleet-data"
import { extractBrandAndModel } from "../lib/vehicle-utils"

const prisma = new PrismaClient()

async function main() {
  console.log("🚗 Starting vehicle migration...")

  try {
    // Get all cars from all categories
    const allCars = getAllCars()

    console.log(`📊 Found ${allCars.length} vehicles to migrate`)

    let orderCounter = 0
    let successCount = 0
    let skipCount = 0

    // Iterate through categories to maintain order
    for (const category of carClasses) {
      for (const car of category.cars) {
        const { brand, model } = extractBrandAndModel(car.name)

        // Map transmission from "Manual" / "Automat" / "Manual / Automat" to simpler format
        const transmission = car.specs.transmission?.includes("Automat") ? "Automat" : "Manual"

        // Extract engine from specs
        const engine = car.specs.engine || null

        // Extract seats
        const seats = car.specs.seats || null

        // Extract fuel
        const fuel = car.specs.fuel || null

        // Determine ACRISS code (from category)
        const acrissCode = category.acrissCode || null

        try {
          // Check if vehicle already exists (by name or sippCode)
          const existing = await prisma.vehicle.findFirst({
            where: {
              OR: [{ name: car.name }, { sippCode: car.sippCode }],
            },
          })

          if (existing) {
            console.log(`⏭️  Skipping ${car.name} (already exists)`)
            skipCount++
            continue
          }

          // Create vehicle
          await prisma.vehicle.create({
            data: {
              name: car.name,
              brand: brand,
              model: model,
              image: car.image || null,
              sippCode: car.sippCode,
              category: category.title,
              acrissCode: acrissCode,
              engine: engine,
              transmission: transmission,
              seats: seats,
              fuel: fuel,
              order: orderCounter++,
              isActive: true,
            },
          })

          console.log(`✅ Migrated: ${car.name} (${brand} ${model})`)
          successCount++
        } catch (error: any) {
          console.error(`❌ Error migrating ${car.name}:`, error.message)
        }
      }
    }

    console.log("\n📈 Migration Summary:")
    console.log(`   ✅ Successfully migrated: ${successCount}`)
    console.log(`   ⏭️  Skipped (already exist): ${skipCount}`)
    console.log(`   📊 Total processed: ${allCars.length}`)
    console.log("\n🎉 Vehicle migration completed!")
  } catch (error: any) {
    console.error("❌ Migration failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error("Fatal error:", e)
    process.exit(1)
  })

