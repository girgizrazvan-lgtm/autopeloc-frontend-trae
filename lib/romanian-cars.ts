export interface CarMake {
  id: string
  name: string
}

export interface CarModel {
  id: string
  name: string
  makeId: string
}

export const ROMANIAN_CAR_MAKES: CarMake[] = [
  { id: "dacia", name: "Dacia" },
  { id: "renault", name: "Renault" },
  { id: "volkswagen", name: "Volkswagen" },
  { id: "ford", name: "Ford" },
  { id: "opel", name: "Opel" },
  { id: "skoda", name: "Škoda" },
  { id: "bmw", name: "BMW" },
  { id: "mercedes", name: "Mercedes-Benz" },
  { id: "audi", name: "Audi" },
  { id: "toyota", name: "Toyota" },
  { id: "hyundai", name: "Hyundai" },
  { id: "kia", name: "Kia" },
  { id: "peugeot", name: "Peugeot" },
  { id: "citroen", name: "Citroën" },
  { id: "nissan", name: "Nissan" },
  { id: "mazda", name: "Mazda" },
  { id: "honda", name: "Honda" },
  { id: "seat", name: "SEAT" },
  { id: "fiat", name: "Fiat" },
  { id: "volvo", name: "Volvo" },
  { id: "suzuki", name: "Suzuki" },
  { id: "mitsubishi", name: "Mitsubishi" },
  { id: "chevrolet", name: "Chevrolet" },
  { id: "alfa-romeo", name: "Alfa Romeo" },
  { id: "jeep", name: "Jeep" },
  { id: "land-rover", name: "Land Rover" },
  { id: "mini", name: "Mini" },
  { id: "porsche", name: "Porsche" },
  { id: "tesla", name: "Tesla" },
  { id: "altele", name: "Altele" },
].sort((a, b) => a.name.localeCompare(b.name))

export const ROMANIAN_CAR_MODELS: CarModel[] = [
  // Dacia
  { id: "dacia-sandero", name: "Sandero", makeId: "dacia" },
  { id: "dacia-logan", name: "Logan", makeId: "dacia" },
  { id: "dacia-duster", name: "Duster", makeId: "dacia" },
  { id: "dacia-spring", name: "Spring", makeId: "dacia" },
  { id: "dacia-jogger", name: "Jogger", makeId: "dacia" },
  { id: "dacia-lodgy", name: "Lodgy", makeId: "dacia" },
  { id: "dacia-dokker", name: "Dokker", makeId: "dacia" },

  // Renault
  { id: "renault-clio", name: "Clio", makeId: "renault" },
  { id: "renault-megane", name: "Megane", makeId: "renault" },
  { id: "renault-captur", name: "Captur", makeId: "renault" },
  { id: "renault-kadjar", name: "Kadjar", makeId: "renault" },
  { id: "renault-scenic", name: "Scenic", makeId: "renault" },
  { id: "renault-talisman", name: "Talisman", makeId: "renault" },
  { id: "renault-koleos", name: "Koleos", makeId: "renault" },
  { id: "renault-zoe", name: "Zoe", makeId: "renault" },

  // Volkswagen
  { id: "vw-golf", name: "Golf", makeId: "volkswagen" },
  { id: "vw-polo", name: "Polo", makeId: "volkswagen" },
  { id: "vw-passat", name: "Passat", makeId: "volkswagen" },
  { id: "vw-tiguan", name: "Tiguan", makeId: "volkswagen" },
  { id: "vw-touran", name: "Touran", makeId: "volkswagen" },
  { id: "vw-t-roc", name: "T-Roc", makeId: "volkswagen" },
  { id: "vw-t-cross", name: "T-Cross", makeId: "volkswagen" },
  { id: "vw-taigo", name: "Taigo", makeId: "volkswagen" },
  { id: "vw-arteon", name: "Arteon", makeId: "volkswagen" },
  { id: "vw-id3", name: "ID.3", makeId: "volkswagen" },
  { id: "vw-id4", name: "ID.4", makeId: "volkswagen" },

  // Ford
  { id: "ford-fiesta", name: "Fiesta", makeId: "ford" },
  { id: "ford-focus", name: "Focus", makeId: "ford" },
  { id: "ford-mondeo", name: "Mondeo", makeId: "ford" },
  { id: "ford-kuga", name: "Kuga", makeId: "ford" },
  { id: "ford-puma", name: "Puma", makeId: "ford" },
  { id: "ford-ecosport", name: "EcoSport", makeId: "ford" },
  { id: "ford-mustang", name: "Mustang", makeId: "ford" },

  // Opel
  { id: "opel-corsa", name: "Corsa", makeId: "opel" },
  { id: "opel-astra", name: "Astra", makeId: "opel" },
  { id: "opel-insignia", name: "Insignia", makeId: "opel" },
  { id: "opel-crossland", name: "Crossland", makeId: "opel" },
  { id: "opel-grandland", name: "Grandland", makeId: "opel" },
  { id: "opel-mokka", name: "Mokka", makeId: "opel" },

  // Skoda
  { id: "skoda-fabia", name: "Fabia", makeId: "skoda" },
  { id: "skoda-octavia", name: "Octavia", makeId: "skoda" },
  { id: "skoda-superb", name: "Superb", makeId: "skoda" },
  { id: "skoda-karoq", name: "Karoq", makeId: "skoda" },
  { id: "skoda-kodiaq", name: "Kodiaq", makeId: "skoda" },
  { id: "skoda-kamiq", name: "Kamiq", makeId: "skoda" },
  { id: "skoda-scala", name: "Scala", makeId: "skoda" },

  // BMW
  { id: "bmw-seria-1", name: "Seria 1", makeId: "bmw" },
  { id: "bmw-seria-2", name: "Seria 2", makeId: "bmw" },
  { id: "bmw-seria-3", name: "Seria 3", makeId: "bmw" },
  { id: "bmw-seria-4", name: "Seria 4", makeId: "bmw" },
  { id: "bmw-seria-5", name: "Seria 5", makeId: "bmw" },
  { id: "bmw-seria-7", name: "Seria 7", makeId: "bmw" },
  { id: "bmw-x1", name: "X1", makeId: "bmw" },
  { id: "bmw-x3", name: "X3", makeId: "bmw" },
  { id: "bmw-x5", name: "X5", makeId: "bmw" },

  // Mercedes
  { id: "mercedes-a-class", name: "Clasa A", makeId: "mercedes" },
  { id: "mercedes-b-class", name: "Clasa B", makeId: "mercedes" },
  { id: "mercedes-c-class", name: "Clasa C", makeId: "mercedes" },
  { id: "mercedes-e-class", name: "Clasa E", makeId: "mercedes" },
  { id: "mercedes-s-class", name: "Clasa S", makeId: "mercedes" },
  { id: "mercedes-gla", name: "GLA", makeId: "mercedes" },
  { id: "mercedes-glc", name: "GLC", makeId: "mercedes" },
  { id: "mercedes-gle", name: "GLE", makeId: "mercedes" },

  // Audi
  { id: "audi-a1", name: "A1", makeId: "audi" },
  { id: "audi-a3", name: "A3", makeId: "audi" },
  { id: "audi-a4", name: "A4", makeId: "audi" },
  { id: "audi-a5", name: "A5", makeId: "audi" },
  { id: "audi-a6", name: "A6", makeId: "audi" },
  { id: "audi-q2", name: "Q2", makeId: "audi" },
  { id: "audi-q3", name: "Q3", makeId: "audi" },
  { id: "audi-q5", name: "Q5", makeId: "audi" },
  { id: "audi-q7", name: "Q7", makeId: "audi" },

  // Toyota
  { id: "toyota-yaris", name: "Yaris", makeId: "toyota" },
  { id: "toyota-corolla", name: "Corolla", makeId: "toyota" },
  { id: "toyota-camry", name: "Camry", makeId: "toyota" },
  { id: "toyota-rav4", name: "RAV4", makeId: "toyota" },
  { id: "toyota-c-hr", name: "C-HR", makeId: "toyota" },
  { id: "toyota-highlander", name: "Highlander", makeId: "toyota" },

  // Hyundai
  { id: "hyundai-i10", name: "i10", makeId: "hyundai" },
  { id: "hyundai-i20", name: "i20", makeId: "hyundai" },
  { id: "hyundai-i30", name: "i30", makeId: "hyundai" },
  { id: "hyundai-tucson", name: "Tucson", makeId: "hyundai" },
  { id: "hyundai-kona", name: "Kona", makeId: "hyundai" },
  { id: "hyundai-santa-fe", name: "Santa Fe", makeId: "hyundai" },

  // Kia
  { id: "kia-picanto", name: "Picanto", makeId: "kia" },
  { id: "kia-rio", name: "Rio", makeId: "kia" },
  { id: "kia-ceed", name: "Ceed", makeId: "kia" },
  { id: "kia-sportage", name: "Sportage", makeId: "kia" },
  { id: "kia-niro", name: "Niro", makeId: "kia" },
  { id: "kia-sorento", name: "Sorento", makeId: "kia" },

  // Peugeot
  { id: "peugeot-208", name: "208", makeId: "peugeot" },
  { id: "peugeot-308", name: "308", makeId: "peugeot" },
  { id: "peugeot-508", name: "508", makeId: "peugeot" },
  { id: "peugeot-2008", name: "2008", makeId: "peugeot" },
  { id: "peugeot-3008", name: "3008", makeId: "peugeot" },
  { id: "peugeot-5008", name: "5008", makeId: "peugeot" },

  // Citroen
  { id: "citroen-c3", name: "C3", makeId: "citroen" },
  { id: "citroen-c4", name: "C4", makeId: "citroen" },
  { id: "citroen-c5", name: "C5", makeId: "citroen" },
  { id: "citroen-berlingo", name: "Berlingo", makeId: "citroen" },

  // Nissan
  { id: "nissan-micra", name: "Micra", makeId: "nissan" },
  { id: "nissan-juke", name: "Juke", makeId: "nissan" },
  { id: "nissan-qashqai", name: "Qashqai", makeId: "nissan" },
  { id: "nissan-x-trail", name: "X-Trail", makeId: "nissan" },
  { id: "nissan-leaf", name: "Leaf", makeId: "nissan" },

  // Mazda
  { id: "mazda-2", name: "2", makeId: "mazda" },
  { id: "mazda-3", name: "3", makeId: "mazda" },
  { id: "mazda-6", name: "6", makeId: "mazda" },
  { id: "mazda-cx-3", name: "CX-3", makeId: "mazda" },
  { id: "mazda-cx-5", name: "CX-5", makeId: "mazda" },
  { id: "mazda-cx-30", name: "CX-30", makeId: "mazda" },

  // Honda
  { id: "honda-jazz", name: "Jazz", makeId: "honda" },
  { id: "honda-civic", name: "Civic", makeId: "honda" },
  { id: "honda-accord", name: "Accord", makeId: "honda" },
  { id: "honda-cr-v", name: "CR-V", makeId: "honda" },
  { id: "honda-hr-v", name: "HR-V", makeId: "honda" },

  // SEAT
  { id: "seat-ibiza", name: "Ibiza", makeId: "seat" },
  { id: "seat-leon", name: "Leon", makeId: "seat" },
  { id: "seat-arona", name: "Arona", makeId: "seat" },
  { id: "seat-ateca", name: "Ateca", makeId: "seat" },
  { id: "seat-tarraco", name: "Tarraco", makeId: "seat" },

  // Fiat
  { id: "fiat-500", name: "500", makeId: "fiat" },
  { id: "fiat-panda", name: "Panda", makeId: "fiat" },
  { id: "fiat-tipo", name: "Tipo", makeId: "fiat" },
  { id: "fiat-500x", name: "500X", makeId: "fiat" },

  // Volvo
  { id: "volvo-v40", name: "V40", makeId: "volvo" },
  { id: "volvo-v60", name: "V60", makeId: "volvo" },
  { id: "volvo-v90", name: "V90", makeId: "volvo" },
  { id: "volvo-xc40", name: "XC40", makeId: "volvo" },
  { id: "volvo-xc60", name: "XC60", makeId: "volvo" },
  { id: "volvo-xc90", name: "XC90", makeId: "volvo" },

  // Suzuki
  { id: "suzuki-swift", name: "Swift", makeId: "suzuki" },
  { id: "suzuki-vitara", name: "Vitara", makeId: "suzuki" },
  { id: "suzuki-s-cross", name: "S-Cross", makeId: "suzuki" },

  // Mitsubishi
  { id: "mitsubishi-asx", name: "ASX", makeId: "mitsubishi" },
  { id: "mitsubishi-outlander", name: "Outlander", makeId: "mitsubishi" },
  { id: "mitsubishi-eclipse", name: "Eclipse Cross", makeId: "mitsubishi" },

  // Chevrolet
  { id: "chevrolet-spark", name: "Spark", makeId: "chevrolet" },
  { id: "chevrolet-aveo", name: "Aveo", makeId: "chevrolet" },
  { id: "chevrolet-cruze", name: "Cruze", makeId: "chevrolet" },

  // Alfa Romeo
  { id: "alfa-giulietta", name: "Giulietta", makeId: "alfa-romeo" },
  { id: "alfa-giulia", name: "Giulia", makeId: "alfa-romeo" },
  { id: "alfa-stelvio", name: "Stelvio", makeId: "alfa-romeo" },

  // Jeep
  { id: "jeep-renegade", name: "Renegade", makeId: "jeep" },
  { id: "jeep-compass", name: "Compass", makeId: "jeep" },
  { id: "jeep-cherokee", name: "Cherokee", makeId: "jeep" },
  { id: "jeep-wrangler", name: "Wrangler", makeId: "jeep" },

  // Land Rover
  { id: "lr-discovery", name: "Discovery", makeId: "land-rover" },
  { id: "lr-range-rover", name: "Range Rover", makeId: "land-rover" },
  { id: "lr-evoque", name: "Range Rover Evoque", makeId: "land-rover" },

  // Mini
  { id: "mini-cooper", name: "Cooper", makeId: "mini" },
  { id: "mini-countryman", name: "Countryman", makeId: "mini" },
  { id: "mini-clubman", name: "Clubman", makeId: "mini" },

  // Porsche
  { id: "porsche-911", name: "911", makeId: "porsche" },
  { id: "porsche-cayenne", name: "Cayenne", makeId: "porsche" },
  { id: "porsche-macan", name: "Macan", makeId: "porsche" },
  { id: "porsche-panamera", name: "Panamera", makeId: "porsche" },

  // Tesla
  { id: "tesla-model-3", name: "Model 3", makeId: "tesla" },
  { id: "tesla-model-s", name: "Model S", makeId: "tesla" },
  { id: "tesla-model-x", name: "Model X", makeId: "tesla" },
  { id: "tesla-model-y", name: "Model Y", makeId: "tesla" },
]

export function getModelsForMake(makeId: string): CarModel[] {
  return ROMANIAN_CAR_MODELS.filter((model) => model.makeId === makeId).sort((a, b) => a.name.localeCompare(b.name))
}

export const romanianCars: Record<string, string[]> = ROMANIAN_CAR_MAKES.reduce(
  (acc, make) => {
    const models = ROMANIAN_CAR_MODELS.filter((model) => model.makeId === make.id)
      .map((model) => model.name)
      .sort((a, b) => a.localeCompare(b.name))

    acc[make.name] = models
    return acc
  },
  {} as Record<string, string[]>,
)
