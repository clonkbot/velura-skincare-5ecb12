import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizQuestion {
  id: string
  question: string
  options: { value: string; label: string; icon: string }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'skinType',
    question: "How would you describe your skin type?",
    options: [
      { value: 'oily', label: 'Oily', icon: '💧' },
      { value: 'dry', label: 'Dry', icon: '🏜️' },
      { value: 'combination', label: 'Combination', icon: '⚖️' },
      { value: 'normal', label: 'Normal', icon: '✨' },
    ]
  },
  {
    id: 'concerns',
    question: "What's your primary skin concern?",
    options: [
      { value: 'acne', label: 'Acne & Breakouts', icon: '🔴' },
      { value: 'aging', label: 'Fine Lines & Wrinkles', icon: '⏳' },
      { value: 'dullness', label: 'Dullness & Dark Spots', icon: '🌑' },
      { value: 'sensitivity', label: 'Redness & Sensitivity', icon: '🌸' },
    ]
  },
  {
    id: 'routine',
    question: "How many steps is your ideal routine?",
    options: [
      { value: 'minimal', label: '3-4 steps (Quick & Easy)', icon: '⚡' },
      { value: 'moderate', label: '5-6 steps (Balanced)', icon: '🎯' },
      { value: 'extensive', label: '7+ steps (Full Ritual)', icon: '🌿' },
    ]
  },
  {
    id: 'texture',
    question: "What textures do you prefer?",
    options: [
      { value: 'light', label: 'Lightweight & Water-based', icon: '💨' },
      { value: 'medium', label: 'Gel & Lotion', icon: '🧴' },
      { value: 'rich', label: 'Rich & Creamy', icon: '🧈' },
    ]
  },
]

interface SkinQuizProps {
  onClose: () => void
}

export default function SkinQuiz({ onClose }: SkinQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))

    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const getRecommendations = () => {
    const { skinType, concerns } = answers

    const products = []
    const ingredients = []

    // Based on skin type
    if (skinType === 'oily') {
      products.push('Pore Refining Toner', 'Lightweight Gel Moisturizer')
      ingredients.push('Niacinamide', 'Salicylic Acid')
    } else if (skinType === 'dry') {
      products.push('Hydra-Restore Cream', 'Clarity Cleansing Oil')
      ingredients.push('Ceramides', 'Hyaluronic Acid')
    } else {
      products.push('Botanical Glow Serum', 'Hydra-Restore Cream')
      ingredients.push('Hyaluronic Acid', 'Vitamin C')
    }

    // Based on concerns
    if (concerns === 'acne') {
      products.push('Pore Refining Toner')
      ingredients.push('Salicylic Acid', 'Niacinamide')
    } else if (concerns === 'aging') {
      products.push('Night Renewal Retinol')
      ingredients.push('Retinol', 'Peptides')
    } else if (concerns === 'dullness') {
      products.push('Botanical Glow Serum')
      ingredients.push('Vitamin C', 'AHA')
    } else if (concerns === 'sensitivity') {
      products.push('Calming Recovery Mask')
      ingredients.push('Centella', 'Ceramides')
    }

    return {
      products: [...new Set(products)].slice(0, 3),
      ingredients: [...new Set(ingredients)].slice(0, 4)
    }
  }

  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  return (
    <motion.div
      className="quiz-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="quiz-modal"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
      >
        <button className="quiz-close" onClick={onClose}>×</button>

        {!showResults ? (
          <>
            {/* Progress bar */}
            <div className="quiz-progress">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="quiz-header">
              <span className="quiz-step">Question {currentStep + 1} of {quizQuestions.length}</span>
              <h2 className="quiz-title">Skin Quiz</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="quiz-content"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="quiz-question">
                  {quizQuestions[currentStep].question}
                </h3>

                <div className="quiz-options">
                  {quizQuestions[currentStep].options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      className={`quiz-option ${answers[quizQuestions[currentStep].id] === option.value ? 'selected' : ''}`}
                      onClick={() => handleAnswer(quizQuestions[currentStep].id, option.value)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="option-icon">{option.icon}</span>
                      <span className="option-label">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            className="quiz-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="results-header">
              <motion.div
                className="results-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                ✨
              </motion.div>
              <h2 className="results-title">Your Personalized Routine</h2>
              <p className="results-subtitle">Based on your answers, here's what we recommend</p>
            </div>

            <div className="results-sections">
              <motion.div
                className="results-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="results-section-title">Recommended Products</h4>
                <div className="recommended-list">
                  {getRecommendations().products.map((product, i) => (
                    <motion.div
                      key={product}
                      className="recommended-item product"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <span className="item-icon">🧴</span>
                      <span>{product}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="results-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="results-section-title">Key Ingredients For You</h4>
                <div className="recommended-list">
                  {getRecommendations().ingredients.map((ingredient, i) => (
                    <motion.div
                      key={ingredient}
                      className="recommended-item ingredient"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <span className="item-icon">🌿</span>
                      <span>{ingredient}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.button
              className="start-routine-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
            >
              Start My Routine
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        .quiz-overlay {
          position: fixed;
          inset: 0;
          background: rgba(45, 35, 25, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .quiz-modal {
          background: var(--cream);
          border-radius: 20px;
          width: 100%;
          max-width: 550px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(45, 35, 25, 0.3);
        }

        .quiz-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
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
          z-index: 10;
        }

        .quiz-close:hover {
          background: var(--terracotta);
          color: var(--cream);
        }

        .quiz-progress {
          height: 4px;
          background: var(--blush-light);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--terracotta), var(--gold));
        }

        .quiz-header {
          padding: 2rem 2rem 1rem;
          text-align: center;
        }

        .quiz-step {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--terracotta);
        }

        .quiz-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          color: var(--espresso);
          margin-top: 0.5rem;
        }

        .quiz-content {
          padding: 0 2rem 2.5rem;
        }

        .quiz-question {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--espresso);
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.4;
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .quiz-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: rgba(255,255,255,0.7);
          border: 2px solid rgba(193, 122, 90, 0.15);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }

        .quiz-option:hover {
          border-color: var(--terracotta);
          background: rgba(255,255,255,0.9);
        }

        .quiz-option.selected {
          background: linear-gradient(135deg, var(--blush-light), rgba(255,255,255,0.9));
          border-color: var(--terracotta);
        }

        .option-icon {
          font-size: 1.5rem;
        }

        .option-label {
          font-size: 1rem;
          color: var(--espresso);
        }

        /* Results */
        .quiz-results {
          padding: 2.5rem;
        }

        .results-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .results-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .results-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          color: var(--espresso);
        }

        .results-subtitle {
          color: var(--espresso-light);
          margin-top: 0.5rem;
        }

        .results-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .results-section {
          background: rgba(255,255,255,0.5);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .results-section-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--terracotta);
          margin-bottom: 1rem;
        }

        .recommended-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .recommended-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--cream);
          border-radius: 8px;
          font-size: 0.95rem;
          color: var(--espresso);
        }

        .item-icon {
          font-size: 1.2rem;
        }

        .start-routine-btn {
          width: 100%;
          margin-top: 2rem;
          padding: 1.1rem;
          background: var(--terracotta);
          color: var(--cream);
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-routine-btn:hover {
          background: var(--espresso);
        }

        @media (max-width: 600px) {
          .quiz-modal {
            max-height: 90vh;
            overflow-y: auto;
          }

          .quiz-content,
          .quiz-results {
            padding: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  )
}