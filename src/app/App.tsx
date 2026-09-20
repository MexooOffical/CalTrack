import './app.css'

const weekDays = [
  { label: 'S', day: '1' },
  { label: 'S', day: '2' },
  { label: 'M', day: '3' },
  { label: 'T', day: '4' },
  { label: 'W', day: '5' },
  { label: 'T', day: '6' },
  { label: 'F', day: '7' },
]

const stats = [
  { value: '100g', label: 'Protein left', icon: '🥩', tone: 'rose' },
  { value: '99g', label: 'Carbs left', icon: '🌾', tone: 'amber' },
  { value: '25g', label: 'Fat left', icon: '🧈', tone: 'sky' },
]

export function App() {
  return (
    <main className="phone-shell">
      <div className="phone-frame">
        <header className="topbar">
          <div className="brand-badge">screensdesign</div>
          <div className="status-icons" aria-label="status">
            <span className="mini-bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="battery">
              <span className="battery-level" />
            </span>
            <span className="time">32</span>
          </div>
        </header>

        <section className="hero-row">
          <div className="title-wrap">
            <span className="apple-icon" aria-hidden="true"></span>
            <h1>Cal AI</h1>
          </div>

          <div className="burn-pill" aria-label="calories burned">
            <span className="flame-icon" aria-hidden="true">
              🔥
            </span>
            <span className="count">0</span>
          </div>
        </section>

        <section className="week-strip" aria-label="Week selection">
          {weekDays.map((day, index) => (
            <div
              key={`${day.label}-${day.day}`}
              className={`day-circle ${index === 2 ? 'selected' : ''}`}
            >
              <span className="day-letter">{day.label}</span>
              <span className="day-number">{day.day}</span>
            </div>
          ))}
        </section>

        <section className="summary-card">
          <div className="summary-left">
            <div className="big-number">1000</div>
            <div className="label">Calories left</div>
          </div>

          <div className="ring-badge">
            <span className="ring-flame" aria-hidden="true">
              🔥
            </span>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-icon ${stat.tone}`} aria-hidden="true">
                {stat.icon}
              </div>
            </article>
          ))}
        </section>

        <div className="pager-dots" aria-label="section indicator">
          <span className="dot active" />
          <span className="dot" />
        </div>

        <section className="logged-title">Recently logged</section>

        <section className="empty-state">
          <p>
            You haven't uploaded any food
            <br />
            Start tracking today's meals by taking
            <br />
            a quick picture.
          </p>

          <div className="hand-doodle" aria-hidden="true">
            <span className="drawn-line" />
          </div>
        </section>

        <nav className="bottom-nav" aria-label="Main navigation">
          <button className="nav-item active" type="button">
            <span className="nav-icon home-icon" aria-hidden="true">⌂</span>
            <span>Home</span>
          </button>

          <button className="nav-item" type="button">
            <span className="nav-icon chart-icon" aria-hidden="true">▤</span>
            <span>Analytics</span>
          </button>

          <button className="nav-item" type="button">
            <span className="nav-icon gear-icon" aria-hidden="true">⚙</span>
            <span>Settings</span>
          </button>

          <button className="action-button" type="button" aria-label="Add entry">
            +
          </button>
        </nav>
      </div>
    </main>
  )
}

