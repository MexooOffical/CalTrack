import { useMemo, useState, type ReactNode } from 'react'
import './app.css'

type IconName = 'bell' | 'chevron-left' | 'chevron-right' | 'more' | 'scan' | 'home' | 'chart' | 'activity' | 'user' | 'footsteps' | 'water' | 'close' | 'arrow-up-right' | 'flame'
type CalendarDay = { date: Date; day: string; number: number }

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  const paths: Record<IconName, ReactNode> = {
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    'chevron-left': <path d="m15 18-6-6 6-6" />, 'chevron-right': <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" /></>,
    scan: <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /><circle cx="12" cy="12" r="3.5" /><path d="M12 8.5v-1M12 16.5v-1M8.5 12h-1M16.5 12h-1" /></>,
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />, chart: <path d="M4 19V9M10 19V5M16 19v-8M22 19V3" />, activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21c.6-3.6 3-5.5 7-5.5s6.4 1.9 7 5.5" /></>,
    footsteps: <path d="M9.7 4.2c-1.1-.8-2.2-.2-2.4 1.2-.2 1.5.9 3.2 2.2 3.8 1.2.6 2.2-.2 2-1.6-.2-1.4-.8-2.7-1.8-3.4ZM17.3 12.2c-1.1-.8-2.2-.2-2.4 1.2-.2 1.5.9 3.2 2.2 3.8 1.2.6 2.2-.2 2-1.6-.2-1.4-.8-2.7-1.8-3.4Z" />,
    water: <><path d="M7 6h10l-1 14H8L7 6ZM9 3h6M10 10h4M10 14h2" /><path d="M18.5 9.5c1.5 1.4 2 2.2 2 3.2a2 2 0 0 1-4 0c0-1 .5-1.8 2-3.2Z" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />, 'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />, flame: <path d="M12 21c4 0 7-2.8 7-7 0-2.8-1.7-5.4-4.2-7.7.1 2.1-.7 3.5-1.8 4.4.2-3-1.2-5.5-3.9-7.7 0 3.7-2.2 6.3-4.1 7.8C4.2 12.6 4 15.4 6 17.4c1.3 1.3 3 2 6 2Z" />
  }
  return <svg {...common}>{paths[name]}</svg>
}

const ingredients = [{ name: 'Avocado', calories: 200, tone: 'coral', width: '64%' }, { name: 'Bread', calories: 150, tone: 'cyan', width: '54%' }, { name: 'Olive oil', calories: 80, tone: 'lime', width: '42%' }, { name: 'Eggs', calories: 70, tone: 'amber', width: '38%' }]
const navItems: { label: string; icon: IconName }[] = [{ label: 'Home', icon: 'home' }, { label: 'Progress', icon: 'chart' }, { label: 'Activity', icon: 'activity' }, { label: 'Profile', icon: 'user' }]
const startOfWeek = (date: Date) => { const result = new Date(date); result.setHours(0, 0, 0, 0); result.setDate(result.getDate() - result.getDay()); return result }
const addDays = (date: Date, amount: number) => { const result = new Date(date); result.setDate(result.getDate() + amount); return result }
const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
const sameDay = (first: Date, second: Date) => dateKey(first) === dateKey(second)

function StatisticsScreen({ onBack, onScan, onNavigate }: { onBack: () => void; onScan: () => void; onNavigate: (label: string) => void }) {
  const bars = [{ day: 'Sun', height: 42 }, { day: 'Mon', height: 31 }, { day: 'Tue', height: 27 }, { day: 'Wed', height: 76 }, { day: 'Thu', height: 42 }, { day: 'Fri', height: 35 }, { day: 'Sat', height: 58 }]
  return <div className="statistics-screen"><header className="statistics-header"><button className="round-button" type="button" onClick={onBack} aria-label="Back"><Icon name="chevron-left" size={18} /></button><div><p className="eyebrow">Nutrition trend</p><h2>Weekly summary</h2></div><button className="round-button" type="button" onClick={onScan} aria-label="Scan meal"><Icon name="scan" size={18} /></button></header><section className="stats-chart" aria-label="Weekly nutrition chart">{bars.map((bar) => <div key={bar.day} className="bar-group"><div className="bar" style={{ height: `${bar.height}%` }} /><span>{bar.day}</span></div>)}</section><div className="stats-grid"><article className="metric-card"><span>Calories</span><strong>1,428</strong><small>+8% vs last week</small></article><article className="metric-card"><span>Protein</span><strong>116g</strong><small>Lean intake</small></article><article className="metric-card"><span>Fiber</span><strong>28g</strong><small>Goal met</small></article></div><button className="primary-button" type="button" onClick={() => onNavigate('Home')}>View dashboard</button></div>
}

function HealthCard({ title, text }: { title: ReactNode; text: ReactNode }) { return <article className="health-card"><div className="health-heading"><h2>{title}</h2><span className="health-arrow"><Icon name="arrow-up-right" size={16} /></span></div><p>{text}</p></article> }

function BottomNavigation({ active, onNavigate, onScan }: { active: string; onNavigate: (label: string) => void; onScan: () => void }) { return <><nav className="bottom-nav" aria-label="Main navigation">{navItems.map(({ label, icon }) => <button key={label} type="button" className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => onNavigate(label)}><Icon name={icon} size={18} /><span>{label}</span></button>)}<button type="button" className="scan-fab" aria-label="Scan food" onClick={onScan}><Icon name="scan" size={22} /></button></nav></>
}

function App() {
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(today)
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today))
  const [activeTab, setActiveTab] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scanOpen, setScanOpen] = useState(false)
  const dates = useMemo<CalendarDay[]>(() => Array.from({ length: 7 }, (_, index) => { const date = addDays(weekStart, index); return { date, day: date.toLocaleDateString('en-US', { weekday: 'short' }), number: date.getDate() } }), [weekStart])
  const monthLabel = useMemo(() => weekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), [weekStart])
  const shiftWeek = (direction: number) => { setWeekStart(addDays(weekStart, direction * 7)); setSelectedDate(addDays(selectedDate, direction * 7)) }
  const selectDate = (date: Date) => { setSelectedDate(date); setWeekStart(startOfWeek(date)) }
  const navigate = (label: string) => setActiveTab(label)

  if (activeTab === 'Progress') return <main className="app-canvas"><div className="app-shell"><StatisticsScreen onBack={() => setActiveTab('Home')} onScan={() => setScanOpen(true)} onNavigate={navigate} /></div></main>
  return <main className="app-canvas"><div className="app-shell"><header className="header"><div><p className="greeting">Good morning <span aria-hidden="true">👋</span></p><h1>User</h1><p className="subtle">{monthLabel}</p></div><button className="icon-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen((value) => !value)}><Icon name="more" size={18} /></button></header><section className="calendar-strip" aria-label="Weekly calendar">{dates.map(({ date, day, number }) => <button key={dateKey(date)} type="button" className={sameDay(date, selectedDate) ? 'day-pill active' : 'day-pill'} onClick={() => selectDate(date)}><span>{day}</span><strong>{number}</strong></button>)}</section><section className="summaries"><div className="meal-card"><div className="meal-top"><div><p className="eyebrow">Breakfast</p><h2>Avocado toast</h2></div><span className="meal-badge">420 kcal</span></div><div className="ingredient-list">{ingredients.map((ingredient) => <div key={ingredient.name} className="ingredient-row"><span>{ingredient.name}</span><div className="ingredient-bar"><i style={{ width: ingredient.width, background: ingredient.tone }} /></div><strong>{ingredient.calories}</strong></div>)}</div></div><div className="mini-grid"><HealthCard title="Water" text="2.1L today" /><HealthCard title="Movement" text="8,400 steps" /><HealthCard title="Protein" text="92g logged" /></div></div><section className="overview-card"><div className="overview-copy"><p className="eyebrow">Daily overview</p><h2>Balanced plate</h2><p>Your meal pattern is tracking closely to your target protein and fiber goals.</p></div><button className="primary-button" type="button" onClick={() => setScanOpen(true)}>Scan a meal</button></section>{menuOpen && <div className="menu-panel" role="dialog" aria-label="Quick actions"><button type="button" onClick={() => setActiveTab('Progress')}>View progress</button><button type="button" onClick={() => setActiveTab('Home')}>Home</button></div>}<BottomNavigation active={activeTab} onNavigate={navigate} onScan={() => setScanOpen(true)} /></div>{scanOpen && <div className="scan-overlay" role="dialog" aria-modal="true"><div className="scan-sheet"><button className="close-button" type="button" aria-label="Close scan" onClick={() => setScanOpen(false)}><Icon name="close" size={20} /></button><h2>Scan your meal</h2><div className="scan-box"><Icon name="scan" size={36} /><p>Point your camera at a plate to identify ingredients and estimate calories.</p></div><button className="primary-button" type="button">Capture photo</button></div></div>}</main>
}

function ScanModal({ onClose }: { onClose: () => void }) { return <div className="scan-overlay" role="dialog" aria-modal="true"><div className="scan-sheet"><button className="close-button" type="button" aria-label="Close scan" onClick={onClose}><Icon name="close" size={20} /></button><h2>Scan your meal</h2><div className="scan-box"><Icon name="scan" size={36} /><p>Point your camera at a plate to identify ingredients and estimate calories.</p></div><button className="primary-button" type="button">Capture photo</button></div></div>
}

export { App }
