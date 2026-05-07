import { useEffect, useRef, useState, useCallback } from "react";

const PARTICLES = ["🌸", "✨", "🌺", "⭐", "🌼", "💫", "🍀", "🌷"];

const LEVELS = [
  { lv: 1, label: "🌱 Level 1", min: 0,    max: 100  },
  { lv: 2, label: "🌿 Level 2", min: 100,  max: 250  },
  { lv: 3, label: "🌸 Level 3", min: 250,  max: 500  },
  { lv: 4, label: "🔥 Level 4", min: 500,  max: 800  },
  { lv: 5, label: "⚡ Level 5", min: 800,  max: 1200 },
  { lv: 6, label: "🏆 Level 6", min: 1200, max: 1200 },
];

const XP_MAP = { high: 30, medium: 20, low: 10 };

const SECTOR_META = {
  work:     { emoji: "💼", label: "Work"     },
  study:    { emoji: "📚", label: "Study"    },
  exercise: { emoji: "💪", label: "Exercise" },
  self:     { emoji: "🧘", label: "Self-care"},
  personal: { emoji: "🏠", label: "Personal" },
  health:   { emoji: "❤️", label: "Health"   },
};

const BADGES = [
  { id: "first",    label: "☕ First Sip",    condition: (s) => s.done >= 1 },
  { id: "three",    label: "🌿 Sprouting",    condition: (s) => s.done >= 3 },
  { id: "five",     label: "🔥 On a Roll",    condition: (s) => s.done >= 5 },
  { id: "highfive", label: "🎯 Sharpshooter", condition: (s) => s.highDone >= 3 },
  { id: "champion", label: "🏆 Champion",     condition: (s) => s.lvIdx >= 5 },
];

const INITIAL_TASKS = [
  { id: 1, name: "📚 Study React hooks",  priority: "high",   sector: "study",    done: true  },
  { id: 2, name: "💪 Morning run 5km",    priority: "medium", sector: "exercise", done: true  },
  { id: 3, name: "💼 Submit assignment",  priority: "high",   sector: "work",     done: false },
];

const PRIO_FILTERS = [
  { val: "all",    label: "All"      },
  { val: "high",   label: "🔴 High"  },
  { val: "medium", label: "🟡 Med"   },
  { val: "low",    label: "🟢 Low"   },
];

const SECT_FILTERS = [
  { val: "all",      label: "All"       },
  { val: "work",     label: "💼 Work"    },
  { val: "study",    label: "📚 Study"   },
  { val: "exercise", label: "💪 Exercise"},
  { val: "self",     label: "🧘 Self"    },
  { val: "personal", label: "🏠 Personal"},
  { val: "health",   label: "❤️ Health"  },
];

function getLvIdx(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return i;
  }
  return 0;
}

function getXpPct(xp, lvIdx) {
  if (lvIdx >= LEVELS.length - 1) return 100;
  const { min, max } = LEVELS[lvIdx];
  return Math.min(100, Math.round(((xp - min) / (max - min)) * 100));
}

export default function HeroSection() {
  const particlesRef = useRef(null);

  const [tasks,      setTasks]      = useState(INITIAL_TASKS);
  const [xp,         setXp]         = useState(50);
  const [lvIdx,      setLvIdx]      = useState(0);
  const [done,       setDone]       = useState(2);
  const [highDone,   setHighDone]   = useState(1);
 const [badges, setBadges] = useState([]);
  const [toast,      setToast]      = useState(null);
  const [badgeLabel, setBadgeLabel] = useState("Champion unlocked!");
  const [filterPrio, setFilterPrio] = useState("all");
  const [filterSect, setFilterSect] = useState("all");
  const [newTask,    setNewTask]    = useState("");
  const [newPrio,    setNewPrio]    = useState("medium");
  const [newSector,  setNewSector]  = useState("work");
  const [nextId,     setNextId]     = useState(4);

  /* ── particles ── */
  const spawnParticles = useCallback((count = 8) => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement("span");
        el.className = "hero__particle";
        el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
        el.style.left = Math.random() * 100 + "%";
        el.style.animationDuration = 4 + Math.random() * 4 + "s";
        el.style.animationDelay = Math.random() * 0.4 + "s";
        el.style.fontSize = 12 + Math.random() * 16 + "px";
        container.appendChild(el);
        setTimeout(() => el.remove(), 8000);
      }, i * 80);
    }
  }, []);

  /* ── toast ── */
  const showToast = useCallback((msg) => {
    setToast({ msg, key: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  /* ── badges ── */
  const checkBadges = useCallback((state) => {
    setBadges((prev) => {
      const next = new Set(prev);
      BADGES.forEach((b) => {
        if (!prev.has(b.id) && b.condition(state)) {
          next.add(b.id);
          const clean = b.label.replace(/^\S+\s/, "");
          setBadgeLabel(clean + " unlocked!");
          setTimeout(() => showToast("🏅 Badge: " + b.label), 300);
          spawnParticles(10);
        }
      });
      return next;
    });
  }, [showToast, spawnParticles]);

  /* ── complete task ── */
  const completeTask = useCallback((id) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task || task.done) return prev;
      const gain = XP_MAP[task.priority] ?? 20;
      setXp((prevXp) => {
        const newXp    = prevXp + gain;
        const newLvIdx = getLvIdx(newXp);
        setLvIdx((prevLv) => {
          if (newLvIdx > prevLv) {
            spawnParticles(18);
            showToast("🎉 LEVEL UP! " + LEVELS[newLvIdx].label);
          }
          return newLvIdx;
        });
        return newXp;
      });
      const nd  = done + 1;
      const nhd = task.priority === "high" ? highDone + 1 : highDone;
      setDone(nd);
      if (task.priority === "high") setHighDone(nhd);
      checkBadges({ done: nd, highDone: nhd, lvIdx });
      spawnParticles(6);
      return prev.map((t) => (t.id === id ? { ...t, done: true } : t));
    });
  }, [done, highDone, lvIdx, checkBadges, spawnParticles, showToast]);

  /* ── delete task ── */
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── add task ── */
  const addTask = useCallback(() => {
    const name = newTask.trim();
    if (!name) return;
    setTasks((prev) => [
      { id: nextId, name, priority: newPrio, sector: newSector, done: false },
      ...prev,
    ]);
    setNextId((n) => n + 1);
    setNewTask("");
  }, [newTask, newPrio, newSector, nextId]);

  /* ── filtered view ── */
  const visibleTasks = tasks.filter((t) => {
    const pOk = filterPrio === "all" || t.priority === filterPrio;
    const sOk = filterSect === "all" || t.sector   === filterSect;
    return pOk && sOk;
  });

  const level   = LEVELS[lvIdx];
  const xpPct   = getXpPct(xp, lvIdx);
  const xpLabel = lvIdx >= LEVELS.length - 1
    ? `MAX LEVEL! ${xp} XP`
    : `${xp} / ${LEVELS[lvIdx].max} XP to next level`;

  return (
    <section className="hero" id="hero">

      {/* level-up / badge toast */}
      {toast && (
        <div className="hero__toast" key={toast.key}>{toast.msg}</div>
      )}

      {/* particle canvas */}
      <div className="hero__particles" ref={particlesRef} />

      {/* ─────────── LEFT — completely unchanged ─────────── */}
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
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">2.4K</span>
            <span className="hero__stat-label">Happy users</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">98%</span>
            <span className="hero__stat-label">Love it</span>
          </div>
        </div>
      </div>

      {/* ─────────── RIGHT — same structure, now interactive ─────────── */}
      <div className="hero__visual">

        {/* floating badge card — same class, dynamic text */}
        <div className="hero__card hero__card--badge">
          <span className="hero__badge-icon">🏆</span>
          <span className="hero__badge-text">{badgeLabel}</span>
        </div>

        {/* main card */}
        <div className="hero__card hero__card--main">

          <div className="hero__card-header">
            <span>☕ Xpresso</span>
            <span className="hero__card-lv">{level.label}</span>
          </div>

          {/* XP bar — animated */}
          <div className="hero__xp-bar">
            <div
              className="hero__xp-fill"
              style={{
                width: `${xpPct}%`,
                transition: "width 0.65s cubic-bezier(.34,1.56,.64,1)",
              }}
            />
          </div>
          <div className="hero__xp-label">{xpLabel}</div>

          {/* add-task row */}
          <div className="hero__add-row">
            <input
              className="hero__add-input"
              placeholder="New task…"
              value={newTask}
              maxLength={40}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <select
              className="hero__add-select"
              value={newPrio}
              onChange={(e) => setNewPrio(e.target.value)}
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Med</option>
              <option value="low">🟢 Low</option>
            </select>
            <select
              className="hero__add-select"
              value={newSector}
              onChange={(e) => setNewSector(e.target.value)}
            >
              {Object.entries(SECTOR_META).map(([k, v]) => (
                <option key={k} value={k}>{v.emoji} {v.label}</option>
              ))}
            </select>
            <button className="hero__add-btn" onClick={addTask}>+</button>
          </div>

          {/* filter pills — priority row */}
          <div className="hero__filter-row">
            {PRIO_FILTERS.map((f) => (
              <button
                key={f.val}
                className={`hero__filter-pill ${filterPrio === f.val ? "hero__filter-pill--active" : ""}`}
                onClick={() => setFilterPrio(f.val)}
              >
                {f.label}
              </button>
            ))}
            <span className="hero__filter-sep" />
            {SECT_FILTERS.map((f) => (
              <button
                key={f.val}
                className={`hero__filter-pill ${filterSect === f.val ? "hero__filter-pill--active" : ""}`}
                onClick={() => setFilterSect(f.val)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* task list */}
          <div className="hero__tasks-preview">
            {visibleTasks.length === 0 && (
              <p className="hero__tasks-empty">
                {tasks.length === 0 ? "✨ Add your first task!" : "No tasks match this filter."}
              </p>
            )}
            {visibleTasks.map((t) => {
              const sm = SECTOR_META[t.sector] || SECTOR_META.work;
              return (
                <div
                  key={t.id}
                  className={`hero__task ${t.done ? "hero__task--done" : "hero__task--pending"}`}
                  onClick={() => !t.done && completeTask(t.id)}
                >
                  <span className="hero__task-check">{t.done ? "✓" : ""}</span>
                  <span className={`hero__task-dot hero__task-dot--${t.priority}`} />
                  <span className="hero__task-sector-icon">{sm.emoji}</span>
                  <span className="hero__task-name">{t.name}</span>
                  <span className="hero__task-xp">+{XP_MAP[t.priority]} XP</span>
                  <button
                    className="hero__task-del"
                    onClick={(e) => { e.stopPropagation(); deleteTask(t.id); }}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* floating streak card — unchanged */}
        <div className="hero__card hero__card--streak">
          <span>🔥 7 day streak</span>
        </div>

      </div>
    </section>
  );
}