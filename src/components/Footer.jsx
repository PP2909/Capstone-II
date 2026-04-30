export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">☕ Xpresso</div>
            <p className="footer__tagline">brew your productivity, one task at a time.</p>
            <div className="footer__socials">
              <a href="https://github.com/PP2909" target="_blank" rel="noreferrer" className="footer__social">GitHub</a>
              <a href="#" className="footer__social">Twitter</a>
              <a href="#" className="footer__social">LinkedIn</a>
            </div>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Product</div>
            <a href="#features">Features</a>
            <a href="#testimonials">Reviews</a>
            <a href="#hero">Get started</a>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">About</div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Stack</div>
            <a href="#">React JS</a>
            <a href="#">Pure CSS</a>
            <a href="#">Vite</a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            © 2025 Xpresso. All rights reserved.
          </div>
          <div className="footer__made">
            Made with <span className="footer__heart">♥</span> by{" "}
            <span className="footer__author">Pragya Sinha</span> 🌸
          </div>
        </div>
      </div>
    </footer>
  );
}