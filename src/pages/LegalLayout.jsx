import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'

export default function LegalLayout({ title, updated, children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-divider bg-surface">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Taylor Plumbing & Heating" className="h-10 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent lift-on-hover">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter mb-3">{title}</h1>
        <p className="text-muted text-sm mb-12">Last updated: {updated}</p>
        <div className="space-y-6 text-ink/80 leading-relaxed">{children}</div>
      </main>
      <footer className="border-t border-divider">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-6 text-xs text-muted">
          © {new Date().getFullYear()} Taylor Plumbing &amp; Heating Installation Ltd, Norwich.
        </div>
      </footer>
    </div>
  )
}

export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink mb-2">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
