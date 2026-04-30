const FEATURES = [
  {
    icon: "⚡",
    title: "XP & Levelling",
    desc: "Earn XP for every task you complete. Watch yourself grow from 🌱 Sprout to 🏆 Champion.",
    color: "#FFF3E0",
    border: "#F0C878",
  },
  {
    icon: "🔥",
    title: "Daily Streaks",
    desc: "Build momentum with daily streaks. Miss a day, lose the flame — stay consistent, stay lit.",
    color: "#FFF0F0",
    border: "#F5BABA",
  },
  {
    icon: "🏆",
    title: "Badges & Achievements",
    desc: "Unlock beautiful badges as you hit milestones. First Sip → Blooming → On Fire → Champion.",
    color: "#FFFBE6",
    border: "#E8D87A",
  },
  {
    icon: "🎯",
    title: "Smart Priorities",
    desc: "Tag tasks as High 🔴, Medium 🟡, or Low 🟢 priority. High priority = more XP. Choose wisely.",
    color: "#F0F8FF",
    border: "#A8D4F5",
  },
  {
    icon: "🌸",
    title: "Bloom Animations",
    desc: "Complete a task and watch flowers burst across your screen. Productivity never felt this pretty.",
    color: "#FFF0F8",
    border: "#F5BAE0",
  },
  {
    icon: "💾",
    title: "Auto-Save Progress",
    desc: "Your tasks, XP, and streaks are saved locally. Come back anytime — your progress waits for you.",
    color: "#F0FFF4",
    border: "#A8E8C0",
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__inner">
        <div className="features__header">
          <span className="section__badge">✨ What's inside</span>
          <h2 className="section__title">Everything you need to<br /><span className="gradient-text">stay in the zone</span></h2>
          <p className="section__sub">
            Built for people who want their productivity to feel like a reward, not a chore.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <div
              className="feature-card"
              key={i}
              style={{ "--card-bg": f.color, "--card-border": f.border }}
            >
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}