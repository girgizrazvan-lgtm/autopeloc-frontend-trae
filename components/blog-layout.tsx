"use client"

import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface BlogLayoutProps {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  url: string
  children: ReactNode
  relatedArticles?: Array<{
    title: string
    url: string
    description: string
  }>
}

// Custom SVG icon components
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

export function BlogLayout({
  title,
  description,
  date,
  readTime,
  category,
  url,
  children,
  relatedArticles = [],
}: BlogLayoutProps) {
  const baseUrl = "https://autopeloc.ro"
  const fullUrl = `${baseUrl}${url}`
  const ogImage = `${baseUrl}/images/dashboard.jpg`

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: ogImage,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: "autopeloc.ro",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "autopeloc.ro",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    articleSection: category,
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: fullUrl,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Înapoi la blog
          </Link>

          <Badge variant="secondary" className="mb-4">
            {category}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">{title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={date}>
                {new Date(date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          <div className="mb-8 pb-8 border-b">
            <ShareButtons url={url} title={title} description={description} />
          </div>

          <div className="blog-article-content">{children}</div>

          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">Alte articole recomandate</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.url}
                    className="block p-6 border rounded-lg hover:border-teal-500 transition-colors group"
                  >
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t">
            <ShareButtons url={url} title={title} description={description} />
          </div>

          <div className="mt-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ai nevoie de ajutor?</h3>
            <p className="text-lg mb-6 leading-relaxed">
              Beneficiază de servicii transparente și conforme cu noile reglementări, vezi cu exactitate ce mașină ți se
              poate oferi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0790743974" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full">
                  <Phone className="mr-2 h-5 w-5" />
                  Sună acum: 0790 743 974
                </Button>
              </a>
              <Link href="/#hero-form" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-white text-teal-600 hover:bg-gray-100 dark:bg-white dark:text-teal-600 dark:hover:bg-gray-100 border-white dark:border-white"
                >
                  Completează formularul
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Înapoi la toate articolele
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
