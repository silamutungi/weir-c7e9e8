import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthed(false)
      setChecking(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
      setChecking(false)
    })
  }, [])

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-primary)' }} />
    </div>
  )

  if (!isSupabaseConfigured) return <>{children}</>
  if (!authed) return <Navigate to="/login" replace />
  return <>{children}</>
}
