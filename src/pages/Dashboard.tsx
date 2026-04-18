import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { type Detection, type EarningsRecord } from '../types'
import Navbar from '../components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Shield, DollarSign, AlertTriangle, TrendingUp, RefreshCcw, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { formatCurrency, formatRelative } from '../lib/utils'

const SEED_DETECTIONS: Detection[] = [
  { id: '1', user_id: 'demo', platform: 'Instagram', content_url: '#', thumbnail_url: '', detected_at: new Date(Date.now() - 3600000).toISOString(), risk_level: 'critical', status: 'pending', match_confidence: 98, created_at: new Date().toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'TikTok', content_url: '#', thumbnail_url: '', detected_at: new Date(Date.now() - 7200000).toISOString(), risk_level: 'high', status: 'pending', match_confidence: 91, created_at: new Date().toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'YouTube', content_url: '#', thumbnail_url: '', detected_at: new Date(Date.now() - 86400000).toISOString(), risk_level: 'medium', status: 'monetized', match_confidence: 84, created_at: new Date().toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'Twitter', content_url: '#', thumbnail_url: '', detected_at: new Date(Date.now() - 172800000).toISOString(), risk_level: 'low', status: 'approved', match_confidence: 72, created_at: new Date().toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Facebook', content_url: '#', thumbnail_url: '', detected_at: new Date(Date.now() - 259200000).toISOString(), risk_level: 'high', status: 'takedown', match_confidence: 95, created_at: new Date().toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'LinkedIn', content_url: '#', thumbnail_url: '', detected_at: new Date(Date.now() - 345600000).toISOString(), risk_level: 'low', status: 'approved', match_confidence: 68, created_at: new Date().toISOString(), deleted_at: null },
]

const SEED_EARNINGS: EarningsRecord[] = [
  { id: 'e1', user_id: 'demo', platform: 'YouTube', amount: 1240.50, cpm: 4.20, impressions: 295357, period_start: '2024-05-01', period_end: '2024-05-31', created_at: new Date().toISOString(), deleted_at: null },
  { id: 'e2', user_id: 'demo', platform: 'TikTok', amount: 820.00, cpm: 2.80, impressions: 292857, period_start: '2024-05-01', period_end: '2024-05-31', created_at: new Date().toISOString(), deleted_at: null },
  { id: 'e3', user_id: 'demo', platform: 'Instagram', amount: 560.75, cpm: 5.10, impressions: 109951, period_start: '2024-05-01', period_end: '2024-05-31', created_at: new Date().toISOString(), deleted_at: null },
]

const riskColor: Record<string, string> = { critical: 'var(--color-error)', high: 'var(--color-warning)', medium: 'var(--color-info)', low: 'var(--color-success)' }
const statusLabel: Record<string, string> = { pending: 'Pending', approved: 'Approved', takedown: 'Taken down', monetized: 'Monetized' }

export default function Dashboard() {
  const [detections, setDetections] = useState<Detection[]>([])
  const [earnings, setEarnings] = useState<EarningsRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchData() {
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setDetections(SEED_DETECTIONS); setEarnings(SEED_EARNINGS); setLoading(false) }, 600)
      return
    }
    try {
      const [dRes, eRes] = await Promise.all([
        (supabase.from('weir_detections').select('*').is('deleted_at', null).order('detected_at', { ascending: false }) as any),
        (supabase.from('weir_earnings').select('*').is('deleted_at', null).order('period_start', { ascending: false }) as any),
      ])
      if (dRes.error) throw new Error(dRes.error.message)
      if (eRes.error) throw new Error(eRes.error.message)
      setDetections(dRes.data ?? [])
      setEarnings(eRes.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  async function handleAction(id: string, status: Detection['status']) {
    setActionLoading(id)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setDetections(prev => prev.map(d => d.id === id ? { ...d, status } : d)); setActionLoading(null) }, 500)
      return
    }
    await (supabase.from('weir_detections').update({ status } as any).eq('id', id) as any)
    setDetections(prev => prev.map(d => d.id === id ? { ...d, status } : d))
    setActionLoading(null)
  }

  const totalEarnings = earnings.reduce((s, e) => s + e.amount, 0)
  const pendingCount = detections.filter(d => d.status === 'pending').length
  const protectionScore = detections.length === 0 ? 100 : Math.max(40, 100 - pendingCount * 8)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {!isSupabaseConfigured && (
          <div className="mb-6 rounded-lg px-4 py-3 text-sm font-medium" style={{ backgroundColor: 'rgba(6,182,212,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(6,182,212,0.25)' }}>
            Viewing sample data — connect your database to go live.
          </div>
        )}
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Dashboard</h1>

        {loading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-primary)' }} />
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center py-20 gap-4 text-center">
            <AlertTriangle className="w-10 h-10" style={{ color: 'var(--color-error)' }} />
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>Something went wrong</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            <Button variant="outline" onClick={fetchData} className="gap-2"><RefreshCcw className="w-4 h-4" />Retry</Button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Protection Score', value: `${protectionScore}%`, icon: <Shield className="w-5 h-5" />, color: protectionScore >= 80 ? 'var(--color-success)' : protectionScore >= 60 ? 'var(--color-warning)' : 'var(--color-error)' },
                { label: 'Total Earnings', value: formatCurrency(totalEarnings), icon: <DollarSign className="w-5 h-5" />, color: 'var(--color-primary)' },
                { label: 'Pending Alerts', value: String(pendingCount), icon: <AlertTriangle className="w-5 h-5" />, color: pendingCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' },
                { label: 'Detections', value: String(detections.length), icon: <TrendingUp className="w-5 h-5" />, color: 'var(--color-info)' },
              ].map((m) => (
                <Card key={m.label} className="card-hover">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-center gap-2 mb-2" style={{ color: m.color }}>{m.icon}<span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>{m.label}</span></div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{m.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Content Detections</h2>
                {detections.length === 0 ? (
                  <div className="rounded-xl border p-10 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                    <Shield className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-success)' }} />
                    <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>No detections yet</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR is actively scanning for unauthorized use of your identity.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {detections.slice(0, 6).map((d) => (
                      <div key={d.id} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{d.platform}</span>
                              <Badge style={{ backgroundColor: riskColor[d.risk_level] + '18', color: riskColor[d.risk_level], border: `1px solid ${riskColor[d.risk_level]}40` }}>{d.risk_level}</Badge>
                            </div>
                            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{d.match_confidence}% match &middot; {formatRelative(d.detected_at)}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0 text-xs">{statusLabel[d.status]}</Badge>
                        </div>
                        {d.status === 'pending' && (
                          <div className="flex gap-2 flex-wrap">
                            <Button size="sm" className="h-8 text-xs gap-1" disabled={actionLoading === d.id} onClick={() => handleAction(d.id, 'takedown')} style={{ backgroundColor: 'var(--color-error)', color: '#fff' }}>
                              {actionLoading === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}Takedown
                            </Button>
                            <Button size="sm" className="h-8 text-xs gap-1" disabled={actionLoading === d.id} onClick={() => handleAction(d.id, 'monetized')} style={{ backgroundColor: 'var(--color-success)', color: '#fff' }}>
                              {actionLoading === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <DollarSign className="w-3 h-3" />}Monetize
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" disabled={actionLoading === d.id} onClick={() => handleAction(d.id, 'approved')}>
                              {actionLoading === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Earnings by Platform</h2>
                {earnings.length === 0 ? (
                  <div className="rounded-xl border p-10 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                    <DollarSign className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>No earnings recorded yet</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Monetize your first detected content to start tracking earnings here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {earnings.map((e) => (
                      <Card key={e.id} className="card-hover">
                        <CardHeader className="pb-1 pt-4">
                          <CardTitle className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{e.platform}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{formatCurrency(e.amount)}</p>
                              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>CPM: {formatCurrency(e.cpm)} &middot; {new Intl.NumberFormat(undefined).format(e.impressions)} impressions</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
