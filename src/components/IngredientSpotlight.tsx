import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ingredient {
  id: string
  name: string
  sciName: string
  icon: string
  color: string
  benefits: string[]
  bestFor: string[]
  description: string
  avoidWith: string[]
}

const ingredients: Ingredient[] = [
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    sciName: 'Vitamin B3',
    icon: '🌿',
    color: '#A8B5A0',
    benefits: ['Minimizes pores', 'Regulates oil', 'Brightens skin', 'Strengthens barrier'],
    bestFor: ['Oily skin', 'Acne-prone', 'Uneven tone'],
    description: 'A versatile vitamin that works for almost everyone. It helps regulate sebum production, minimize the appearance of pores, and improve overall skin texture.',
    avoidWith: ['Vitamin C (use separately)']
  },
  {
    id: 'hyaluronic',
    name: 'Hyaluronic Acid',
    sciName: 'Sodium Hyaluronate',
    icon: '💧',
    color: '#B8D4E3',
    benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines', 'Lightweight moisture'],
    bestFor: ['Dehydrated skin', 'All skin types', 'Aging concerns'],
    description: 'A powerful humectant that can hold up to 1000x its weight in water. It draws moisture from the environment into your skin for lasting hydration.',
    avoidWith: []
  },
  {
    id: 'retinol',
    name: 'Retinol',
    sciName: 'Vitamin A',
    icon: '🌙',
    color: '#D4A574',
    benefits: ['Anti-aging', 'Cell turnover', 'Reduces wrinkles', 'Clears acne'],
    bestFor: ['Mature skin', 'Acne', 'Sun damage'],
    description: 'The gold standard in anti-aging. It accelerates cell turnover, boosts collagen production, and helps fade dark spots. Start slow and always use SPF.',
    avoidWith: ['AHA/BHA', 'Vitamin C', 'Benzoyl Peroxide']
  },
  {
    id: 'vitaminc',
    name: 'Vitamin C',
    sciName: 'L-Ascorbic Acid',
    icon: '🍊',
    color: '#F4C77A',
    benefits: ['Brightening', 'Antioxidant', 'Collagen boost', 'UV protection'],
    bestFor: ['Dull skin', 'Hyperpigmentation', 'Anti-aging'],
    description: 'A potent antioxidant that protects against environmental damage, brightens the complexion, and supports collagen production. Best used in the morning.',
    avoidWith: ['Niacinamide (use separately)', 'Retinol']
  },
  {
    id: 'salicylic',
    name: 'Salicylic Acid',
    sciName: 'Beta Hydroxy Acid',
    icon: '🧪',
    color: '#C17A5A',
    benefits: ['Unclogs pores', 'Exfoliates', 'Reduces acne', 'Controls oil'],
    bestFor: ['Acne-prone', 'Oily skin', 'Blackheads'],
    description: 'Oil-soluble acid that penetrates deep into pores to dissolve sebum and dead skin cells. Ideal for treating and preventing breakouts.',
    avoidWith: ['Other acids', 'Retinol']
  },
  {
    id: 'ceramides',
    name: 'Ceramides',
    sciName: 'Sphingolipids',
    icon: '🛡️',
    color: '#E8D5D0',
    benefits: ['Barrier repair', 'Locks moisture', 'Soothes irritation', 'Anti-aging'],
    bestFor: ['Dry skin', 'Sensitive skin', 'Eczema'],
    description: 'Natural lipids that make up 50% of your skin barrier. They help retain moisture, protect against environmental damage, and keep skin smooth.',
    avoidWith: []
  },
]

interface IngredientSpotlightProps {
  fullPage?: boolean
}

export default function IngredientSpotlight({ fullPage = false }: IngredientSpotlightProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)

  const displayIngredients = fullPage ? ingredients : ingredients.slice(0, 4)

  return (
    <section className={`ingredient-spotlight ${fullPage ? 'full-page' : ''}`}>
      <div className="spotlight-header">
        <motion.span
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Know Your Ingredients
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Ingredient Spotlight
        </motion.h2>
        <motion.p
          className="spotlight-description"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Understanding what goes on your skin is the first step to a healthier complexion.
          Learn about the key actives and how they can transform your routine.
        </motion.p>
      </div>

      <div className="ingredients-grid">
        {displayIngredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.id}
            className="ingredient-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedIngredient(ingredient)}
            style={{
              '--accent-color': ingredient.color
            } as React.CSSProperties}
          >
            <div className="ingredient-icon-wrapper">
              <div
                className="icon-glow"
                style={{ background: ingredient.color }}
              />
              <span className="ingredient-icon">{ingredient.icon}</span>
            </div>
            <h3 className="ingredient-name">{ingredient.name}</h3>
            <p className="ingredient-sci">{ingredient.sciName}</p>
            <div className="ingredient-benefits">
              {ingredient.benefits.slice(0, 2).map(benefit => (
                <span key={benefit} className="benefit-tag">
                  {benefit}
                </span>
              ))}
            </div>
            <button className="learn-more">
              Learn More
              <span className="arrow">→</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Ingredient Detail Modal */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIngredient(null)}
          >
            <motion.div
              className="ingredient-modal"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{
                '--accent-color': selectedIngredient.color
              } as React.CSSProperties}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedIngredient(null)}
              >
                ×
              </button>

              <div className="modal-header">
                <div
                  className="modal-icon-bg"
                  style={{ background: selectedIngredient.color }}
                >
                  <span className="modal-icon">{selectedIngredient.icon}</span>
                </div>
                <div className="modal-titles">
                  <h3 className="modal-name">{selectedIngredient.name}</h3>
                  <p className="modal-sci">{selectedIngredient.sciName}</p>
                </div>
              </div>

              <p className="modal-description">{selectedIngredient.description}</p>

              <div className="modal-section">
                <h4 className="modal-section-title">Benefits</h4>
                <div className="modal-tags">
                  {selectedIngredient.benefits.map(benefit => (
                    <span key={benefit} className="modal-tag benefit">
                      ✓ {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4 className="modal-section-title">Best For</h4>
                <div className="modal-tags">
                  {selectedIngredient.bestFor.map(item => (
                    <span key={item} className="modal-tag skin-type">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {selectedIngredient.avoidWith.length > 0 && (
                <div className="modal-section">
                  <h4 className="modal-section-title warning">Avoid Combining With</h4>
                  <div className="modal-tags">
                    {selectedIngredient.avoidWith.map(item => (
                      <span key={item} className="modal-tag avoid">
                        ⚠️ {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ingredient-spotlight {
          padding: 6rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .ingredient-spotlight.full-page {
          padding-top: 2rem;
        }

        .spotlight-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 4rem;
        }

        .spotlight-description {
          color: var(--espresso-light);
          line-height: 1.8;
          margin-top: 1rem;
        }

        .ingredients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .ingredient-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(193, 122, 90, 0.1);
          border-radius: 12px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .ingredient-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--accent-color);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .ingredient-card:hover {
          box-shadow: 0 20px 50px rgba(45, 35, 25, 0.12);
          border-color: var(--accent-color);
        }

        .ingredient-card:hover::before {
          transform: scaleX(1);
        }

        .ingredient-icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          margin-bottom: 1.5rem;
        }

        .icon-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0.2;
          filter: blur(10px);
        }

        .ingredient-icon {
          position: relative;
          font-size: 2.5rem;
          display: block;
        }

        .ingredient-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          color: var(--espresso);
          margin-bottom: 0.25rem;
        }

        .ingredient-sci {
          font-size: 0.8rem;
          color: var(--terracotta);
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .ingredient-benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .benefit-tag {
          font-size: 0.7rem;
          padding: 0.35rem 0.75rem;
          background: var(--blush-light);
          border-radius: 20px;
          color: var(--espresso);
        }

        .learn-more {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--terracotta);
          cursor: pointer;
          transition: gap 0.3s ease;
        }

        .learn-more:hover {
          gap: 0.75rem;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .learn-more:hover .arrow {
          transform: translateX(3px);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(45, 35, 25, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .ingredient-modal {
          background: var(--cream);
          border-radius: 16px;
          padding: 2.5rem;
          max-width: 500px;
          width: 100%;
          position: relative;
          box-shadow: 0 30px 60px rgba(45, 35, 25, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          background: rgba(193, 122, 90, 0.1);
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          color: var(--espresso);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: var(--terracotta);
          color: var(--cream);
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .modal-icon-bg {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }

        .modal-icon {
          font-size: 2rem;
        }

        .modal-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          color: var(--espresso);
        }

        .modal-sci {
          color: var(--terracotta);
          font-size: 0.9rem;
        }

        .modal-description {
          color: var(--espresso-light);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .modal-section {
          margin-bottom: 1.5rem;
        }

        .modal-section-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--espresso);
          margin-bottom: 0.75rem;
        }

        .modal-section-title.warning {
          color: var(--terracotta);
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .modal-tag {
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }

        .modal-tag.benefit {
          background: rgba(168, 181, 160, 0.2);
          color: var(--sage-dark);
        }

        .modal-tag.skin-type {
          background: rgba(193, 122, 90, 0.15);
          color: var(--terracotta);
        }

        .modal-tag.avoid {
          background: rgba(193, 122, 90, 0.2);
          color: var(--terracotta);
        }

        @media (max-width: 768px) {
          .ingredient-spotlight {
            padding: 4rem 2rem;
          }

          .ingredients-grid {
            grid-template-columns: 1fr;
          }

          .ingredient-modal {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}