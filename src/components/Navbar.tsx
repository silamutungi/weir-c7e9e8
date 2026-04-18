import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'
import { Shield } from 'lucide-react'

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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) { setAuthed(false); return }
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!drawerOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [drawerOpen])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  async function handleLogout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  const links = authed ? NAV_AUTH : NAV_PUBLIC

  return (
    <>
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
            <Shield className="w-5 h-5" aria-hidden />
            WEIR
          </Link>

          {/* Desktop nav — unchanged, md+ only */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: location.pathname === l.href ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  backgroundColor: location.pathname === l.href ? 'rgba(30,64,175,0.08)' : 'transparent'
                }}
              >
                {l.label}
              </Link>
            ))}
            {authed ? (
              <Button size="sm" variant="outline" className="ml-3 font-semibold" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button size="sm" className="ml-3 font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }} onClick={() => navigate('/signup')}>Start free</Button>
            )}
          </nav>

          {/* Hamburger button — below md only */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-11 h-11 rounded-lg gap-1.5"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            style={{ color: 'var(--color-text)' }}
          >
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-200"
              style={{ backgroundColor: 'var(--color-text)' }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-200"
              style={{ backgroundColor: 'var(--color-text)' }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-200"
              style={{ backgroundColor: 'var(--color-text)' }}
            />
          </button>
        </div>
      </header>

      {/* Overlay backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.48)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />

      {/* Slide-in drawer — below md only */}
      <div
        ref={drawerRef}
        className="md:hidden fixed top-0 right-0 h-full z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderLeft: '1px solid var(--color-border)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: drawerOpen ? '-8px 0 32px rgba(15,23,42,0.16)' : 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 h-16 border-b flex-shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg"
            style={{ color: 'var(--color-primary)' }}
            onClick={() => setDrawerOpen(false)}
          >
            <Shield className="w-5 h-5" aria-hidden />
            WEIR
          </Link>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {/* X icon via SVG for clean dependency */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {links.map((l) => {
            const isActive = location.pathname === l.href
            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: isActive ? 'rgba(30,64,175,0.08)' : 'transparent',
                }}
              >
                {/* Flame active indicator */}
                {isActive && (
                  <span
                    className="flex-shrink-0 w-1 h-5 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    aria-hidden
                  />
                )}
                {!isActive && <span className="flex-shrink-0 w-1 h-5" aria-hidden />}
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer CTA */}
        <div
          className="px-5 py-5 border-t flex-shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {authed ? (
            <button
              onClick={() => { handleLogout(); setDrawerOpen(false) }}
              className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors"
              style={{ color: 'var(--color-error)', backgroundColor: 'rgba(220,38,38,0.07)' }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              onClick={() => setDrawerOpen(false)}
              className="block w-full px-4 py-3 rounded-xl text-sm font-semibold text-center transition-colors"
              style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
            >
              Start free
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
