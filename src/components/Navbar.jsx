import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <div className="navbar__logo">
          <span className="navbar__logo-icon">☕</span>
          <span className="navbar__logo-text">Xpresso</span>
        </div>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
          <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a></li>
          <li><a href="#footer" onClick={() => setMenuOpen(false)}>About</a></li>
        </ul>

        <a href="#hero" className="navbar__cta">Start Brewing →</a>

        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}