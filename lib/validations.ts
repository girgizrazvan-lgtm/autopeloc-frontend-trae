import { z } from "zod"

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(1, "Parola este obligatorie"),
})

// Password reset validation
export const passwordResetRequestSchema = z.object({
  email: z.string().email("Email invalid"),
})

export const passwordResetSchema = z.object({
  token: z.string().min(1, "Token-ul este obligatoriu"),
  newPassword: z.string().min(8, "Parola trebuie să aibă minim 8 caractere"),
})

// Blog post validation
export const blogPostSchema = z.object({
  title: z.string().min(1, "Titlul este obligatoriu").max(200, "Titlul este prea lung"),
  description: z.string().min(1, "Descrierea este obligatorie").max(300, "Descrierea este prea lungă"),
  content: z.string().min(1, "Conținutul este obligatoriu"),
  excerpt: z.string().max(500, "Rezumatul este prea lung").optional(),
  category: z.string().min(1, "Categoria este obligatorie").max(100),
  readTime: z.string().max(20).optional(),
  keywords: z.string().max(200).optional(),
  isPublished: z.boolean().optional().default(true),
  ogImage: z.string().url("URL invalid pentru imagine").optional().or(z.literal("")),
})

// FAQ validation
export const faqSchema = z.object({
  question: z.string().min(1, "Întrebarea este obligatorie").max(300, "Întrebarea este prea lungă"),
  answer: z.string().min(1, "Răspunsul este obligatoriu"),
  order: z.number().int().min(0).optional().default(0),
  isActive: z.boolean().optional().default(true),
})

// Vehicle validation
export const vehicleSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu").max(100),
  brand: z.string().min(1, "Brand-ul este obligatoriu").max(50),
  model: z.string().min(1, "Modelul este obligatoriu").max(50),
  year: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 1900 && Number(val) <= 2100), {
      message: "Anul trebuie să fie între 1900 și 2100",
    })
    .transform((val) => (val ? Number(val) : null)),
  image: z.string().url("URL invalid pentru imagine").optional().or(z.literal("")),
  sippCode: z.string().min(1, "Cod SIPP este obligatoriu").max(10),
  category: z.string().min(1, "Categoria este obligatorie").max(50),
  acrissCode: z.string().max(20).optional(),
  engine: z.string().max(100).optional(),
  transmission: z.string().max(50).optional(),
  seats: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 20), {
      message: "Numărul de locuri trebuie să fie între 1 și 20",
    })
    .transform((val) => (val ? Number(val) : null)),
  fuel: z.string().max(50).optional(),
  order: z.number().int().min(0).optional().default(0),
  isActive: z.boolean().optional().default(true),
})

// About section validation
export const aboutSectionSchema = z.object({
  section: z.string().min(1, "Numele secțiunii este obligatoriu").max(50),
  title: z.string().max(200).optional(),
  content: z.string().min(1, "Conținutul este obligatoriu"),
  order: z.number().int().min(0).optional().default(0),
})

