import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RoutineStep {
  id: string
  name: string
  time: 'morning' | 'evening' | 'both'
  category: string
  description: string
  icon: string
}

const routineSteps: RoutineStep[] = [
  { id: '1', name: 'Oil Cleanser', time: 'evening', category: 'Cleanse', description: 'Dissolve makeup and sunscreen', icon: '🫧' },
  { id: '2', name: 'Water Cleanser', time: 'both', category: 'Cleanse', description: 'Remove water-based impurities', icon: '💧' },
  { id: '3', name: 'Toner', time: 'both', category: 'Prep', description: 'Balance pH and prep skin', icon: '🌸' },
  { id: '4', name: 'Essence', time: 'both', category: 'Treat', description: 'Boost hydration and absorption', icon: '✨' },
  { id: '5', name: 'Serum', time: 'both', category: 'Treat', description: 'Target specific concerns', icon: '💎' },
  { id: '6', name: 'Eye Cream', time: 'both', category: 'Treat', description: 'Nourish delicate eye area', icon: '👁️' },
  { id: '7', name: 'Moisturizer', time: 'both', category: 'Hydrate', description: 'Lock in moisture', icon: '🧴' },
  { id: '8', name: 'Face Oil', time: 'evening', category: 'Hydrate', description: 'Seal with nourishing oils', icon: '🌿' },
  { id: '9', name: 'SPF', time: 'morning', category: 'Protect', description: 'Shield from UV damage', icon: '☀️' },
  { id: '10', name: 'Retinol', time: 'evening', category: 'Treat', description: 'Cell turnover & anti-aging', icon: '🌙' },
]

export default function RoutineBuilder() {
  const [selectedTime, setSelectedTime] = useState<'morning' | 'evening'>('morning')
  const [selectedSteps, setSelectedSteps] = useState<string[]>(['2', '3', '5', '7', '9'])

  const filteredSteps = routineSteps.filter(
    step => step.time === selectedTime || step.time === 'both'
  )

  const myRoutine = routineSteps.filter(step => selectedSteps.includes(step.id))
  const myRoutineFiltered = myRoutine.filter(
    step => step.time === selectedTime || step.time === 'both'
  )

  const toggleStep = (id: string) => {
    setSelectedSteps(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  return (
    <section className="routine-builder">
      <div className="routine-header">
        <motion.span
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Personalize Your Care
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Build Your Routine
        </motion.h2>
      </div>

      <div className="routine-content">
        {/* Time Toggle */}
        <motion.div
          className="time-toggle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            className={`time-btn ${selectedTime === 'morning' ? 'active' : ''}`}
            onClick={() => setSelectedTime('morning')}
          >
            <span className="time-icon">☀️</span>
            <span>Morning</span>
          </button>
          <button
            className={`time-btn ${selectedTime === 'evening' ? 'active' : ''}`}
            onClick={() => setSelectedTime('evening')}
          >
            <span className="time-icon">🌙</span>
            <span>Evening</span>
          </button>
        </motion.div>

        <div className="routine-grid">
          {/* Available Steps */}
          <motion.div
            className="steps-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="panel-title">Available Steps</h3>
            <p className="panel-description">
              Click to add or remove from your routine
            </p>
            <div className="steps-list">
              <AnimatePresence>
                {filteredSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`step-card ${selectedSteps.includes(step.id) ? 'selected' : ''}`}
                    onClick={() => toggleStep(step.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="step-icon">{step.icon}</span>
                    <div className="step-info">
                      <span className="step-name">{step.name}</span>
                      <span className="step-category">{step.category}</span>
                    </div>
                    <motion.div
                      className="step-check"
                      initial={false}
                      animate={{
                        scale: selectedSteps.includes(step.id) ? 1 : 0,
                        opacity: selectedSteps.includes(step.id) ? 1 : 0
                      }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* My Routine */}
          <motion.div
            className="my-routine-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="panel-title">
              My {selectedTime === 'morning' ? 'Morning' : 'Evening'} Routine
            </h3>
            <p className="panel-description">
              {myRoutineFiltered.length} steps selected
            </p>

            <div className="routine-timeline">
              <AnimatePresence mode="popLayout">
                {myRoutineFiltered.length === 0 ? (
                  <motion.div
                    className="empty-routine"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="empty-icon">🌿</span>
                    <p>Add steps to build your routine</p>
                  </motion.div>
                ) : (
                  myRoutineFiltered.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="timeline-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <div className="timeline-marker">
                        <span className="marker-number">{index + 1}</span>
                        {index < myRoutineFiltered.length - 1 && (
                          <div className="timeline-line" />
                        )}
                      </div>
                      <div className="timeline-content">
                        <span className="timeline-icon">{step.icon}</span>
                        <div className="timeline-info">
                          <span className="timeline-name">{step.name}</span>
                          <span className="timeline-desc">{step.description}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {myRoutineFiltered.length > 0 && (
              <motion.div
                className="routine-summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="summary-item">
                  <span className="summary-label">Estimated Time</span>
                  <span className="summary-value">{myRoutineFiltered.length * 2} min</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Skin Goals</span>
                  <span className="summary-value">Hydration & Glow</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .routine-builder {
          padding: 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .routine-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .time-toggle {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .time-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(193, 122, 90, 0.2);
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--espresso-light);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .time-btn:hover {
          background: rgba(255,255,255,0.8);
          border-color: var(--terracotta);
        }

        .time-btn.active {
          background: var(--terracotta);
          color: var(--cream);
          border-color: var(--terracotta);
        }

        .time-icon {
          font-size: 1.2rem;
        }

        .routine-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .steps-panel,
        .my-routine-panel {
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(193, 122, 90, 0.1);
          border-radius: 8px;
          padding: 2rem;
        }

        .panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: var(--espresso);
          margin-bottom: 0.5rem;
        }

        .panel-description {
          font-size: 0.85rem;
          color: var(--espresso-light);
          margin-bottom: 1.5rem;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .step-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(193, 122, 90, 0.1);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .step-card:hover {
          border-color: var(--terracotta);
          box-shadow: 0 4px 15px rgba(193, 122, 90, 0.1);
        }

        .step-card.selected {
          background: linear-gradient(135deg, var(--blush-light), rgba(255,255,255,0.9));
          border-color: var(--terracotta);
        }

        .step-icon {
          font-size: 1.5rem;
          width: 40px;
          text-align: center;
        }

        .step-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .step-name {
          font-weight: 500;
          color: var(--espresso);
        }

        .step-category {
          font-size: 0.75rem;
          color: var(--terracotta);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .step-check {
          width: 24px;
          height: 24px;
          background: var(--terracotta);
          color: var(--cream);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .routine-timeline {
          min-height: 300px;
        }

        .empty-routine {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--espresso-light);
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .timeline-step {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 30px;
        }

        .marker-number {
          width: 30px;
          height: 30px;
          background: var(--terracotta);
          color: var(--cream);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .timeline-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(to bottom, var(--terracotta), var(--blush));
          margin-top: 8px;
          min-height: 30px;
        }

        .timeline-content {
          flex: 1;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.5);
          border-radius: 8px;
          border: 1px solid rgba(193, 122, 90, 0.1);
        }

        .timeline-icon {
          font-size: 1.3rem;
        }

        .timeline-info {
          display: flex;
          flex-direction: column;
        }

        .timeline-name {
          font-weight: 500;
          color: var(--espresso);
        }

        .timeline-desc {
          font-size: 0.8rem;
          color: var(--espresso-light);
        }

        .routine-summary {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(193, 122, 90, 0.2);
          display: flex;
          gap: 2rem;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
        }

        .summary-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--espresso-light);
        }

        .summary-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--terracotta);
        }

        @media (max-width: 1024px) {
          .routine-builder {
            padding: 2rem;
          }

          .routine-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .time-toggle {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}