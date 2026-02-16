import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import './InvestorSection.css'

/* ─── animated counter ─── */
function AnimatedNumber({ value, suffix = '', prefix = '', duration = 2 }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!inView) return
        const target = parseFloat(value)
        const start = performance.now()
        const dur = duration * 1000
        const step = (now) => {
            const t = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - t, 4) // easeOutQuart
            setDisplay(Math.round(eased * target * 10) / 10)
            if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [inView, value, duration])

    return (
        <span ref={ref} className="animated-number">
            {prefix}{display % 1 === 0 ? Math.round(display) : display.toFixed(1)}{suffix}
        </span>
    )
}

/* ─── comparison table data ─── */
const COMPETITORS = [
    {
        name: 'MetalMatcher',
        highlight: true,
        speed: '670K pairs/sec',
        f1: '97.7%',
        cost: 'Free / Local',
        gpu: true,
        privacy: true,
        zeroConfig: true,
    },
    {
        name: 'Tamr',
        speed: 'Slow',
        f1: '~90%',
        cost: '$50K–500K/yr',
        gpu: false,
        privacy: false,
        zeroConfig: false,
    },
    {
        name: 'Senzing',
        speed: 'Medium',
        f1: '~85%',
        cost: '$37K+/yr',
        gpu: false,
        privacy: true,
        zeroConfig: false,
    },
    {
        name: 'GPT-4o',
        speed: '~50 pairs/sec',
        f1: '~87%',
        cost: '$500–2K/1M pairs',
        gpu: false,
        privacy: false,
        zeroConfig: true,
    },
]

export default function InvestorSection() {
    const ref = useRef(null)

    return (
        <section className="section investor-section" id="investors" ref={ref}>
            <div className="dot-grid-bg"></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* ── Header ── */}
                <div className="section-center animate-on-scroll">
                    <p className="section-label">For Investors</p>
                    <h2 className="section-title">A $2–3B+ Market.{' '}
                        <span className="gradient-text">One Clear Gap.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Entity matching is mission-critical infrastructure for every company with data.
                        No one has brought GPU-accelerated compute to this market — until now.
                    </p>
                </div>

                {/* ── Market Stats ── */}
                <div className="investor-stats animate-on-scroll">
                    {[
                        { value: 3, prefix: '$', suffix: 'B+', label: 'Total Addressable Market' },
                        { value: 30, suffix: '%', label: 'YoY Market Growth' },
                        { value: 64, suffix: '%', label: 'Enterprises Cite Poor Data Quality' },
                        { value: 670, suffix: 'K', label: 'Pairs/sec Throughput' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            className="investor-stat-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <AnimatedNumber value={s.value} suffix={s.suffix} prefix={s.prefix || ''} />
                            <p>{s.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Competitive Positioning ── */}
                <div className="comp-table-wrap animate-on-scroll">
                    <h3 className="comp-table-title">Competitive Positioning</h3>
                    <div className="comp-table-scroll">
                        <table className="comp-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Speed</th>
                                    <th>Accuracy (F1)</th>
                                    <th>Cost</th>
                                    <th>GPU-Native</th>
                                    <th>Data Privacy</th>
                                    <th>Zero Config</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPETITORS.map((c, i) => (
                                    <motion.tr
                                        key={i}
                                        className={c.highlight ? 'highlight-row' : ''}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                    >
                                        <td className="comp-name">{c.name}</td>
                                        <td>{c.speed}</td>
                                        <td>{c.f1}</td>
                                        <td>{c.cost}</td>
                                        <td>{c.gpu ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                                        <td>{c.privacy ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                                        <td>{c.zeroConfig ? <span className="check-yes">✓</span> : <span className="check-no">✗</span>}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── Why Now ── */}
                <div className="why-now-section animate-on-scroll">
                    <h3 className="why-now-title">Why Now?</h3>
                    <div className="why-now-grid">
                        {[
                            {
                                icon: '⚡',
                                title: 'The GPU Gap',
                                desc: 'Entity matching is an embarrassingly parallel N² problem — but the entire industry still runs on CPUs. The first to bring GPU compute to EM at the kernel level owns the category.',
                                accent: '#818cf8',
                            },
                            {
                                icon: '💰',
                                title: 'Cost Disruption',
                                desc: 'Incumbents charge $50K–500K/year because alternatives don\'t exist. A solution that\'s 10× cheaper AND faster triggers mass migration. The Databricks playbook.',
                                accent: '#34d399',
                            },
                            {
                                icon: '🔒',
                                title: 'Privacy Tailwind',
                                desc: 'Post-GDPR/HIPAA world: "your data never leaves your infrastructure" is a selling point worth millions. LLM-based competitors send your data to the cloud.',
                                accent: '#a78bfa',
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                className="why-now-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                            >
                                <div className="why-now-icon-wrap" style={{ '--card-accent': card.accent }}>
                                    <span className="why-now-icon">{card.icon}</span>
                                </div>
                                <h4>{card.title}</h4>
                                <p>{card.desc}</p>
                                <div className="why-now-accent-line" style={{ background: card.accent }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
