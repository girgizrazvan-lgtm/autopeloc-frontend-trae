"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface QuickReserveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleName: string
  onContinue: (prefilled: {
    city: string
    atFault: string
    serviceStartDate: string
    serviceStartTime: string
    serviceEndDate: string
    serviceEndTime: string
  }) => void
}

const cities = [
  "București",
  "Cluj-Napoca",
  "Timișoara",
  "Brașov",
  "Iași",
  "Oradea",
  "Constanța",
  "Sibiu",
  "Craiova",
  "Suceava",
  "Bacău",
]

export function QuickReserveDialog({ open, onOpenChange, vehicleName, onContinue }: QuickReserveDialogProps) {
  const [city, setCity] = useState("")
  const [atFault, setAtFault] = useState("")

  const isFormValid = city && atFault

  const handleContinue = () => {
    if (!isFormValid) return
    onContinue({
      city,
      atFault,
      serviceStartDate: "",
      serviceStartTime: "",
      serviceEndDate: "",
      serviceEndTime: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-[110] translate-x-[-50%] translate-y-[-50%] max-w-lg w-[90vw] sm:w-[85vw] max-h-[85vh] overflow-y-auto p-0 shadow-2xl rounded-lg">
        <DialogHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-t-lg">
          <DialogTitle className="text-base sm:text-lg font-bold text-white">Rezervă {vehicleName}</DialogTitle>
          <DialogDescription className="text-white/90 text-xs mt-0.5">
            Completează datele inițiale, la fel ca în formularul din pagina principală.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground mb-1 uppercase tracking-wider">Oraș</label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full h-10 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium transition-colors">
                <SelectValue placeholder="Selectează orașul" />
              </SelectTrigger>
              <SelectContent side="bottom">
                {cities.map((cityName) => (
                  <SelectItem key={cityName} value={cityName}>
                    {cityName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground mb-1 uppercase tracking-wider">Ești vinovat de accident?</label>
            <Select value={atFault} onValueChange={setAtFault}>
              <SelectTrigger className="w-full h-10 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium transition-colors">
                <SelectValue placeholder="Selectează" />
              </SelectTrigger>
              <SelectContent side="bottom">
                <SelectItem value="nu">Nu</SelectItem>
                <SelectItem value="da">Da</SelectItem>
                <SelectItem value="nu-stiu">Nu știu</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground">Serviciul se adresează păgubiților (NU vinovat).</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 h-9 text-xs border-2 hover:bg-gray-50 dark:hover:bg-gray-900"
              onClick={() => onOpenChange(false)}
            >
              Închide
            </Button>
            <Button
              disabled={!isFormValid}
              className="flex-1 h-9 text-xs bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleContinue}
            >
              Continuă
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}