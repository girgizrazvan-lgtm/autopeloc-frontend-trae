"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const Link2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
)

const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s9 3.582 9 8z"
    />
  </svg>
)

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fullUrl = `https://autopeloc.ro${url}`
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = description ? encodeURIComponent(description) : ""

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-foreground/70">Distribuie articolul:</p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors bg-transparent"
          onClick={() => window.open(shareLinks.facebook, "_blank")}
        >
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-black hover:text-white hover:border-black transition-colors bg-transparent"
          onClick={() => window.open(shareLinks.twitter, "_blank")}
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">X</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors bg-transparent"
          onClick={() => window.open(shareLinks.linkedin, "_blank")}
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors bg-transparent"
          onClick={() => window.open(shareLinks.whatsapp, "_blank")}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-colors bg-transparent"
          onClick={() => window.open(shareLinks.email, "_blank")}
        >
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Email</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-colors bg-transparent"
          onClick={copyToClipboard}
        >
          <Link2 className="h-4 w-4" />
          <span className="hidden sm:inline">{copied ? "Copiat!" : "Copiază link"}</span>
        </Button>
      </div>
    </div>
  )
}
