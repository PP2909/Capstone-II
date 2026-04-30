import { useEffect, useRef } from "react";

const PARTICLES = ["🌸", "✨", "🌺", "⭐", "🌼", "💫", "🍀", "🌷"];

export default function HeroSection() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const create = () => {
      const el = document.createElement("span");
      el.className = "hero__particle";
      el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.animationDuration = 4 + Math.random() * 4 + "s";
      el.style.animationDelay = Math.random() * 2 + "s";
      el.style.fontSize = 12 + Math.random() * 16 + "px";
      container.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    };

    const interval = setInterval(create, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__particles" ref={particlesRef}></div>

      <div className="hero__content">
        <div className="hero__badge">✨ Productivity reimagined</div>

        <h1 className="hero__title">
          Brew your best
          <span className="hero__title-accent"> day. ☕</span>
        </h1>

        <p className="hero__sub">
          Xpresso turns your to-do list into a gamified journey. Earn XP,
          level up, collect badges — and actually enjoy getting things done.
        </p>

        <div className="hero__actions">
          <a href="#features" className="hero__btn hero__btn--primary">
            🌱 Start for free
          </a>
          <a href="#features" className="hero__btn hero__btn--ghost">
            See how it works →
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">10K+</span>
            <span className="hero__stat-label">Tasks brewed</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-num">2.4K</span>
            <span className="hero__stat-label">Happy users</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-num">98%</span>
            <span className="hero__stat-label">Love it</span>
          </div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__card hero__card--main">
          <div className="hero__card-header">
            <span>☕ Xpresso</span>
            <span className="hero__card-lv">🌸 Level 3</span>
          </div>
          <div className="hero__xp-bar">
            <div className="hero__xp-fill" style={{ width: "68%" }}></div>
          </div>
          <div className="hero__xp-label">68 / 100 XP to next level</div>
          <div className="hero__tasks-preview">
            {[
              { label: "📚 Study React hooks", done: true, xp: "+30 XP" },
              { label: "💪 Morning run 5km", done: true, xp: "+20 XP" },
              { label: "💼 Submit assignment", done: false, xp: "+30 XP" },
            ].map((t, i) => (
              <div key={i} className={`hero__task ${t.done ? "hero__task--done" : ""}`}>
                <span className="hero__task-check">{t.done ? "✓" : ""}</span>
                <span className="hero__task-name">{t.label}</span>
                <span className="hero__task-xp">{t.xp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__card hero__card--badge">
          <span className="hero__badge-icon">🏆</span>
          <span className="hero__badge-text">Champion unlocked!</span>
        </div>

        <div className="hero__card hero__card--streak">
          <span>🔥 7 day streak</span>
        </div>
      </div>
    </section>
  );
}