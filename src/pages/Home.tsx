import { useNavigate } from 'react-router-dom'
import { Shield, TrendingUp, Zap, DollarSign, Eye, FileText } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  { icon: <Eye className="w-8 h-8" />, title: 'Real-Time Detection', desc: 'AI-powered scanning across 50+ platforms detects unauthorized use of your identity in seconds, not days.' },
  { icon: <Zap className="w-8 h-8" />, title: 'One-Tap Enforcement', desc: 'Skip the 20-step DMCA process. Approve, monetize, or take down detected content with a single tap.' },
  { icon: <DollarSign className="w-8 h-8" />, title: 'Earnings Dashboard', desc: 'See CPM breakdowns by platform, track pending payments, and understand exactly where your money comes from.' },
  { icon: <FileText className="w-8 h-8" />, title: 'License Templates', desc: 'Build reusable license agreements with platform-specific terms and monetization controls built in.' },
  { icon: <Shield className="w-8 h-8" />, title: 'Protection Score', desc: 'Your personal risk index — updated daily to show how well your identity is shielded across the web.' },
  { icon: <TrendingUp className="w-8 h-8" />, title: 'Trend Insights', desc: 'Know when infringement spikes before it becomes a crisis. Predictive alerts keep you ahead of bad actors.' },
]

const tiers = [
  { name: 'Free', price: 0, features: ['5 monitored platforms', 'Weekly scan report', 'Manual takedown requests', 'Basic protection score'], cta: 'Start free', highlight: false },
  { name: 'Creator', price: 29, features: ['25 monitored platforms', 'Real-time alerts', 'One-tap enforcement', 'CPM earnings dashboard', 'License templates (3)'], cta: 'Start free', highlight: true },
  { name: 'Pro', price: 99, features: ['Unlimited platforms', 'Priority enforcement', 'Advanced trend insights', 'Unlimited license templates', 'Dedicated account manager'], cta: 'Start free', highlight: false },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMGF0JTIwYSUyMHNsZWVrJTIwZGVzayUyMHdpdGglMjBtdWx0aXBsZSUyMHNjcmVlbnMlMjBkaXxlbnwwfDB8fHwxNzc2NTAxNjkxfDA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100svh',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(15,23,42,0.55) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <Badge className="mb-6 text-xs font-semibold tracking-widest uppercase" variant="outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Identity Rights Platform</Badge>
          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '720px' }}>
            Stop losing money to unauthorized use of your identity.
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '520px', lineHeight: '1.65' }}>
            WEIR detects, enforces, and monetizes every use of your name, image, and likeness — automatically. Built for creators, influencers, athletes, and public figures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate('/signup')} className="text-base font-semibold px-8 py-4 h-auto" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              Get your dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/pricing')} className="text-base font-semibold px-8 py-4 h-auto" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' }}>
              See pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>Everything your rights require</h2>
          <p className="mb-16 text-lg" style={{ color: 'var(--color-text-secondary)' }}>From detection to dollars — WEIR handles the entire lifecycle of your identity on the internet.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-hover rounded-xl border p-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                <h3 className="font-semibold mb-2 text-base" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }} id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Simple, outcome-based pricing</h2>
          <p className="mb-16 text-lg" style={{ color: 'var(--color-text-secondary)' }}>No hidden fees. No confusing royalty splits. You keep what you earn.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div key={t.name} className={`rounded-xl border p-8 flex flex-col ${t.highlight ? 'ring-2' : ''}`} style={{ backgroundColor: 'var(--color-bg)', borderColor: t.highlight ? 'var(--color-primary)' : 'var(--color-border)', ...(t.highlight ? { ringColor: 'var(--color-primary)' } : {}) }}>
                {t.highlight && <Badge className="self-start mb-4" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Most popular</Badge>}
                <p className="font-bold text-xl mb-1" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                <p className="font-bold mb-6" style={{ fontSize: '2.5rem', color: 'var(--color-text)', lineHeight: '1' }}>{t.price === 0 ? 'Free' : `$${t.price}`}{t.price > 0 && <span className="text-base font-normal" style={{ color: 'var(--color-text-secondary)' }}>/mo</span>}</p>
                <ul className="flex-1 space-y-3 mb-8">
                  {t.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="mt-0.5 font-bold" style={{ color: 'var(--color-success)' }}>&#10003;</span>{feat}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => navigate('/signup')} className="w-full font-semibold" style={t.highlight ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : {}} variant={t.highlight ? 'default' : 'outline'}>{t.cta}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
