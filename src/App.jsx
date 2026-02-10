import { useEffect, useState } from 'react'
import './App.css'

/* ─── tiny helpers ─── */
const L = (n, content) => (
  <div className="code-line">
    <span className="line-number">{n}</span>
    <span className="line-content">{content}</span>
  </div>
)

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      {/* ═══════ Navbar ═══════ */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo">MetalMatcher</a>
          <ul className="navbar-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#pipeline">Pipeline</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#use-cases">Use Cases</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ═══════ Hero ═══════ */}
      <section className="hero" id="overview">
        <img src="/hero-bg.png" alt="" className="hero-bg" />
        <div className="dot-grid-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">MetalMatcher</span>
          </h1>
          <p className="hero-tagline">
            Autonomous entity matching that's <strong>10× faster</strong> than CPU solutions.<br />
            No manual rules. No labeling. Just fast, intelligent data reconciliation.
          </p>
          <div className="hero-cta">
            <a href="#pipeline" className="btn btn-primary">See the Pipeline →</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ What is MetalMatcher ═══════ */}
      <section className="section section-center">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">What is MetalMatcher</p>
            <h2 className="section-title">
              Entity Matching for Messy, Real-World Data
            </h2>
            <p className="section-subtitle">
              MetalMatcher is a high-performance entity matching engine that helps data and AI teams
              match records referring to the same real-world entity — across product catalogs, CRM systems,
              financial records, and more. Built on Apple Metal GPU acceleration and unified memory architecture.
            </p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ Pipeline Demo ═══════ */}
      <section className="section pipeline-section" id="pipeline">
        <div className="container">
          <div className="pipeline-header animate-on-scroll">
            <p className="section-label">The Pipeline</p>
            <h2 className="section-title">Three Stages. Fully Autonomous.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              MetalMatcher runs a complete 3-stage matching pipeline — from candidate generation
              to ML prediction to adaptive selection — with zero configuration.
            </p>
          </div>

          {/* ── Stage 1: Blocking ── */}
          <div className="pipeline-stage animate-on-scroll">
            <div className="stage-label">
              <span className="stage-number">1</span>
              STAGE 1 — GPU-ACCELERATED BLOCKING
            </div>
            <div className="pipeline-grid">
              <div className="pipeline-info">
                <h3>Multi-Algorithm Candidate Generation</h3>
                <p>
                  Reduces the search space from millions of pairs to a manageable set of candidates
                  using GPU-accelerated MinHash, token Jaccard, and exact-match algorithms —
                  all selected automatically based on column data types.
                </p>
                <ul>
                  <li><span className="check">✓</span> Automatic data type detection per column</li>
                  <li><span className="check">✓</span> 99%+ search space reduction</li>
                  <li><span className="check">✓</span> GPU-parallel MinHash for text columns</li>
                </ul>
              </div>
              <div className="code-editor">
                <div className="code-editor-header">
                  <div className="code-editor-dots">
                    <div className="code-editor-dot"></div>
                    <div className="code-editor-dot"></div>
                    <div className="code-editor-dot"></div>
                  </div>
                  <span className="code-editor-title">pipeline.py</span>
                </div>
                <div className="code-editor-body">
                  {L(1, <><span className="tk-kw">from</span> <span className="tk-var">em_matcher</span> <span className="tk-kw">import</span> <span className="tk-cls">EntityMatcher</span></>)}
                  {L(2, '')}
                  {L(3, <><span className="tk-cmt"># Initialize — auto-detects optimal config</span></>)}
                  {L(4, <><span className="tk-var">matcher</span> <span className="tk-op">=</span> <span className="tk-cls">EntityMatcher</span>(</>)}
                  {L(5, <><span className="tk-var">    mode</span><span className="tk-op">=</span><span className="tk-str">'standard'</span>,</>)}
                  {L(6, <><span className="tk-var">    hash_mode</span><span className="tk-op">=</span><span className="tk-str">'balanced'</span></>)}
                  {L(7, <><span className="tk-op">)</span></>)}
                  {L(8, '')}
                  {L(9, <><span className="tk-cmt"># Stage 1: GPU blocking</span></>)}
                  {L(10, <><span className="tk-var">candidates</span>, <span className="tk-var">metrics</span> <span className="tk-op">=</span> <span className="tk-var">matcher</span>.<span className="tk-fn">match</span>(</>)}
                  {L(11, <><span className="tk-var">    table_a</span>, <span className="tk-var">table_b</span>,</>)}
                  {L(12, <><span className="tk-var">    return_metrics</span><span className="tk-op">=</span><span className="tk-num">True</span></>)}
                  {L(13, <><span className="tk-op">)</span></>)}
                </div>
              </div>
            </div>
          </div>

          <div className="stage-connector animate-on-scroll"></div>

          {/* ── Stage 2: Feature Extraction ── */}
          <div className="pipeline-stage animate-on-scroll">
            <div className="stage-label">
              <span className="stage-number">2</span>
              STAGE 2 — FEATURE EXTRACTION
            </div>
            <div className="pipeline-grid">
              <div className="pipeline-info">
                <h3>GPU Features + Embeddings + String Similarity</h3>
                <p>
                  Extracts a rich feature set for each candidate pair — combining Metal-accelerated
                  similarity kernels, string-distance measures, and robust cross-domain features
                  that generalize across datasets.
                </p>
                <ul>
                  <li><span className="check">✓</span> GPU-accelerated Jaccard, cosine, TF-IDF</li>
                  <li><span className="check">✓</span> Robust string features (Levenshtein, Jaro-Winkler)</li>
                  <li><span className="check">✓</span> Column-agnostic — works on any schema</li>
                </ul>
              </div>
              <div className="code-editor">
                <div className="code-editor-header">
                  <div className="code-editor-dots">
                    <div className="code-editor-dot"></div>
                    <div className="code-editor-dot"></div>
                    <div className="code-editor-dot"></div>
                  </div>
                  <span className="code-editor-title">features.py</span>
                </div>
                <div className="code-editor-body">
                  {L(1, <><span className="tk-kw">from</span> <span className="tk-var">em_matcher.gpu_universal_features</span> <span className="tk-kw">import</span> \</>)}
                  {L(2, <><span className="tk-var">    </span><span className="tk-fn">extract_features_for_candidates_gpu</span></>)}
                  {L(3, <><span className="tk-kw">from</span> <span className="tk-var">em_matcher.robust_features</span> <span className="tk-kw">import</span> \</>)}
                  {L(4, <><span className="tk-var">    </span><span className="tk-fn">extract_robust_features</span></>)}
                  {L(5, '')}
                  {L(6, <><span className="tk-cmt"># GPU-accelerated feature extraction</span></>)}
                  {L(7, <><span className="tk-var">candidates</span> <span className="tk-op">=</span> <span className="tk-fn">extract_features_for_candidates_gpu</span>(</>)}
                  {L(8, <><span className="tk-var">    candidates</span>, <span className="tk-var">table_a</span>, <span className="tk-var">table_b</span></>)}
                  {L(9, <><span className="tk-op">)</span></>)}
                  {L(10, '')}
                  {L(11, <><span className="tk-cmt"># Add robust cross-domain features</span></>)}
                  {L(12, <><span className="tk-var">robust</span> <span className="tk-op">=</span> <span className="tk-fn">extract_robust_features</span>(<span className="tk-var">candidates</span>, <span className="tk-var">table_a</span>, <span className="tk-var">table_b</span>)</>)}
                </div>
              </div>
            </div>
          </div>

          <div className="stage-connector animate-on-scroll"></div>

          {/* ── Stage 3: Prediction ── */}
          <div className="pipeline-stage animate-on-scroll">
            <div className="stage-label">
              <span className="stage-number">3</span>
              STAGE 3 — PREDICTION & ADAPTIVE SELECTION
            </div>
            <div className="pipeline-grid">
              <div className="pipeline-info">
                <h3>LightGBM Classifier + 1-to-1 Matching</h3>
                <p>
                  A pretrained LightGBM classifier scores every candidate pair. Instead of brittle
                  fixed thresholds, MetalMatcher uses <strong>adaptive 1-to-1 matching</strong> that
                  works robustly across datasets with different match rates.
                </p>
                <ul>
                  <li><span className="check">✓</span> Pretrained universal model — no retraining needed</li>
                  <li><span className="check">✓</span> Adaptive top-k selection, not fixed thresholds</li>
                  <li><span className="check">✓</span> 1-to-1 constraint for clean, deduplicated output</li>
                </ul>
              </div>
              <div className="code-editor">
                <div className="code-editor-header">
                  <div className="code-editor-dots">
                    <div className="code-editor-dot"></div>
                    <div className="code-editor-dot"></div>
                    <div className="code-editor-dot"></div>
                  </div>
                  <span className="code-editor-title">predict.py</span>
                </div>
                <div className="code-editor-body">
                  {L(1, <><span className="tk-cmt"># Score all candidate pairs</span></>)}
                  {L(2, <><span className="tk-var">predictions</span> <span className="tk-op">=</span> <span className="tk-var">model</span>.<span className="tk-fn">predict</span>(<span className="tk-var">X</span>)</>)}
                  {L(3, <><span className="tk-var">candidates</span>[<span className="tk-str">'ml_score'</span>] <span className="tk-op">=</span> <span className="tk-var">predictions</span></>)}
                  {L(4, '')}
                  {L(5, <><span className="tk-cmt"># Adaptive 1-to-1 matching</span></>)}
                  {L(6, <><span className="tk-kw">from</span> <span className="tk-var">em_matcher.adaptive_matcher</span> <span className="tk-kw">import</span> <span className="tk-fn">adaptive_matching</span></>)}
                  {L(7, '')}
                  {L(8, <><span className="tk-var">results</span> <span className="tk-op">=</span> <span className="tk-fn">adaptive_matching</span>(</>)}
                  {L(9, <><span className="tk-var">    candidates</span>,</>)}
                  {L(10, <><span className="tk-var">    score_col</span><span className="tk-op">=</span><span className="tk-str">'ml_score'</span>,</>)}
                  {L(11, <><span className="tk-var">    force_strategy</span><span className="tk-op">=</span><span className="tk-str">'1-to-1'</span></>)}
                  {L(12, <><span className="tk-op">)</span></>)}
                </div>
              </div>
            </div>
          </div>

          <div className="stage-connector animate-on-scroll"></div>

          {/* ── Terminal Output ── */}
          <div className="pipeline-stage animate-on-scroll">
            <div className="stage-label">
              <span className="stage-number" style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}>✓</span>
              OUTPUT — PIPELINE RESULTS
            </div>
            <div className="terminal">
              <div className="terminal-header">
                <div className="code-editor-dots">
                  <div className="code-editor-dot"></div>
                  <div className="code-editor-dot"></div>
                  <div className="code-editor-dot"></div>
                </div>
                <span className="terminal-title">Terminal — python demo.py</span>
              </div>
              <div className="terminal-body">
                <span className="term-line"><span className="t-dim">══════════════════════════════════════════════════════════</span></span>
                <span className="term-line"><span className="t-white t-bold">Multi-Algorithm Entity Matching with Pretrained Model</span></span>
                <span className="term-line"><span className="t-dim">══════════════════════════════════════════════════════════</span></span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-blue">[1/6]</span> Loading pretrained model...</span>
                <span className="term-line">  <span className="t-green">✓</span> Model loaded: <span className="t-white">47 features</span></span>
                <span className="term-line">  <span className="t-green">✓</span> Training F1: <span className="t-white">94.28%</span></span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-blue">[2/6]</span> Loading dataset...</span>
                <span className="term-line">  <span className="t-green">✓</span> Table A: <span className="t-white">2,616</span> records</span>
                <span className="term-line">  <span className="t-green">✓</span> Table B: <span className="t-white">2,295</span> records</span>
                <span className="term-line">  <span className="t-green">✓</span> Search space: <span className="t-white">6,003,720</span> pairs</span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-blue">[4/6]</span> Stage 1: Multi-algorithm blocking...</span>
                <span className="term-line">  <span className="t-green">✓</span> Candidates: <span className="t-white">12,847</span> <span className="t-dim">(from 6,003,720 possible)</span></span>
                <span className="term-line">  <span className="t-green">✓</span> Reduction: <span className="t-white">99.79%</span></span>
                <span className="term-line">  <span className="t-green">✓</span> Time: <span className="t-white">342 ms</span></span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-blue">[5/6]</span> Stage 2: Feature extraction...</span>
                <span className="term-line">  <span className="t-green">✓</span> Features extracted: <span className="t-white">47</span></span>
                <span className="term-line">  <span className="t-green">✓</span> Time: <span className="t-white">1,204 ms</span> <span className="t-dim">(0.09 ms/pair)</span></span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-blue">[6/6]</span> Stage 3: Pretrained model prediction...</span>
                <span className="term-line">  <span className="t-green">✓</span> Predictions: <span className="t-white">12,847</span> pairs</span>
                <span className="term-line">  <span className="t-green">✓</span> Throughput: <span className="t-white">1,845,230</span> pairs/sec</span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-dim">──────────────────────────────────────────────────────────</span></span>
                <span className="term-line"><span className="t-white t-bold">  EVALUATION</span></span>
                <span className="term-line"><span className="t-dim">──────────────────────────────────────────────────────────</span></span>
                <span className="term-line">  Precision          <span className="t-green t-bold">    98.50%</span></span>
                <span className="term-line">  Recall             <span className="t-green t-bold">    92.36%</span></span>
                <span className="term-line">  F1 Score           <span className="t-green t-bold">    95.33%</span></span>
                <span className="term-line"></span>
                <span className="term-line"><span className="t-dim">══════════════════════════════════════════════════════════</span></span>
                <span className="term-line"><span className="t-green">Pipeline complete!</span> <span className="t-dim">Total: 1,891 ms</span></span>
                <span className="term-line"><span className="term-prompt">$ </span><span className="term-cursor"></span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ Key Features ═══════ */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-center animate-on-scroll">
            <p className="section-label">Capabilities</p>
            <h2 className="section-title">Built for Performance & Scale</h2>
          </div>

          <div className="feature-grid">
            {[
              { icon: '⚡', title: 'GPU-Accelerated', desc: 'Apple Metal parallel processing delivers 10× faster matching compared to CPU solutions.' },
              { icon: '🤖', title: 'Fully Autonomous', desc: 'No manual rules, no labeling. Automatic column detection, algorithm selection, and matching.' },
              { icon: '🧠', title: 'Unified Memory', desc: "Mac's shared CPU-GPU memory eliminates data transfers — process large datasets in-place." },
              { icon: '📈', title: 'Scalable', desc: 'Handles 100M+ records on commodity hardware. No expensive servers required.' },
              { icon: '🎯', title: '90%+ Accuracy', desc: 'Achieves F1 scores above 90% across diverse benchmark datasets out of the box.' },
              { icon: '🔄', title: 'Universal Model', desc: 'Pretrained on multiple domains — works cross-dataset without retraining.' },
            ].map((f, i) => (
              <div key={i} className={`feature-card animate-on-scroll stagger-${i + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-description">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ Performance Stats ═══════ */}
      <section className="section section-center stats-section">
        <div className="dot-grid-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-on-scroll">
            <p className="section-label">Performance</p>
            <h2 className="section-title">Numbers That Matter</h2>
          </div>
          <div className="stats-grid">
            {[
              { value: '10×', label: 'Faster Than CPU Solutions' },
              { value: '95%+', label: 'F1 Score on Benchmarks' },
              { value: '100M+', label: 'Records Processed' },
            ].map((s, i) => (
              <div key={i} className={`stat-item animate-on-scroll stagger-${i + 1}`}>
                <span className="stat-value">{s.value}</span>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ How It Works ═══════ */}
      <section className="section section-center" id="how-it-works">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Three Simple Steps</h2>
            <p className="section-subtitle">
              MetalMatcher's API makes entity matching straightforward —
              whether you're deduplicating records or reconciling systems.
            </p>
          </div>
          <div className="steps-grid">
            {[
              { n: 1, title: 'Load Your Data', desc: 'Import CSV, Parquet, or JSON datasets. Column roles and data types are auto-detected.' },
              { n: 2, title: 'Run the Pipeline', desc: 'GPU-accelerated blocking, feature extraction, and ML prediction — all in one call.' },
              { n: 3, title: 'Export Results', desc: 'Get matched pairs with confidence scores. Export to CSV or integrate via API.' },
            ].map((s, i) => (
              <div key={i} className={`step-card animate-on-scroll stagger-${i + 1}`}>
                <div className="step-number">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-description">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ Use Cases ═══════ */}
      <section className="section" id="use-cases">
        <div className="container">
          <div className="section-center animate-on-scroll">
            <p className="section-label">Use Cases</p>
            <h2 className="section-title">Built for Real-World Problems</h2>
          </div>
          <div className="use-case-grid">
            {[
              { emoji: '💰', title: 'Fintech & Banking', desc: 'Reconcile transactions, detect duplicate accounts, and ensure data integrity across financial systems.' },
              { emoji: '🛒', title: 'E-Commerce', desc: 'Match product catalogs across marketplaces, deduplicate inventory, and merge customer records.' },
              { emoji: '🤖', title: 'AI/ML Data Prep', desc: 'Clean and deduplicate training datasets for higher-quality model inputs and better generalization.' },
              { emoji: '📊', title: 'CRM & MDM', desc: 'Identify and merge duplicate records to maintain a golden customer record across the org.' },
            ].map((u, i) => (
              <div key={i} className={`use-case-card animate-on-scroll stagger-${i + 1}`}>
                <span className="use-case-emoji">{u.emoji}</span>
                <h3 className="use-case-title">{u.title}</h3>
                <p className="use-case-description">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ Technology ═══════ */}
      <section className="section section-center">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">Technology</p>
            <h2 className="section-title">Powered by Apple Metal</h2>
            <p className="section-subtitle">
              MetalMatcher leverages Apple Silicon's unified memory — CPU and GPU share the same memory
              pool, eliminating PCIe bottlenecks. A Mac Studio with 128 GB RAM outperforms traditional
              servers at a fraction of the cost. Available as API, SDK, and on-premise deployment.
            </p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════ CTA ═══════ */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2 className="cta-title">Ready to Transform Your Data Pipeline?</h2>
            <p className="cta-description">
              Join data teams using MetalMatcher to solve entity matching at scale.
              Available for cloud-native startups and enterprises requiring on-premise control.
            </p>
            <div className="hero-cta">
              <a href="mailto:contact@metalmatcher.com" className="btn btn-primary">Get in Touch</a>
              <a href="https://github.com/metalmatcher" className="btn btn-secondary">View on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Footer ═══════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">MetalMatcher</div>
            <ul className="footer-links">
              <li><a href="#overview">Overview</a></li>
              <li><a href="#pipeline">Pipeline</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="mailto:contact@metalmatcher.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-copyright">
            © 2026 MetalMatcher. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
