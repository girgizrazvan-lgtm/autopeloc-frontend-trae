import fs from "fs"
import path from "path"

type SVGItem = { path: string; name: string }

function collectSVGs(root: string, baseUrl = ""): SVGItem[] {
  const entries = fs.readdirSync(root, { withFileTypes: true })
  const items: SVGItem[] = []
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subdir = path.join(root, entry.name)
      const subUrl = baseUrl ? `${baseUrl}/${entry.name}` : entry.name
      items.push(...collectSVGs(subdir, subUrl))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".svg")) {
      const urlPath = baseUrl ? `/${baseUrl}/${entry.name}` : `/${entry.name}`
      items.push({ path: urlPath, name: entry.name })
    }
  }
  return items
}

export default function SVGPreviewPage() {
  const publicDir = path.join(process.cwd(), "public")
  const svgs = collectSVGs(publicDir)

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Preview SVG-uri ({svgs.length})</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Toate fișierele .svg din <code>public/</code> și subfoldere.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {svgs.map((item) => (
          <div key={item.path} className="border rounded-lg p-3 bg-card">
            <div className="relative aspect-[4/3] bg-muted rounded-md overflow-hidden flex items-center justify-center">
              <img src={item.path} alt={item.name} loading="lazy" decoding="async" className="object-contain max-h-full p-2" />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground break-all">{item.path}</div>
          </div>
        ))}
      </div>
    </main>
  )
}