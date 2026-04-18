import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t py-12" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" style={{ color: 'var(--color-primary)' }} aria-hidden />
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Identity Rights Platform</span>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/login" className="hover:underline">Sign in</Link>
          <Link to="/signup" className="hover:underline">Sign up</Link>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
