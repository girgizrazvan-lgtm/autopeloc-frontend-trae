import { prisma } from "@/lib/db"
import { generateSlug } from "@/lib/slug-utils"

/**
 * Generate a unique slug by appending a number if the slug already exists
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  let baseSlug = generateSlug(title)
  let slug = baseSlug
  let counter = 1

  try {
    while (true) {
      const existing = await prisma.blogPost.findUnique({
        where: { slug },
        select: { id: true },
      })

      // If slug doesn't exist, or it's the same post we're updating, we can use it
      if (!existing || (excludeId && existing.id === excludeId)) {
        return slug
      }

      // Slug exists, try with a number suffix
      slug = `${baseSlug}-${counter}`
      counter++

      // Safety check to prevent infinite loop
      if (counter > 1000) {
        throw new Error("Nu s-a putut genera un slug unic. Te rugăm să schimbi titlul.")
      }
    }
  } catch (error: any) {
    // If table doesn't exist, just return the base slug
    if (error?.code === "P2021" || error?.message?.includes("does not exist") || error?.message?.includes("Unknown model")) {
      console.warn("Blog posts table does not exist. Using base slug without uniqueness check.")
      return baseSlug
    }
    throw error
  }
}

