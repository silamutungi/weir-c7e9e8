import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'
import { Menu, X, Shield } from 'lucide-react'

const NAV_AUTH = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Settings', href: '/settings' },
  { label: 'Pricing', href: '/pricing' },
]

const NAV_PUBLIC = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Login', href: '/login' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) { setAuthed(false); return }
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s))
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  const links = authed ? NAV_AUTH : NAV_PUBLIC

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
          <Shield className="w-5 h-5" aria-hidden />
          WEIR
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} to={l.href} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ color: location.pathname === l.href ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: location.pathname === l.href ? 'rgba(30,64,175,0.08)' : 'transparent' }}>{l.label}</Link>
          ))}
          {authed ? (
            <Button size="sm" variant="outline" className="ml-3 font-semibold" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button size="sm" className="ml-3 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }} onClick={() => navigate('/signup')}>Start free</Button>
          )}
        </nav>
        <button className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} style={{ color: 'var(--color-text)' }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-4 pb-4 pt-2 space-y-1" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {links.map((l) => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium" style={{ color: location.pathname === l.href ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>{l.label}</Link>
          ))}
          {authed ? (
            <button onClick={() => { handleLogout(); setOpen(false) }} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium" style={{ color: 'var(--color-error)' }}>Logout</button>
          ) : (
            <Link to="/signup" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>Start free</Link>
          )}
        </div>
      )}
    </header>
  )
}
