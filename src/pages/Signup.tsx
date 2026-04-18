import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: authError } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    setSuccess(true)
  }

  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Check your email</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
        <Link to="/login" className="mt-6 inline-block font-semibold underline" style={{ color: 'var(--color-primary)' }}>Back to login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl border p-10" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-primary)' }}>WEIR</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Create your account</h1>
          <p className="mb-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Free forever. No credit card required.</p>
          {error && (
            <div className="flex items-center gap-2 rounded-lg p-3 mb-6 text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full font-semibold h-11" disabled={loading} style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account...</> : 'Start free'}
            </Button>
          </form>
          <p className="mt-6 text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>Already have an account? <Link to="/login" className="font-semibold underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
