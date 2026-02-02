import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import RoutineBuilder from './components/RoutineBuilder'
import IngredientSpotlight from './components/IngredientSpotlight'
import ProductShowcase from './components/ProductShowcase'
import SkinQuiz from './components/SkinQuiz'
import Footer from './components/Footer'
import './styles.css'

function App() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <div className="app-container">
      {/* Floating botanical elements */}
      <div className="botanical-overlay">
        <motion.div
          className="botanical-circle botanical-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="botanical-circle botanical-2"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="botanical-circle botanical-3"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="main-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-logo">
          <span className="logo-text">Velura</span>
          <span className="logo-tagline">Botanical Skincare</span>
        </div>
        <div className="nav-links">
          {['home', 'routine', 'ingredients', 'products'].map((item, i) => (
            <motion.button
              key={item}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={() => setActiveSection(item)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              whileHover={{ y: -2 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="cta-button"
          onClick={() => setQuizOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Take Skin Quiz
        </motion.button>
      </motion.nav>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection onQuizStart={() => setQuizOpen(true)} />
              <IngredientSpotlight />
              <ProductShowcase />
            </motion.div>
          )}
          {activeSection === 'routine' && (
            <motion.div
              key="routine"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <RoutineBuilder />
            </motion.div>
          )}
          {activeSection === 'ingredients' && (
            <motion.div
              key="ingredients"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="full-section"
            >
              <IngredientSpotlight fullPage />
            </motion.div>
          )}
          {activeSection === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="full-section"
            >
              <ProductShowcase fullPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Skin Quiz Modal */}
      <AnimatePresence>
        {quizOpen && (
          <SkinQuiz onClose={() => setQuizOpen(false)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default App