const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    role: "CS Student, Delhi",
    avatar: "🌸",
    stars: 5,
    text: "I used to procrastinate everything. Xpresso made me actually want to complete tasks just to see the bloom animation. I finished 3 assignments in one day!",
    badge: "🏆 Champion",
  },
  {
    name: "Rohan Mehta",
    role: "Freelance Designer",
    avatar: "⭐",
    stars: 5,
    text: "The XP system is genuinely addictive. I set my client work as 'High Priority' and now I race to finish them first just for the extra XP. Game changer.",
    badge: "🔥 On Fire",
  },
  {
    name: "Priya Kapoor",
    role: "BCA Student, Gurugram",
    avatar: "🌺",
    stars: 5,
    text: "Finally a task app that doesn't feel like a spreadsheet. The espresso theme is beautiful and the streak feature keeps me logging in every single day.",
    badge: "🌸 Blooming",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__inner">
        <div className="testimonials__header">
          <span className="section__badge">💬 Real reviews</span>
          <h2 className="section__title">People are <span className="gradient-text">obsessed</span></h2>
          <p className="section__sub">
            Join thousands of users who turned their daily grind into a daily grind ☕
          </p>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-card__top">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div className="testimonial-card__info">
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
                <div className="testimonial-card__badge">{t.badge}</div>
              </div>
              <div className="testimonial-card__stars">
                {"★".repeat(t.stars)}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
            </div>
          ))}
        </div>

        <div className="cta-band">
          <h3 className="cta-band__title">Ready to brew your best day? ☕</h3>
          <p className="cta-band__sub">Free forever. No sign-up. Just open and start.</p>
          <a href="#hero" className="cta-band__btn">🌱 Get started now</a>
        </div>
      </div>
    </section>
  );
}