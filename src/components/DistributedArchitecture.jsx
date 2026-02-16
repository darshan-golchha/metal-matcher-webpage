import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './DistributedArchitecture.css'

/* ─── SVG layout constants ─── */
const CX = 400, CY = 260                       // controller center
const WORKERS = [
    { id: 0, x: 140, y: 100, label: 'Worker 1' },
    { id: 1, x: 660, y: 100, label: 'Worker 2' },
    { id: 2, x: 140, y: 420, label: 'Worker 3' },
    { id: 3, x: 660, y: 420, label: 'Worker 4' },
]

const STAGES = [
    { name: 'Blocking', color: '#818cf8', icon: '⚡' },
    { name: 'Feature Extraction', color: '#a78bfa', icon: '🧠' },
    { name: 'Prediction', color: '#34d399', icon: '🎯' },
]

/* ─── animated data packet along a line ─── */
function DataPacket({ x1, y1, x2, y2, delay, color, reverse = false }) {
    const sx = reverse ? x2 : x1, sy = reverse ? y2 : y1
    const ex = reverse ? x1 : x2, ey = reverse ? y1 : y2
    return (
        <motion.circle
            cx={sx} cy={sy} r={5}
            fill={color}
            filter="url(#glow)"
            initial={{ cx: sx, cy: sy, opacity: 0 }}
            animate={{
                cx: [sx, ex],
                cy: [sy, ey],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                duration: 1.6,
                delay,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 4.8,        // total cycle = 3 stages × 1.6 + gaps
            }}
        />
    )
}

/* ─── GPU chip icon (mini) ─── */
function GpuChip({ x, y }) {
    return (
        <g transform={`translate(${x - 10},${y - 10})`}>
            <rect width={20} height={20} rx={3} fill="rgba(99,102,241,0.25)" stroke="#818cf8" strokeWidth={1} />
            <rect x={4} y={4} width={12} height={12} rx={2} fill="#818cf8" opacity={0.6} />
            {/* pins */}
            {[3, 10, 17].map(px => <line key={`t${px}`} x1={px} y1={0} x2={px} y2={-4} stroke="#818cf8" strokeWidth={1} opacity={0.5} />)}
            {[3, 10, 17].map(px => <line key={`b${px}`} x1={px} y1={20} x2={px} y2={24} stroke="#818cf8" strokeWidth={1} opacity={0.5} />)}
        </g>
    )
}

/* ─── worker node ─── */
function WorkerNode({ x, y, label, inView }) {
    return (
        <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <rect
                x={x - 60} y={y - 40} width={120} height={80} rx={12}
                fill="rgba(17,24,39,0.85)" stroke="rgba(99,102,241,0.3)" strokeWidth={1.5}
            />
            <GpuChip x={x} y={y - 8} />
            <text x={x} y={y + 28} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="Inter, sans-serif" fontWeight={600}>
                {label}
            </text>
            {/* pulsing GPU indicator */}
            <motion.circle
                cx={x + 44} cy={y - 28} r={4} fill="#34d399"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.g>
    )
}

export default function DistributedArchitecture() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: false, margin: '-100px' })
    const [activeStage, setActiveStage] = useState(0)

    useEffect(() => {
        if (!inView) return
        const iv = setInterval(() => setActiveStage(s => (s + 1) % 3), 2800)
        return () => clearInterval(iv)
    }, [inView])

    return (
        <section className="section distributed-section" id="distributed" ref={ref}>
            <div className="container">
                <div className="section-center animate-on-scroll">
                    <p className="section-label">Distributed GPU Computing</p>
                    <h2 className="section-title">Scale Horizontally. Process in Parallel.</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Each worker leverages its own Metal GPU — delivering linear speedup
                        with zero code changes. The controller orchestrates blocking, feature extraction,
                        and prediction across the cluster automatically.
                    </p>
                </div>

                <div className="distributed-layout">
                    {/* ── SVG Architecture Diagram ── */}
                    <div className="arch-diagram-wrap animate-on-scroll">
                        <svg viewBox="0 0 800 520" className="arch-diagram" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
                                </linearGradient>
                            </defs>

                            {/* connection lines */}
                            {WORKERS.map(w => (
                                <line
                                    key={`line-${w.id}`}
                                    x1={CX} y1={CY} x2={w.x} y2={w.y}
                                    stroke="url(#lineGrad)" strokeWidth={1.5}
                                    strokeDasharray="6 4"
                                />
                            ))}

                            {/* data packets — fan out (controller → workers) */}
                            {WORKERS.map((w, i) => (
                                <DataPacket
                                    key={`out-${w.id}`}
                                    x1={CX} y1={CY} x2={w.x} y2={w.y}
                                    delay={i * 0.15 + activeStage * 1.8}
                                    color={STAGES[activeStage].color}
                                />
                            ))}

                            {/* data packets — fan in (workers → controller) */}
                            {WORKERS.map((w, i) => (
                                <DataPacket
                                    key={`in-${w.id}`}
                                    x1={CX} y1={CY} x2={w.x} y2={w.y}
                                    delay={i * 0.15 + 1.0 + activeStage * 1.8}
                                    color={STAGES[activeStage].color}
                                    reverse
                                />
                            ))}

                            {/* worker nodes */}
                            {WORKERS.map(w => (
                                <WorkerNode key={w.id} {...w} inView={inView} />
                            ))}

                            {/* controller node (center) */}
                            <motion.g
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.7 }}
                            >
                                <rect
                                    x={CX - 80} y={CY - 50} width={160} height={100} rx={14}
                                    fill="rgba(99,102,241,0.12)" stroke="#818cf8" strokeWidth={2}
                                />
                                <text x={CX} y={CY - 14} textAnchor="middle" fill="#c7d2fe" fontSize={13} fontFamily="Inter, sans-serif" fontWeight={800} letterSpacing="0.05em">
                                    CONTROLLER
                                </text>
                                <text x={CX} y={CY + 8} textAnchor="middle" fill="#94a3b8" fontSize={10} fontFamily="Inter, sans-serif">
                                    Orchestrates Pipeline
                                </text>
                                {/* stage indicator */}
                                <motion.text
                                    key={activeStage}
                                    x={CX} y={CY + 30}
                                    textAnchor="middle" fill={STAGES[activeStage].color}
                                    fontSize={11} fontFamily="Inter, sans-serif" fontWeight={600}
                                    initial={{ opacity: 0, y: CY + 35 }}
                                    animate={{ opacity: 1, y: CY + 30 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {STAGES[activeStage].icon} {STAGES[activeStage].name}
                                </motion.text>
                            </motion.g>
                        </svg>

                        {/* stage legend */}
                        <div className="stage-legend">
                            {STAGES.map((s, i) => (
                                <div key={i} className={`legend-item ${activeStage === i ? 'active' : ''}`}>
                                    <span className="legend-dot" style={{ background: s.color }} />
                                    <span>{s.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Info Panel ── */}
                    <div className="distributed-info animate-on-scroll">
                        <div className="dist-feature-list">
                            {[
                                {
                                    icon: '🔀',
                                    title: 'Automatic Work Distribution',
                                    desc: 'The controller splits datasets and distributes work across GPU workers — each processing its partition independently.',
                                },
                                {
                                    icon: '📈',
                                    title: 'Linear Scalability',
                                    desc: '2 workers = 2× faster. 4 workers = 4× faster. Add machines and watch throughput scale linearly.',
                                },
                                {
                                    icon: '🛡️',
                                    title: 'Fault Tolerant',
                                    desc: 'If a worker fails, its tasks are automatically reassigned. The pipeline never stops.',
                                },
                                {
                                    icon: '⚙️',
                                    title: 'Zero Config',
                                    desc: 'No sharding logic to write. No cluster management. The distributed layer is completely transparent.',
                                },
                            ].map((f, i) => (
                                <motion.div
                                    key={i}
                                    className="dist-feature-item"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <span className="dist-feature-icon">{f.icon}</span>
                                    <div>
                                        <h4>{f.title}</h4>
                                        <p>{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
