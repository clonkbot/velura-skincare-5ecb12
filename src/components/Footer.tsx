import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Velura</span>
          <p className="footer-tagline">Botanical skincare for radiant skin</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Shop</h4>
            <a href="#">Cleansers</a>
            <a href="#">Serums</a>
            <a href="#">Moisturizers</a>
            <a href="#">Treatments</a>
          </div>
          <div className="footer-column">
            <h4>Learn</h4>
            <a href="#">Skin Guide</a>
            <a href="#">Ingredients</a>
            <a href="#">Routine Builder</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Join Our Community</h4>
          <p>Get skincare tips and exclusive offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <span>© 2024 Velura. All rights reserved.</span>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <div className="footer-credit">
          Requested by <a href="https://twitter.com/Bagusprastbp" target="_blank" rel="noopener noreferrer">@Bagusprastbp</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--espresso);
          color: var(--cream);
          padding: 4rem 4rem 2rem;
          margin-top: 4rem;
          position: relative;
          z-index: 10;
        }

        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--terracotta), transparent);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1.5fr;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(247, 243, 238, 0.1);
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          letter-spacing: 0.1em;
          color: var(--cream);
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: rgba(247, 243, 238, 0.6);
          margin-top: 0.5rem;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-column h4 {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--terracotta-light);
          margin-bottom: 1.25rem;
        }

        .footer-column a {
          display: block;
          color: rgba(247, 243, 238, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }

        .footer-column a:hover {
          color: var(--cream);
        }

        .footer-newsletter h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .footer-newsletter p {
          font-size: 0.85rem;
          color: rgba(247, 243, 238, 0.6);
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-form input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: rgba(247, 243, 238, 0.1);
          border: 1px solid rgba(247, 243, 238, 0.2);
          border-radius: 4px;
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
        }

        .newsletter-form input::placeholder {
          color: rgba(247, 243, 238, 0.4);
        }

        .newsletter-form input:focus {
          outline: none;
          border-color: var(--terracotta);
        }

        .newsletter-form button {
          padding: 0.75rem 1.5rem;
          background: var(--terracotta);
          border: none;
          border-radius: 4px;
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .newsletter-form button:hover {
          background: var(--terracotta-light);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.8rem;
          color: rgba(247, 243, 238, 0.5);
        }

        .footer-legal a {
          color: rgba(247, 243, 238, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: var(--cream);
        }

        .footer-credit {
          font-size: 0.75rem;
          color: rgba(247, 243, 238, 0.4);
        }

        .footer-credit a {
          color: rgba(247, 243, 238, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-credit a:hover {
          color: var(--terracotta-light);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }

          .footer-newsletter {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .site-footer {
            padding: 3rem 2rem 1.5rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-newsletter {
            grid-column: span 1;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-legal {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}