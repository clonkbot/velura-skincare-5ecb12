import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string
  name: string
  category: string
  description: string
  ingredients: string[]
  price: number
  rating: number
  reviews: number
  skinTypes: string[]
  color: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Botanical Glow Serum',
    category: 'Serum',
    description: 'A potent vitamin C serum that brightens and protects with antioxidant-rich botanical extracts.',
    ingredients: ['Vitamin C', 'Niacinamide', 'Ferulic Acid', 'Aloe Vera'],
    price: 68,
    rating: 4.9,
    reviews: 324,
    skinTypes: ['All skin types', 'Dull skin'],
    color: '#F4C77A'
  },
  {
    id: '2',
    name: 'Hydra-Restore Cream',
    category: 'Moisturizer',
    description: 'Deep hydration meets barrier repair with ceramides and hyaluronic acid complex.',
    ingredients: ['Ceramides', 'Hyaluronic Acid', 'Squalane', 'Peptides'],
    price: 54,
    rating: 4.8,
    reviews: 189,
    skinTypes: ['Dry skin', 'Mature skin'],
    color: '#B8D4E3'
  },
  {
    id: '3',
    name: 'Clarity Cleansing Oil',
    category: 'Cleanser',
    description: 'Gentle yet effective oil cleanser that melts away makeup while nourishing skin.',
    ingredients: ['Jojoba Oil', 'Green Tea', 'Vitamin E', 'Chamomile'],
    price: 42,
    rating: 4.7,
    reviews: 256,
    skinTypes: ['All skin types', 'Sensitive skin'],
    color: '#A8B5A0'
  },
  {
    id: '4',
    name: 'Night Renewal Retinol',
    category: 'Treatment',
    description: 'Encapsulated retinol for gentle yet effective anti-aging results overnight.',
    ingredients: ['Retinol', 'Bakuchiol', 'Rosehip Oil', 'Vitamin E'],
    price: 76,
    rating: 4.9,
    reviews: 412,
    skinTypes: ['Mature skin', 'Acne-prone'],
    color: '#D4A574'
  },
  {
    id: '5',
    name: 'Pore Refining Toner',
    category: 'Toner',
    description: 'BHA-infused toner that gently exfoliates and minimizes the appearance of pores.',
    ingredients: ['Salicylic Acid', 'Niacinamide', 'Witch Hazel', 'Tea Tree'],
    price: 38,
    rating: 4.6,
    reviews: 178,
    skinTypes: ['Oily skin', 'Acne-prone'],
    color: '#C17A5A'
  },
  {
    id: '6',
    name: 'Calming Recovery Mask',
    category: 'Mask',
    description: 'Soothing overnight mask with centella and cica to calm irritated, stressed skin.',
    ingredients: ['Centella Asiatica', 'Cica', 'Aloe Vera', 'Panthenol'],
    price: 48,
    rating: 4.8,
    reviews: 203,
    skinTypes: ['Sensitive skin', 'All skin types'],
    color: '#E8D5D0'
  },
]

const categories = ['All', 'Serum', 'Moisturizer', 'Cleanser', 'Treatment', 'Toner', 'Mask']

interface ProductShowcaseProps {
  fullPage?: boolean
}

export default function ProductShowcase({ fullPage = false }: ProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const displayProducts = fullPage ? products : products.slice(0, 3)
  const filteredProducts = selectedCategory === 'All'
    ? displayProducts
    : displayProducts.filter(p => p.category === selectedCategory)

  return (
    <section className={`product-showcase ${fullPage ? 'full-page' : ''}`}>
      <div className="showcase-header">
        <motion.span
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Curated Collection
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Botanical Essentials
        </motion.h2>
      </div>

      {fullPage && (
        <motion.div
          className="category-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      <div className="products-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              layout
              style={{
                '--product-color': product.color
              } as React.CSSProperties}
            >
              {/* Product visual */}
              <div className="product-visual">
                <motion.div
                  className="product-bottle-display"
                  animate={{
                    rotateY: hoveredProduct === product.id ? 10 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mini-bottle">
                    <div className="mini-cap" />
                    <div className="mini-body" style={{ background: `linear-gradient(135deg, ${product.color}40, ${product.color}80)` }}>
                      <span className="mini-label">V</span>
                    </div>
                  </div>
                  <motion.div
                    className="product-glow"
                    style={{ background: product.color }}
                    animate={{
                      scale: hoveredProduct === product.id ? 1.5 : 1,
                      opacity: hoveredProduct === product.id ? 0.4 : 0.2
                    }}
                  />
                </motion.div>
                <span className="product-category-tag">{product.category}</span>
              </div>

              {/* Product info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-ingredients">
                  {product.ingredients.slice(0, 3).map(ing => (
                    <span key={ing} className="ingredient-pill">{ing}</span>
                  ))}
                  {product.ingredients.length > 3 && (
                    <span className="ingredient-pill more">+{product.ingredients.length - 3}</span>
                  )}
                </div>

                <div className="product-meta">
                  <div className="product-rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="rating-value">{product.rating}</span>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                  <div className="product-price">${product.price}</div>
                </div>

                <motion.button
                  className="add-to-routine"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Routine
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!fullPage && (
        <motion.div
          className="view-all-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="view-all-line" />
          <button className="view-all-btn">View All Products</button>
          <span className="view-all-line" />
        </motion.div>
      )}

      <style>{`
        .product-showcase {
          padding: 6rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .product-showcase.full-page {
          padding-top: 2rem;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(193, 122, 90, 0.3);
          border-radius: 25px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--espresso-light);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: var(--terracotta);
          color: var(--terracotta);
        }

        .filter-btn.active {
          background: var(--terracotta);
          border-color: var(--terracotta);
          color: var(--cream);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(193, 122, 90, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .product-card:hover {
          box-shadow: 0 25px 50px rgba(45, 35, 25, 0.15);
          border-color: var(--product-color);
        }

        .product-visual {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, var(--cream-dark) 0%, var(--blush-light) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-bottle-display {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mini-bottle {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .mini-cap {
          width: 24px;
          height: 16px;
          background: linear-gradient(135deg, var(--gold), #B8956A);
          border-radius: 3px 3px 0 0;
        }

        .mini-body {
          width: 70px;
          height: 100px;
          border-radius: 6px 6px 12px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(45, 35, 25, 0.2);
        }

        .mini-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: var(--espresso);
          opacity: 0.5;
        }

        .product-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          z-index: 1;
        }

        .product-category-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--terracotta);
          background: rgba(255,255,255,0.9);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: var(--espresso);
          margin-bottom: 0.5rem;
        }

        .product-description {
          font-size: 0.85rem;
          color: var(--espresso-light);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .product-ingredients {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .ingredient-pill {
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          background: var(--blush-light);
          border-radius: 12px;
          color: var(--espresso-light);
        }

        .ingredient-pill.more {
          background: var(--cream-dark);
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .stars {
          color: var(--gold);
          font-size: 0.9rem;
        }

        .rating-value {
          font-weight: 500;
          color: var(--espresso);
          font-size: 0.9rem;
        }

        .review-count {
          font-size: 0.75rem;
          color: var(--espresso-light);
        }

        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--terracotta);
        }

        .add-to-routine {
          width: 100%;
          padding: 0.9rem;
          background: var(--espresso);
          color: var(--cream);
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-to-routine:hover {
          background: var(--terracotta);
        }

        .view-all-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-top: 4rem;
        }

        .view-all-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--terracotta-light), transparent);
        }

        .view-all-btn {
          background: none;
          border: 1px solid var(--terracotta);
          color: var(--terracotta);
          padding: 1rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .view-all-btn:hover {
          background: var(--terracotta);
          color: var(--cream);
        }

        @media (max-width: 768px) {
          .product-showcase {
            padding: 4rem 2rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}