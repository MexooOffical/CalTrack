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
    footsteps: <path d="M9.7 4.2c-1.1-.8-2.2-.2-2.4 1.2-.2 1.5.9 3.2 2.2 3.8 1.2.6 2.2-.2 2-1.6-.2-1.4-.8-2.7-1.8-3.4ZM17.3 12.2c-1.1-.8-2.2-.2-2.4 1.2-.2 1.5.9 3.2 2.2 3.8 1.2.6 2.2-.2 2-1.6-.2-1.4-.8-2.7-1.8-3.4ZM6.8 12.8c-1.1.2-1.5 1.3-.8 2.5.7 1.3 2.5 2.1 3.8 1.8 1.3-.3 1.5-1.5.7-2.5-.9-1.1-2.4-2-3.7-1.8Z" />,
    water: <><path d="M7 6h10l-1 14H8L7 6ZM9 3h6M10 10h4M10 14h2" /><path d="M18.5 9.5c1.5 1.4 2 2.2 2 3.2a2 2 0 0 1-4 0c0-1 .5-1.8 2-3.2Z" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />, 'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />, flame: <path d="M12 21c4 0 7-2.8 7-7 0-2.8-1.7-5.4-4.2-7.7.1 2.1-.7 3.5-1.8 4.4.2-3-1.2-5.5-3.9-7.7.2 3.2-3.1 5.8-3.1 9.3 0 4.2 2.6 8.7 6 8.7Z" />,
  }
  return <svg {...common}>{paths[name]}</svg>
}

const ingredients = [{ name: 'Avocado', calories: 200, tone: 'coral', width: '64%' }, { name: 'Bread', calories: 150, tone: 'cyan', width: '54%' }, { name: 'Olive oil', calories: 80, tone: 'lime', width: '45%' }]
const navItems: { label: string; icon: IconName }[] = [{ label: 'Home', icon: 'home' }, { label: 'Progress', icon: 'chart' }, { label: 'Activity', icon: 'activity' }, { label: 'Profile', icon: 'user' }]
const startOfWeek = (date: Date) => { const result = new Date(date); result.setHours(0, 0, 0, 0); result.setDate(result.getDate() - result.getDay()); return result }
const addDays = (date: Date, amount: number) => { const result = new Date(date); result.setDate(result.getDate() + amount); return result }
const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
const sameDay = (first: Date, second: Date) => dateKey(first) === dateKey(second)

function StatusBar() { return <div className="status-bar"><span>9:41</span><div className="status-right"><span className="signal"><i /><i /><i /><i /></span><span className="wifi">⌁</span><span className="battery-shape"><i /></span></div></div> }

function StatisticsScreen({ onBack, onScan, onNavigate }: { onBack: () => void; onScan: () => void; onNavigate: (label: string) => void }) {
  const bars = [{ day: 'Sun', height: 42 }, { day: 'Mon', height: 31 }, { day: 'Tue', height: 27 }, { day: 'Wed', height: 76 }, { day: 'Thu', height: 42 }, { day: 'Fri', height: 35 }, { day: 'Sat', height: 47 }]
  return <div className="statistics-screen"><StatusBar /><header className="statistics-header"><button className="round-button" type="button" onClick={onBack} aria-label="Back"><Icon name="chevron-left" size={21} /></button><h1>Statistic</h1><button className="round-button" type="button" aria-label="More"><Icon name="more" /></button></header><section className="chart-card"><div className="chart-summary"><span className="stat-calories"><Icon name="flame" size={22} /><b>1250</b> kcal</span><span>Target: <b>1920</b> kcal</span></div><div className="bar-chart">{bars.map((bar) => <div className="bar-column" key={bar.day}><div className={`bar-track ${bar.day === 'Wed' ? 'highlighted' : ''}`}><span className="bar-pattern" /><span className="bar-fill" style={{ height: `${bar.height}%` }} />{bar.day === 'Wed' && <em>120%</em>}</div><label>{bar.day}</label></div>)}</div></section><HealthCard title="Heart Rate" text={<>No data collected. Keep a sensor<br />near your heart.</>} /><div className="small-health-grid"><HealthCard title={<>Blood<br />Pressure</>} text={<>No readings yet.<br />Measure with a<br />BP monitor.</>} /><HealthCard title={<>Glucose<br />Level</>} text={<>No data.<br />Connect your<br />CGM device.</>} /></div><BottomNavigation active="Progress" onNavigate={onNavigate} onScan={onScan} /></div>
}

function HealthCard({ title, text }: { title: ReactNode; text: ReactNode }) { return <article className="health-card"><div className="health-heading"><h2>{title}</h2><span className="health-arrow"><Icon name="arrow-up-right" size={21} /></span></div><p>{text}</p></article> }
function BottomNavigation({ active, onNavigate, onScan }: { active: string; onNavigate: (label: string) => void; onScan: () => void }) { return <><nav className="bottom-nav" aria-label="Main navigation">{navItems.map((item) => <button className={`nav-item ${active === item.label ? 'active' : ''}`} type="button" key={item.label} onClick={() => onNavigate(item.label)}><span className="nav-icon"><Icon name={item.icon} size={21} /></span><span>{item.label}</span></button>)}</nav><button className="scan-button" type="button" onClick={onScan} aria-label="Scan food"><Icon name="scan" size={27} /></button></> }

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

  if (activeTab === 'Progress') return <main className="app-canvas"><div className="app-shell"><StatisticsScreen onBack={() => setActiveTab('Home')} onScan={() => setScanOpen(true)} onNavigate={navigate} />{scanOpen && <ScanModal onClose={() => setScanOpen(false)} />}</div></main>
  return <main className="app-canvas"><div className="app-shell"><header className="header"><div><p className="greeting">Good morning <span aria-hidden="true">👋</span></p><h1>Alex Jemison</h1></div><button className="icon-button notification-button" type="button" aria-label="Notifications"><Icon name="bell" size={22} /></button></header><section className="date-card" aria-label="Choose a date"><div className="date-card-topline"><h2>{monthLabel}</h2><div className="date-arrows"><button className="round-button" type="button" onClick={() => shiftWeek(-1)} aria-label="Previous week"><Icon name="chevron-left" size={20} /></button><button className="round-button" type="button" onClick={() => shiftWeek(1)} aria-label="Next week"><Icon name="chevron-right" size={20} /></button></div></div><div className="date-row">{dates.map((item) => <button key={dateKey(item.date)} className={`date-item ${sameDay(selectedDate, item.date) ? 'selected' : ''}`} type="button" onClick={() => selectDate(item.date)}><span>{item.day}</span><strong>{item.number}</strong></button>)}</div></section><section className="meal-card"><div className="meal-heading"><h2>Breakfast</h2><div className="menu-wrap"><button className="icon-button more-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Breakfast options"><Icon name="more" /></button>{menuOpen && <div className="action-menu"><button type="button" onClick={() => setMenuOpen(false)}>Edit breakfast</button><button type="button" onClick={() => setMenuOpen(false)}>Remove meal</button></div>}</div></div><div className="calorie-total"><strong>456</strong><span>/ 512 kcal</span></div><div className="calorie-bar"><span style={{ width: '89%' }} /></div><p className="ingredient-label">3 ingredients</p><div className="ingredients">{ingredients.map((ingredient) => <div className="ingredient" key={ingredient.name}><strong>{ingredient.name}</strong><div className={`ingredient-bar ${ingredient.tone}`}><span style={{ width: ingredient.width }} /></div><p><b>{ingredient.calories}</b> kcal</p></div>)}</div></section><section className="activity-grid"><article className="activity-card"><div className="activity-top"><h2>Step to<br />walk</h2><span className="activity-icon"><Icon name="footsteps" size={22} /></span></div><p className="activity-value">5,234 <small>step</small></p></article><article className="activity-card"><div className="activity-top"><h2>Drink<br />water</h2><span className="activity-icon"><Icon name="water" size={22} /></span></div><p className="activity-value">12 <small>glass</small></p></article></section><div className="bottom-space" /><BottomNavigation active={activeTab} onNavigate={navigate} onScan={() => setScanOpen(true)} />{scanOpen && <ScanModal onClose={() => setScanOpen(false)} />}</div></main>
}

function ScanModal({ onClose }: { onClose: () => void }) { return <div className="scan-overlay" role="dialog" aria-modal="true"><div className="scan-sheet"><button className="close-button" type="button" onClick={onClose} aria-label="Close scan"><Icon name="close" /></button><div className="scan-mark"><Icon name="scan" size={32} /></div><p className="eyebrow">CalSnap AI</p><h2>Scan your food</h2><p>Take a photo of your plate and we'll estimate calories, ingredients, and portion size.</p><button className="primary-button" type="button" onClick={onClose}>Open camera</button></div></div> }

export { App }
