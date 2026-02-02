import { motion } from 'framer-motion'

interface HeroSectionProps {
  onQuizStart: () => void
}

export default function HeroSection({ onQuizStart }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-label">Discover Your Glow</span>
          <h1 className="hero-title">
            Nature's Finest
            <br />
            <span className="hero-title-accent">For Your Skin</span>
          </h1>
          <p className="hero-description">
            Curated botanical formulations designed to nourish, protect, and
            reveal your skin's natural radiance. Begin your personalized
            skincare journey today.
          </p>
          <div className="hero-actions">
            <motion.button
              className="hero-cta primary"
              onClick={onQuizStart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Find Your Routine
            </motion.button>
            <motion.button
              className="hero-cta secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Ingredients
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="hero-product-display">
            {/* Serum bottle illustration */}
            <motion.div
              className="product-bottle"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bottle-cap" />
              <div className="bottle-neck" />
              <div className="bottle-body">
                <div className="bottle-liquid">
                  <motion.div
                    className="liquid-bubble"
                    animate={{
                      y: [-80, -20],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="liquid-bubble bubble-2"
                    animate={{
                      y: [-70, -10],
                      opacity: [0, 1, 0],
                      scale: [0.3, 0.8, 0.3]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div
                    className="liquid-bubble bubble-3"
                    animate={{
                      y: [-60, 0],
                      opacity: [0, 1, 0],
                      scale: [0.4, 0.9, 0.4]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
                <span className="bottle-label">V</span>
              </div>
              <div className="bottle-shadow" />
            </motion.div>

            {/* Floating ingredient badges */}
            <motion.div
              className="ingredient-badge badge-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="badge-icon">🌿</span>
              <span className="badge-text">Niacinamide</span>
            </motion.div>
            <motion.div
              className="ingredient-badge badge-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="badge-icon">💧</span>
              <span className="badge-text">Hyaluronic</span>
            </motion.div>
            <motion.div
              className="ingredient-badge badge-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="badge-icon">🍊</span>
              <span className="badge-text">Vitamin C</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="hero-deco">
        <motion.div
          className="deco-line line-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="deco-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>

      <style>{`
        .hero {
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          padding: 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-label {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--terracotta);
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4.5rem;
          font-weight: 400;
          line-height: 1.1;
          color: var(--espresso);
          margin-bottom: 1.5rem;
        }

        .hero-title-accent {
          color: var(--terracotta);
          font-style: italic;
        }

        .hero-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--espresso-light);
          max-width: 480px;
          margin-bottom: 2.5rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .hero-cta {
          padding: 1rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hero-cta.primary {
          background: var(--terracotta);
          color: var(--cream);
          border: none;
        }

        .hero-cta.primary:hover {
          background: var(--espresso);
        }

        .hero-cta.secondary {
          background: transparent;
          color: var(--espresso);
          border: 1px solid var(--espresso);
        }

        .hero-cta.secondary:hover {
          background: var(--espresso);
          color: var(--cream);
        }

        .hero-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .hero-product-display {
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-bottle {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bottle-cap {
          width: 40px;
          height: 25px;
          background: linear-gradient(135deg, var(--gold), #B8956A);
          border-radius: 4px 4px 0 0;
          position: relative;
          z-index: 2;
        }

        .bottle-neck {
          width: 30px;
          height: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
          position: relative;
          z-index: 1;
        }

        .bottle-body {
          width: 120px;
          height: 200px;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7));
          border-radius: 8px 8px 20px 20px;
          position: relative;
          box-shadow:
            inset -10px 0 20px rgba(168, 181, 160, 0.2),
            inset 10px 0 20px rgba(255,255,255,0.5),
            0 20px 40px rgba(45, 35, 25, 0.15);
          overflow: hidden;
        }

        .bottle-liquid {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70%;
          background: linear-gradient(180deg, var(--sage), var(--sage-dark));
          border-radius: 0 0 18px 18px;
          opacity: 0.6;
        }

        .liquid-bubble {
          position: absolute;
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.6);
          border-radius: 50%;
          left: 30%;
          bottom: 20px;
        }

        .liquid-bubble.bubble-2 {
          left: 60%;
          width: 8px;
          height: 8px;
        }

        .liquid-bubble.bubble-3 {
          left: 45%;
          width: 10px;
          height: 10px;
        }

        .bottle-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          color: var(--espresso);
          opacity: 0.3;
          z-index: 2;
        }

        .bottle-shadow {
          position: absolute;
          bottom: -30px;
          width: 100px;
          height: 20px;
          background: radial-gradient(ellipse, rgba(45, 35, 25, 0.2) 0%, transparent 70%);
        }

        .ingredient-badge {
          position: absolute;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.25rem;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 30px rgba(45, 35, 25, 0.1);
          border: 1px solid rgba(193, 122, 90, 0.1);
        }

        .badge-icon {
          font-size: 1rem;
        }

        .badge-text {
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          color: var(--espresso);
        }

        .badge-1 {
          top: 15%;
          left: 5%;
        }

        .badge-2 {
          top: 30%;
          right: 5%;
        }

        .badge-3 {
          bottom: 20%;
          left: 15%;
        }

        .hero-deco {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          pointer-events: none;
        }

        .deco-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--terracotta-light), transparent);
          transform-origin: left;
        }

        .line-1 {
          bottom: 100px;
          left: 10%;
          width: 30%;
        }

        .deco-circle {
          position: absolute;
          bottom: 80px;
          right: 15%;
          width: 60px;
          height: 60px;
          border: 1px solid var(--sage);
          border-radius: 50%;
          opacity: 0.5;
        }

        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-visual {
            order: -1;
          }

          .hero-product-display {
            height: 350px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-actions {
            flex-direction: column;
          }

          .ingredient-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}