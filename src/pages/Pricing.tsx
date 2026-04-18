import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

const plans = [
  { name: 'Free', price: 0, desc: 'Get started — no credit card needed.', features: ['5 monitored platforms', 'Weekly scan report', 'Manual takedown requests', 'Basic protection score', 'Email alerts'], cta: 'Start free', highlight: false },
  { name: 'Creator', price: 29, desc: 'For full-time creators ready to protect and monetize.', features: ['25 monitored platforms', 'Real-time alerts', 'One-tap enforcement', 'CPM earnings dashboard', 'License templates (3)', 'Priority email support'], cta: 'Start free', highlight: true },
  { name: 'Pro', price: 99, desc: 'For public figures and agencies managing multiple creators.', features: ['Unlimited platforms', 'Priority enforcement & legal escalation', 'Advanced trend insights', 'Unlimited license templates', 'Dedicated account manager', 'Custom compliance reports'], cta: 'Start free', highlight: false },
]

const faqs = [
  { q: 'How does WEIR detect unauthorized content?', a: 'WEIR uses a combination of AI image recognition, text matching, and social media API integrations to scan platforms for unauthorized use of your identity.' },
  { q: 'What happens when I tap Takedown?', a: 'WEIR automatically files a platform-compliant DMCA notice on your behalf and tracks compliance. No manual forms, no legal jargon.' },
  { q: 'How do earnings get paid out?', a: 'Monetized content generates license fees that flow into your WEIR earnings wallet. Payouts are issued monthly via bank transfer or PayPal.' },
  { q: 'Is WEIR only for athletes?', a: 'No — WEIR protects any creator: influencers, musicians, artists, podcasters, and public figures across all industries.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel before your next billing cycle and you will not be charged. Your data is retained for 90 days after cancellation.' },
]

export default function Pricing() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Simple, transparent pricing</h1>
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>No hidden fees. You keep 100% of what you earn.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {plans.map((p) => (
                <div key={p.name} className={`rounded-xl border p-8 flex flex-col ${p.highlight ? 'ring-2 ring-blue-600' : ''}`} style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  {p.highlight && <Badge className="self-start mb-4" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Most popular</Badge>}
                  <p className="font-bold text-xl mb-1" style={{ color: 'var(--color-text)' }}>{p.name}</p>
                  <p className="font-bold mb-2" style={{ fontSize: '2.25rem', color: 'var(--color-text)', lineHeight: '1' }}>{p.price === 0 ? 'Free' : `$${p.price}`}{p.price > 0 && <span className="text-base font-normal" style={{ color: 'var(--color-text-secondary)' }}>/mo</span>}</p>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{p.desc}</p>
                  <ul className="flex-1 space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <span className="mt-0.5 font-bold" style={{ color: 'var(--color-success)' }}>&#10003;</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => navigate('/signup')} className="w-full font-semibold" variant={p.highlight ? 'default' : 'outline'} style={p.highlight ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : {}}>{p.cta}</Button>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--color-text)' }}>Frequently asked questions</h2>
              <div className="space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.q} className="rounded-xl border p-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                    <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{faq.q}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
