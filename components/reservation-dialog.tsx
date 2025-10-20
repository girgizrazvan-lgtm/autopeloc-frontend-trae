"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2, CheckCircle2 } from "lucide-react"

interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleName: string
  sessionId?: string
  userMake?: string
  userModel?: string
  userYear?: string
  userTransmission?: string
  prefilledData?: {
    city: string
    atFault: string
    serviceStartDate: string
    serviceStartTime: string
    serviceEndDate: string
    serviceEndTime: string
  } | null
}

export function ReservationDialog({
  open,
  onOpenChange,
  vehicleName,
  sessionId,
  userMake,
  userModel,
  userYear,
  userTransmission,
  prefilledData,
}: ReservationDialogProps) {
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [file, setFile] = useState<File | null>(null)

  // UI state
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Fișierul este prea mare. Dimensiunea maximă este 10MB.")
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isFormValid = clientName && clientEmail && clientPhone && file

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      setError("Te rugăm să completezi toate câmpurile obligatorii.")
      return
    }

    // Impunem politica: doar dacă atFault === "nu"
    if ((prefilledData?.atFault || "").trim().toLowerCase() !== "nu") {
      setError("Serviciul se adresează doar păgubiților (NU vinovat).")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Upload file to Blob
      let fileUrl = ""
      let blobId = ""
      if (file) {
        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Eroare la încărcarea fișierului")
        }

        const uploadData = await uploadResponse.json()
        fileUrl = uploadData.url
        blobId = uploadData.blobId || ""
        setUploading(false)
      }

      const bookingData = {
        sessionId: sessionId || `session-${Date.now()}`,
        userCar: {
          brand: userMake || "",
          model: userModel || "",
          year: userYear || "",
          transmission: userTransmission || "",
        },
        replacementCar: {
          brand: vehicleName.split(" ")[0] || "",
          model: vehicleName,
          category: "",
          sipp: "",
        },
        city: prefilledData?.city || "",
        contact: {
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
        },
        documentUrl: fileUrl,
        documentBlobId: blobId,
        atFault: (prefilledData?.atFault || "").trim().toLowerCase(),
      }

      console.log("[v0] Submitting reservation with sessionId:", sessionId)

      const response = await fetch("/api/booking/create-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Eroare la trimiterea rezervării")
      }

      const result = await response.json()
      console.log("[v0] Reservation created successfully:", result)

      setSuccess(true)

      // Reset form after 2 seconds and close dialog
      setTimeout(() => {
        resetForm()
        onOpenChange(false)
      }, 2000)
    } catch (err) {
      console.error("[v0] Reservation submission error:", err)
      setError(err instanceof Error ? err.message : "A apărut o eroare. Te rugăm să încerci din nou.")
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  const resetForm = () => {
    setClientName("")
    setClientEmail("")
    setClientPhone("")
    setFile(null)
    setSuccess(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[105] bg-black/98 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="fixed left-[50%] top-[50%] z-[110] translate-x-[-50%] translate-y-[-50%] max-w-xl w-[90vw] sm:w-[85vw] max-h-[85vh] overflow-y-auto p-0 shadow-2xl rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-50 data-[state=closed]:fade-out-0 data-[state=open]:duration-150 data-[state=closed]:duration-150">
          <DialogHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 sm:p-4 rounded-t-lg">
            <DialogTitle className="text-base sm:text-lg font-bold text-white">Rezervă {vehicleName}</DialogTitle>
            <DialogDescription className="text-white/90 text-xs mt-0.5">
              Completează datele tale de contact pentru a finaliza rezervarea.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4">
            {success ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400">Rezervare trimisă cu succes!</h3>
                <p className="text-center text-muted-foreground text-xs">
                  Vei fi contactat în curând de echipa noastră.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {prefilledData && (
                  <div className="space-y-2 p-3 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                    <h3 className="font-bold text-xs text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Detalii rezervare
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-muted-foreground font-medium">Oraș</span>
                        <span className="font-semibold text-foreground">{prefilledData.city}</span>
                      </div>
                      {prefilledData.atFault && (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-muted-foreground font-medium">Vinovat</span>
                          <span className="font-semibold text-foreground">
                            {prefilledData.atFault === "da"
                              ? "Da"
                              : prefilledData.atFault === "nu"
                              ? "Nu"
                              : "Nu știu"}
                          </span>
                        </div>
                      )}
                      {(prefilledData.serviceStartDate || prefilledData.serviceStartTime) && (
                        <div className="flex flex-col gap-0.5 sm:col-span-2">
                          <span className="text-muted-foreground font-medium">Programare reparație</span>
                          <span className="font-semibold text-foreground">
                            {formatDate(prefilledData.serviceStartDate)}
                            {prefilledData.serviceStartTime && ` la ${prefilledData.serviceStartTime}`}
                          </span>
                        </div>
                      )}
                      {(prefilledData.serviceEndDate || prefilledData.serviceEndTime) && (
                        <div className="flex flex-col gap-0.5 sm:col-span-2">
                          <span className="text-muted-foreground font-medium">Finalizare reparație</span>
                          <span className="font-semibold text-foreground">
                            {formatDate(prefilledData.serviceEndDate)}
                            {prefilledData.serviceEndTime && ` la ${prefilledData.serviceEndTime}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Date de contact
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="clientName" className="text-xs font-semibold text-foreground mb-1 block">
                        Nume complet *
                      </Label>
                      <Input
                        id="clientName"
                        type="text"
                        placeholder="Ion Popescu"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        className="h-9 text-xs bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 focus:border-teal-500 dark:focus:border-teal-400 rounded-lg transition-colors"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientEmail" className="text-xs font-semibold text-foreground mb-1 block">
                        Email *
                      </Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        placeholder="ion.popescu@email.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                        className="h-9 text-xs bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 focus:border-teal-500 dark:focus:border-teal-400 rounded-lg transition-colors"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientPhone" className="text-xs font-semibold text-foreground mb-1 block">
                        Telefon *
                      </Label>
                      <Input
                        id="clientPhone"
                        type="tel"
                        placeholder="0712345678"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                        className="h-9 text-xs bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 focus:border-teal-500 dark:focus:border-teal-400 rounded-lg transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    Notă de constatare *
                  </h3>

                  <div className="border-2 border-dashed border-teal-300 dark:border-teal-700 hover:border-teal-400 dark:hover:border-teal-600 rounded-lg p-3 transition-colors bg-teal-50/30 dark:bg-teal-950/20">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />

                    {file ? (
                      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 rounded-lg border border-teal-200 dark:border-teal-800">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
                            <Upload className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-xs">{file.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                          className="hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 h-7 w-7 p-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center cursor-pointer group py-2"
                      >
                        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-1.5 group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs font-semibold text-foreground mb-0.5">
                          Click pentru a încărca nota de constatare
                        </p>
                        <p className="text-[10px] text-muted-foreground">PDF, JPG, PNG (max 10MB)</p>
                      </label>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={submitting}
                    className="flex-1 h-9 text-xs border-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    Anulează
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isFormValid || submitting || uploading}
                    className="flex-1 h-9 text-xs bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting || uploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        {uploading ? "Se încarcă..." : "Se trimite..."}
                      </>
                    ) : (
                      "Confirmă rezervarea"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
