"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Check, X, ArrowLeft, Loader2 } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setError("Token lipsă sau invalid")
    }
  }, [token])

  const validatePassword = (pwd: string) => {
    return pwd.length >= 8
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!token) {
      setError("Token lipsă")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc")
      setLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setError("Parola trebuie să aibă minim 8 caractere")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/admin/login")
        }, 3000)
      } else {
        setError(data.error || "Eroare la resetarea parolei")
      }
    } catch (error) {
      setError("Eroare la resetarea parolei")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Card className="w-full max-w-md shadow-2xl border-2 border-green-200 dark:border-green-800">
          <div className="h-1 bg-gradient-to-r from-green-500 to-teal-500" />
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-300">
              Parolă Resetată!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Parola ta a fost resetată cu succes. Vei fi redirecționat la pagina de login...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/login">
              <Button className="w-full" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Mergi la Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-2 border-teal-100 dark:border-teal-900">
        <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500" />

        <CardHeader className="space-y-1 text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Resetare Parolă
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Introduce o parolă nouă pentru contul tău de admin
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!token ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Token invalid sau lipsă
                </p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Link-ul de resetare parolă nu este valid sau a expirat.
                </p>
              </div>
              <Link href="/admin/login">
                <Button className="w-full" variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi la Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Parolă Nouă
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minim 8 caractere"
                  required
                  disabled={loading}
                  className="h-11 border-teal-200 dark:border-teal-800 focus:border-teal-500 focus:ring-teal-500"
                />
                {password && (
                  <div className="flex items-center gap-2 text-xs">
                    {validatePassword(password) ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">Parola este validă</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 text-red-600" />
                        <span className="text-red-600">Minim 8 caractere necesare</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmă Parola
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Reintrodu parola"
                  required
                  disabled={loading}
                  className="h-11 border-teal-200 dark:border-teal-800 focus:border-teal-500 focus:ring-teal-500"
                />
                {confirmPassword && password && (
                  <div className="flex items-center gap-2 text-xs">
                    {password === confirmPassword ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">Parolele se potrivesc</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 text-red-600" />
                        <span className="text-red-600">Parolele nu se potrivesc</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                disabled={loading || !password || !confirmPassword || password !== confirmPassword}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Se procesează...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Resetează Parola
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/admin/login"
                  className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Înapoi la Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

