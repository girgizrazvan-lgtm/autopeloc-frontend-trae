import https from 'https'

const CSV_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIPP_COMMERCIAL_EXTENDED_FIXED-lFVtShGcnRHycy2w31N5Pi5j1WrF5u.csv'

console.log('Fetching CSV from:', CSV_URL)

https.get(CSV_URL, (res) => {
  let data = ''
  
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    console.log('CSV fetched successfully. Parsing...\n')
    
    // Parse CSV (semicolon-delimited)
    const lines = data.split('\n').filter(line => line.trim())
    const headers = lines[0].split(';')
    
    console.log('Headers:', headers)
    console.log('Total rows:', lines.length - 1)
    
    // Extract unique brands and models
    const brandModels = new Map()
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';')
      const brand = values[0]?.trim()
      const model = values[1]?.trim()
      
      if (brand && model) {
        if (!brandModels.has(brand)) {
          brandModels.set(brand, new Set())
        }
        brandModels.get(brand).add(model)
      }
    }
    
    console.log('\n=== BRANDS AND MODELS ===\n')
    console.log(`Total unique brands: ${brandModels.size}`)
    
    // Generate TypeScript code
    console.log('\n=== GENERATED CODE FOR lib/romanian-cars.ts ===\n')
    console.log('export const ROMANIAN_CAR_MAKES = [')
    
    const sortedBrands = Array.from(brandModels.keys()).sort()
    sortedBrands.forEach((brand, index) => {
      const models = Array.from(brandModels.get(brand)).sort()
      console.log(`  {`)
      console.log(`    id: "${index + 1}",`)
      console.log(`    name: "${brand}",`)
      console.log(`    models: [`)
      models.forEach((model, modelIndex) => {
        console.log(`      { id: "${index + 1}-${modelIndex + 1}", name: "${model}" },`)
      })
      console.log(`    ],`)
      console.log(`  },`)
    })
    
    console.log(']')
    
    console.log('\n=== SUMMARY ===')
    console.log(`Total brands: ${brandModels.size}`)
    let totalModels = 0
    brandModels.forEach(models => totalModels += models.size)
    console.log(`Total models: ${totalModels}`)
  })
}).on('error', (err) => {
  console.error('Error fetching CSV:', err.message)
})
