import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    // Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            MetalMatcher
          </a>
          <ul className="navbar-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#use-cases">Use Cases</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="overview">
        <img src="/hero-bg.png" alt="" className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">MetalMatcher</span>
          </h1>
          <p className="hero-subtitle">
            GPU-accelerated entity matching that's 10x faster, autonomous, and accurate.
            No manual rules. No brittle configurations. Just fast, intelligent data reconciliation.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Get Started</a>
            <a href="#features" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* What is MetalMatcher */}
      <section className="section section-center">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">What is MetalMatcher</p>
            <h2 className="section-title">
              Fast & Accurate Entity Matching for Messy Data
            </h2>
            <p className="section-subtitle">
              MetalMatcher is a high-performance entity matching engine that helps data and AI teams
              match records referring to the same real-world entity. Built on Apple Metal GPU acceleration
              and unified memory architecture, it delivers unprecedented speed and accuracy without requiring
              manual rules or extensive human input.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-center animate-on-scroll">
            <p className="section-label">Capabilities</p>
            <h2 className="section-title">Built for Performance & Scale</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card animate-on-scroll stagger-1">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">GPU-Accelerated</h3>
              <p className="feature-description">
                Leverages Apple Metal for parallel processing, delivering 10x faster matching
                compared to traditional CPU-based solutions.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-2">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">Autonomous Matching</h3>
              <p className="feature-description">
                No manual rules or labeling required. The engine automatically detects patterns
                and matches entities with minimal human intervention.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-3">
              <div className="feature-icon">🧠</div>
              <h3 className="feature-title">Unified Memory Architecture</h3>
              <p className="feature-description">
                Utilizes Mac's shared CPU-GPU memory to eliminate expensive data transfers,
                enabling efficient processing of large datasets.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-4">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Scalable</h3>
              <p className="feature-description">
                Handles millions of records efficiently. Runs on affordable hardware without
                requiring expensive high-end servers.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-5">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">High Accuracy</h3>
              <p className="feature-description">
                Achieves 90%+ F1 scores on complex datasets through advanced matching algorithms
                and semantic understanding.
              </p>
            </div>

            <div className="feature-card animate-on-scroll stagger-6">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Multi-Format Support</h3>
              <p className="feature-description">
                Works seamlessly with CSV, JSON, and other data formats. Integrates easily
                into existing data pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="section section-center">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">Performance</p>
            <h2 className="section-title">Numbers That Matter</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-item animate-on-scroll stagger-1">
              <span className="stat-value">10x</span>
              <p className="stat-label">Faster Than CPU Solutions</p>
            </div>

            <div className="stat-item animate-on-scroll stagger-2">
              <span className="stat-value">90%+</span>
              <p className="stat-label">Accuracy (F1 Score)</p>
            </div>

            <div className="stat-item animate-on-scroll stagger-3">
              <span className="stat-value">100M+</span>
              <p className="stat-label">Records Processed</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-center" id="how-it-works">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Three Simple Steps</h2>
            <p className="section-subtitle">
              MetalMatcher's API and SDK make entity matching straightforward,
              whether you're deduplicating records or reconciling systems.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card animate-on-scroll stagger-1">
              <div className="step-number">1</div>
              <h3 className="step-title">Load Your Data</h3>
              <p className="step-description">
                Import your datasets in CSV, JSON, or other formats.
                The engine automatically detects column roles and data types.
              </p>
            </div>

            <div className="step-card animate-on-scroll stagger-2">
              <div className="step-number">2</div>
              <h3 className="step-title">Run Matching</h3>
              <p className="step-description">
                The GPU-accelerated engine processes your data, identifying
                matching entities with high precision and recall.
              </p>
            </div>

            <div className="step-card animate-on-scroll stagger-3">
              <div className="step-number">3</div>
              <h3 className="step-title">Export Results</h3>
              <p className="step-description">
                Get matched pairs with confidence scores. Export to CSV or
                integrate directly into your data pipeline via API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section" id="use-cases">
        <div className="container">
          <div className="section-center animate-on-scroll">
            <p className="section-label">Use Cases</p>
            <h2 className="section-title">Built for Real-World Problems</h2>
          </div>

          <div className="use-case-grid">
            <div className="use-case-card animate-on-scroll stagger-1">
              <span className="use-case-emoji">💰</span>
              <h3 className="use-case-title">Fintech</h3>
              <p className="use-case-description">
                Reconcile transactions across systems, detect duplicate accounts,
                and ensure data integrity in financial operations.
              </p>
            </div>

            <div className="use-case-card animate-on-scroll stagger-2">
              <span className="use-case-emoji">🛒</span>
              <h3 className="use-case-title">E-Commerce</h3>
              <p className="use-case-description">
                Match product catalogs, deduplicate inventory, and merge customer
                records across multiple sales channels.
              </p>
            </div>

            <div className="use-case-card animate-on-scroll stagger-3">
              <span className="use-case-emoji">🤖</span>
              <h3 className="use-case-title">AI/ML Data Preparation</h3>
              <p className="use-case-description">
                Clean and deduplicate training datasets, ensuring high-quality
                input data for machine learning models.
              </p>
            </div>

            <div className="use-case-card animate-on-scroll stagger-4">
              <span className="use-case-emoji">📊</span>
              <h3 className="use-case-title">CRM Cleanup</h3>
              <p className="use-case-description">
                Identify and merge duplicate customer records, maintaining
                a single source of truth across your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Highlights */}
      <section className="section section-center">
        <div className="container">
          <div className="animate-on-scroll">
            <p className="section-label">Technology</p>
            <h2 className="section-title">Powered by Apple Metal</h2>
            <p className="section-subtitle">
              MetalMatcher leverages the unified memory architecture of Apple Silicon,
              where CPU and GPU share memory. This eliminates expensive PCIExpress transfers,
              enabling a Mac Studio with 128GB RAM to outperform traditional high-end servers
              at a fraction of the cost. Available as API, SDK, and on-premise deployment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2 className="cta-title">
              Ready to Transform Your Data Pipeline?
            </h2>
            <p className="cta-description">
              Join data teams using MetalMatcher to solve entity matching at scale.
              Available for cloud-native startups and regulated enterprises requiring on-premise deployment.
            </p>
            <div className="hero-cta">
              <a href="mailto:contact@metalmatcher.com" className="btn btn-primary">
                Get in Touch
              </a>
              <a href="https://github.com/metalmatcher" className="btn btn-secondary">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">MetalMatcher</div>
            <ul className="footer-links">
              <li><a href="#overview">Overview</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
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
