import { useEffect, useState, type FormEvent } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'

const CREATOR_TYPES = ['Influencer', 'Athlete', 'Musician', 'Artist', 'Public Figure', 'Other']

export default function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [creatorType, setCreatorType] = useState('Influencer')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [profileId, setProfileId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      if (!isSupabaseConfigured) {
        setTimeout(() => { setDisplayName('Demo Creator'); setCreatorType('Influencer'); setLoading(false) }, 400)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const res = await (supabase.from('weir_profiles').select('*').eq('user_id', session.user.id).single() as any)
      if (res.data) {
        setDisplayName(res.data.display_name ?? '')
        setCreatorType(res.data.creator_type ?? 'Influencer')
        setProfileId(res.data.id)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setSaving(false); setSuccess(true) }, 600)
      return
    }
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setError('Not authenticated'); setSaving(false); return }
    if (profileId) {
      const res = await (supabase.from('weir_profiles').update({ display_name: displayName, creator_type: creatorType } as any).eq('id', profileId) as any)
      if (res.error) { setError(res.error.message); setSaving(false); return }
    } else {
      const res = await (supabase.from('weir_profiles').insert({ user_id: session.user.id, display_name: displayName, creator_type: creatorType, protection_score: 100, total_earnings: 0, plan: 'free' } as any) as any)
      if (res.error) { setError(res.error.message); setSaving(false); return }
    }
    setSaving(false)
    setSuccess(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Settings</h1>
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-primary)' }} />
          </div>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>Profile</CardTitle></CardHeader>
              <CardContent>
                {error && (
                  <div className="flex items-center gap-2 rounded-lg p-3 mb-5 text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden />{error}
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 rounded-lg p-3 mb-5 text-sm" style={{ backgroundColor: 'rgba(22,163,74,0.08)', color: 'var(--color-success)', border: '1px solid rgba(22,163,74,0.2)' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden />Profile saved successfully.
                  </div>
                )}
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display name</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your public name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creatorType">Creator type</Label>
                    <select id="creatorType" value={creatorType} onChange={(e) => setCreatorType(e.target.value)} className="w-full h-10 rounded-md border px-3 text-sm" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                      {CREATOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <Button type="submit" disabled={saving} className="font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
                    {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : 'Save changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base font-semibold" style={{ color: 'var(--color-error)' }}>Danger zone</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Deleting your account removes all your data permanently. This action cannot be undone.</p>
                <Button variant="destructive" type="button" className="font-semibold">Delete account</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
