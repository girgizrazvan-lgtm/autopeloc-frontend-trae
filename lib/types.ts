export type SIPPCode =
  | "MCMR"
  | "MDMR"
  | "NBMH"
  | "HDMR"
  | "EDAR" // Economy
  | "CDMR"
  | "EGMR"
  | "DDMR"
  | "CDAR"
  | "EGAR"
  | "DDAR" // Compact
  | "CGMR"
  | "SFMR"
  | "FFNR"
  | "CGAR"
  | "SPAR" // Crossover
  | "CWMR" // Estate
  | "GFBR"
  | "PLAR" // SUV
  | "FVMR" // Monovolum
  | "XMMR" // VAN 8 seats
  | "XKMD" // Utility VAN
  | "PFAR" // Small SUV Luxury
  | "LFBR" // Medium SUV Luxury

export type VehicleCategory =
  | "Economy"
  | "Compact"
  | "Crossover"
  | "Estate"
  | "SUV"
  | "Monovolum"
  | "VAN 8 seats"
  | "Utility VAN"
  | "Small SUV Luxury"
  | "Medium SUV Luxury"

export interface VehicleProfile {
  brand: string
  model: string
  year: number
  transmission: "Manual" | "Automat"
  sippCode: SIPPCode
  category: VehicleCategory
  confidence: number
}
