import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import './DistributedArchitecture.css'

/* ═══════════════════════════════════════════════════════
   DISTRIBUTED ARCHITECTURE — Cinematic Pipeline Animation
   ═══════════════════════════════════════════════════════ */

const STAGES = [
    { key: 'split', label: 'Distributing Data', color: '#818cf8', duration: 2000 },
    { key: 'block', label: 'GPU Blocking', color: '#818cf8', duration: 2500 },
    { key: 'feature', label: 'Feature Extraction', color: '#a78bfa', duration: 2500 },
    { key: 'predict', label: 'Prediction & Scoring', color: '#34d399', duration: 2000 },
    { key: 'merge', label: 'Merging Results', color: '#34d399', duration: 2000 },
]

/* ── Animated glowing particle that travels along a path ── */
function Particle({ pathRef, delay = 0, duration = 1.5, color = '#818cf8', size = 4, reverse = false }) {
    const circleRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const path = pathRef.current
        const circle = circleRef.current
        if (!path || !circle) return

        const totalLength = path.getTotalLength()
        let startTime = null
        let animId = null

        const timeout = setTimeout(() => {
            setVisible(true)
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp
                const elapsed = timestamp - startTime
                const progress = Math.min(elapsed / (duration * 1000), 1)
                const eased = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2
                const dist = reverse ? totalLength * (1 - eased) : totalLength * eased
                const point = path.getPointAtLength(dist)
                circle.setAttribute('cx', point.x)
                circle.setAttribute('cy', point.y)
                circle.setAttribute('opacity', progress < 0.1 ? progress * 10 : progress > 0.85 ? (1 - progress) * 6.67 : 1)
                if (progress < 1) {
                    animId = requestAnimationFrame(animate)
                } else {
                    setVisible(false)
                }
            }
            animId = requestAnimationFrame(animate)
        }, delay)

        return () => { clearTimeout(timeout); if (animId) cancelAnimationFrame(animId) }
    }, [pathRef, delay, duration, reverse])

    return (
        <circle
            ref={circleRef}
            r={size}
            fill={color}
            opacity={0}
            filter="url(#particleGlow)"
            style={{ display: visible ? 'block' : 'none' }}
        />
    )
}

/* ── Worker node card rendered in HTML overlay ── */
function WorkerCard({ index, activeStage, inView }) {
    const stageColors = {
        split: '#818cf8',
        block: '#818cf8',
        feature: '#a78bfa',
        predict: '#34d399',
        merge: '#34d399',
    }
    const processing = ['block', 'feature', 'predict'].includes(activeStage)
    const currentColor = stageColors[activeStage]

    return (
        <motion.div
            className="worker-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * index }}
        >
            <div className="worker-card-inner">
                <div className="worker-header">
                    <div className="worker-gpu-badge">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="2" y="2" width="10" height="10" rx="2" stroke="#818cf8" strokeWidth="1.5" />
                            <rect x="4" y="4" width="6" height="6" rx="1" fill="#818cf8" opacity="0.4" />
                        </svg>
                        <span>GPU {index + 1}</span>
                    </div>
                    <motion.div
                        className="worker-status-dot"
                        animate={{
                            backgroundColor: processing ? currentColor : 'rgba(99,102,241,0.3)',
                            boxShadow: processing ? `0 0 8px ${currentColor}` : '0 0 0px transparent',
                        }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                {/* mini pipeline inside each worker */}
                <div className="worker-pipeline">
                    {['block', 'feature', 'predict'].map((stage, i) => {
                        const isActive = activeStage === stage
                        const isDone = STAGES.findIndex(s => s.key === activeStage) > STAGES.findIndex(s => s.key === stage)
                        return (
                            <div key={stage} className="worker-stage-row">
                                <motion.div
                                    className="worker-stage-indicator"
                                    animate={{
                                        backgroundColor: isDone ? '#34d399' : isActive ? stageColors[stage] : 'rgba(55,65,81,0.4)',
                                        scale: isActive ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={isActive ? { scale: { duration: 0.8, repeat: Infinity } } : { duration: 0.3 }}
                                />
                                <span className={`worker-stage-label ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                                    {stage === 'block' ? 'Blocking' : stage === 'feature' ? 'Features' : 'Predict'}
                                </span>
                                {isDone && <span className="worker-check">✓</span>}
                                {isActive && (
                                    <motion.div
                                        className="worker-progress-bar"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 2.2, ease: 'linear' }}
                                        style={{ backgroundColor: stageColors[stage] }}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function DistributedArchitecture() {
    const sectionRef = useRef(null)
    const inView = useInView(sectionRef, { once: false, margin: '-100px' })
    const [stageIndex, setStageIndex] = useState(0)
    const [particles, setParticles] = useState([])
    const pathRefs = useRef({ split: [], merge: [] })

    // SVG path refs for each worker's split/merge lines
    const splitPathRefs = [useRef(null), useRef(null), useRef(null)]
    const mergePathRefs = [useRef(null), useRef(null), useRef(null)]

    const activeStage = STAGES[stageIndex].key

    // cycle through stages
    useEffect(() => {
        if (!inView) return
        const iv = setInterval(() => {
            setStageIndex(prev => (prev + 1) % STAGES.length)
        }, STAGES[stageIndex]?.duration || 2500)
        return () => clearInterval(iv)
    }, [inView, stageIndex])

    // spawn particles for split/merge stages
    useEffect(() => {
        if (!inView) return
        if (activeStage === 'split') {
            setParticles([0, 1, 2].map(i => ({ id: `split-${Date.now()}-${i}`, worker: i, type: 'split', delay: i * 200 })))
        } else if (activeStage === 'merge') {
            setParticles([0, 1, 2].map(i => ({ id: `merge-${Date.now()}-${i}`, worker: i, type: 'merge', delay: i * 200 })))
        } else {
            setParticles([])
        }
    }, [activeStage, inView])

    return (
        <section className="section distributed-section" id="distributed" ref={sectionRef}>
            {/* ambient glows */}
            <div className="dist-glow dist-glow-1" />
            <div className="dist-glow dist-glow-2" />

            <div className="container">
                <div className="section-center animate-on-scroll">
                    <p className="section-label">Distributed GPU Computing</p>
                    <h2 className="section-title">
                        Scale Horizontally.{' '}
                        <span className="gradient-text">Process in Parallel.</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        The controller splits data across GPU workers. Each worker runs the full pipeline
                        independently — blocking, feature extraction, and prediction — then results merge
                        only once at the end. No bottleneck. Linear speedup.
                    </p>
                </div>

                {/* ── Architecture Visualization ── */}
                <div className="arch-vis animate-on-scroll">
                    {/* stage progress bar */}
                    <div className="stage-progress-track">
                        {STAGES.map((s, i) => (
                            <motion.div
                                key={s.key}
                                className={`stage-progress-step ${i <= stageIndex ? 'active' : ''}`}
                                animate={{
                                    color: i <= stageIndex ? s.color : 'rgba(100,116,139,0.5)',
                                }}
                            >
                                <motion.div
                                    className="stage-progress-dot"
                                    animate={{
                                        backgroundColor: i < stageIndex ? '#34d399' : i === stageIndex ? s.color : 'rgba(55,65,81,0.5)',
                                        boxShadow: i === stageIndex ? `0 0 12px ${s.color}55` : 'none',
                                        scale: i === stageIndex ? [1, 1.3, 1] : 1,
                                    }}
                                    transition={i === stageIndex ? { scale: { duration: 1, repeat: Infinity } } : {}}
                                />
                                <span>{s.label}</span>
                                {i < STAGES.length - 1 && (
                                    <motion.div
                                        className="stage-progress-connector"
                                        animate={{
                                            background: i < stageIndex
                                                ? 'linear-gradient(90deg, #34d399, #34d399)'
                                                : i === stageIndex
                                                    ? `linear-gradient(90deg, ${s.color}, rgba(55,65,81,0.3))`
                                                    : 'rgba(55,65,81,0.2)',
                                        }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* main flow diagram */}
                    <div className="flow-diagram">
                        {/* Controller (left) */}
                        <motion.div
                            className="controller-node"
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="controller-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <rect x="4" y="8" width="24" height="16" rx="3" stroke="#818cf8" strokeWidth="1.5" />
                                    <line x1="10" y1="8" x2="10" y2="4" stroke="#818cf8" strokeWidth="1.5" />
                                    <line x1="16" y1="8" x2="16" y2="4" stroke="#818cf8" strokeWidth="1.5" />
                                    <line x1="22" y1="8" x2="22" y2="4" stroke="#818cf8" strokeWidth="1.5" />
                                    <line x1="10" y1="24" x2="10" y2="28" stroke="#818cf8" strokeWidth="1.5" />
                                    <line x1="16" y1="24" x2="16" y2="28" stroke="#818cf8" strokeWidth="1.5" />
                                    <line x1="22" y1="24" x2="22" y2="28" stroke="#818cf8" strokeWidth="1.5" />
                                    <rect x="9" y="13" width="14" height="6" rx="1.5" fill="#818cf8" opacity="0.25" />
                                </svg>
                            </div>
                            <span className="controller-label">Controller</span>
                            <span className="controller-sublabel">
                                {activeStage === 'split' ? 'Distributing...' :
                                    activeStage === 'merge' ? 'Aggregating...' : 'Monitoring'}
                            </span>
                        </motion.div>

                        {/* SVG for connection paths + particles */}
                        <svg className="flow-svg" viewBox="0 0 200 280" preserveAspectRatio="none">
                            <defs>
                                <filter id="particleGlow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <linearGradient id="splitGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="mergeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>

                            {/* split paths (controller → workers) */}
                            <path ref={splitPathRefs[0]} d="M 0 140 C 60 140, 140 40, 200 40" stroke="url(#splitGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                            <path ref={splitPathRefs[1]} d="M 0 140 C 80 140, 120 140, 200 140" stroke="url(#splitGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                            <path ref={splitPathRefs[2]} d="M 0 140 C 60 140, 140 240, 200 240" stroke="url(#splitGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />

                            {/* merge paths (workers → results) */}
                            <path ref={mergePathRefs[0]} d="M 0 40 C 60 40, 140 140, 200 140" stroke="url(#mergeGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"
                                style={{ opacity: ['merge', 'predict'].includes(activeStage) ? 1 : 0.2 }} />
                            <path ref={mergePathRefs[1]} d="M 0 140 C 80 140, 120 140, 200 140" stroke="url(#mergeGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"
                                style={{ opacity: ['merge', 'predict'].includes(activeStage) ? 1 : 0.2 }} />
                            <path ref={mergePathRefs[2]} d="M 0 240 C 60 240, 140 140, 200 140" stroke="url(#mergeGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"
                                style={{ opacity: ['merge', 'predict'].includes(activeStage) ? 1 : 0.2 }} />

                            {/* particles */}
                            {particles.map(p => (
                                <Particle
                                    key={p.id}
                                    pathRef={p.type === 'split' ? splitPathRefs[p.worker] : mergePathRefs[p.worker]}
                                    delay={p.delay}
                                    duration={1.4}
                                    color={p.type === 'split' ? '#818cf8' : '#34d399'}
                                    size={5}
                                    reverse={false}
                                />
                            ))}
                        </svg>

                        {/* Worker cards (center) */}
                        <div className="workers-column">
                            {[0, 1, 2].map(i => (
                                <WorkerCard key={i} index={i} activeStage={activeStage} inView={inView} />
                            ))}
                        </div>

                        {/* SVG for merge paths */}
                        <svg className="flow-svg" viewBox="0 0 200 280" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="mergeGrad2" x1="0%" y1="50%" x2="100%" y2="50%">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>

                            <path d="M 0 40 C 60 40, 140 140, 200 140" stroke="url(#mergeGrad2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"
                                style={{ opacity: activeStage === 'merge' ? 1 : 0.15, transition: 'opacity 0.5s' }} />
                            <path d="M 0 140 C 80 140, 120 140, 200 140" stroke="url(#mergeGrad2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"
                                style={{ opacity: activeStage === 'merge' ? 1 : 0.15, transition: 'opacity 0.5s' }} />
                            <path d="M 0 240 C 60 240, 140 140, 200 140" stroke="url(#mergeGrad2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"
                                style={{ opacity: activeStage === 'merge' ? 1 : 0.15, transition: 'opacity 0.5s' }} />
                        </svg>

                        {/* Results (right) */}
                        <motion.div
                            className="results-node"
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView ? {
                                opacity: 1, x: 0,
                                borderColor: activeStage === 'merge' ? 'rgba(52,211,153,0.5)' : 'rgba(55,65,81,0.4)',
                            } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="results-icon">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M8 16L13 21L24 10" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="results-label">Merged Results</span>
                            <span className="results-sublabel">
                                {activeStage === 'merge' ? 'Aggregating...' : activeStage === 'split' ? 'Waiting...' : 'Processing...'}
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* ── Feature highlights ── */}
                <div className="dist-highlights animate-on-scroll">
                    {[
                        {
                            icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ),
                            title: 'No Bottleneck',
                            desc: 'Data splits once, each worker processes all 3 stages independently. Results merge only at the end.',
                        },
                        {
                            icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ),
                            title: 'Linear Speedup',
                            desc: '2 GPUs = 2× faster. 4 GPUs = 4× faster. Throughput scales linearly with each added machine.',
                        },
                        {
                            icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="#a78bfa" strokeWidth="1.5" />
                                    <line x1="8" y1="21" x2="16" y2="21" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                                    <line x1="12" y1="17" x2="12" y2="21" stroke="#a78bfa" strokeWidth="1.5" />
                                </svg>
                            ),
                            title: 'Any Mac with a GPU',
                            desc: 'MacBook Air to Mac Studio. Every Apple Silicon machine becomes a compute node in your cluster.',
                        },
                        {
                            icon: (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fbbf24" strokeWidth="1.5" />
                                </svg>
                            ),
                            title: 'Fault Tolerant',
                            desc: 'If a worker fails, its partition is automatically reassigned. The pipeline never stops.',
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="dist-highlight-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <div className="dist-highlight-icon">{item.icon}</div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
