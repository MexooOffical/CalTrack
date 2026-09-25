import { useEffect, useState, type ChangeEvent } from 'react'
import './app.css'

type Screen = 'home' | 'scanner' | 'results'

type ScanResult = {
  image: string | null
  food: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  portion: string
  health: number
}

const demoImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80'

const demoResult: ScanResult = {
  image: demoImage,
  food: 'Grilled Steak with Veggies',
  calories: 650,
  protein: 50,
  carbs: 40,
  fat: 35,
  fiber: 10,
  portion: '1',
  health: 7,
}

function Icon({ name }: { name: 'back' | 'camera' | 'flash' | 'gallery' | 'close' | 'home' | 'chart' | 'user' | 'spark' | 'minus' | 'plus' }) {
  const icons = {
    back: '←',
    camera: '◉',
    flash: '✦',
    gallery: '▧',
    close: '×',
    home: '⌂',
    chart: '▥',
    user: '◔',
    spark: '✦',
    minus: '−',
    plus: '+',
  }
  return <span className="icon" aria-hidden="true">{icons[name]}</span>
}

function Scanner({ onBack, onResult }: { onBack: () => void; onResult: (result: ScanResult) => void }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    setPreview(imageUrl)
    setIsAnalyzing(true)
    window.setTimeout(() => {
      setIsAnalyzing(false)
      onResult({ ...demoResult, image: imageUrl })
    }, 800)
  }

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])

  return (
    <main className="scanner-screen">
      <header className="scanner-header">
        <button className="circle-button light" type="button" onClick={onBack} aria-label="Back">
          <Icon name="back" />
        </button>
        <span>Scanner</span>
        <button className="scanner-flash" type="button" aria-label="Toggle flash">
          <Icon name="flash" />
        </button>
      </header>

      <div
        className="camera-view"
        style={preview ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.2)), url(${preview})` } : undefined}
      >
        <div className="scan-frame" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        {preview && <div className="scan-status">Photo captured</div>}
        {isAnalyzing && <div className="analyzing"><span className="spinner" />Reading your meal…</div>}
      </div>

      <section className="scanner-controls">
        <div className="scanner-modes">
          <button className="mode active" type="button"><Icon name="camera" /><span>Scan Food</span></button>
          <button className="mode" type="button"><span className="mode-symbol">▤</span><span>Barcode</span></button>
          <button className="mode" type="button"><span className="mode-symbol">◉</span><span>Food label</span></button>
          <button className="mode" type="button"><Icon name="gallery" /><span>Library</span></button>
        </div>

        <div className="capture-row">
          <button className="round-tool" type="button" aria-label="Choose from gallery"><Icon name="gallery" /></button>
          <label className="shutter" aria-label="Take or choose a food photo">
            <input type="file" accept="image/*" capture="environment" onChange={handleImage} />
            <span />
          </label>
          <button className="round-tool" type="button" aria-label="Mute sound">⌁</button>
        </div>

        <p className="scanner-hint">Take a clear photo of your meal to get a nutrition estimate.</p>
      </section>
    </main>
  )
}

function Results({ result, onScanAgain, onHome }: { result: ScanResult; onScanAgain: () => void; onHome: () => void }) {
  return (
    <div className="food-insights-page">
      <h1 className="page-title">Food Insights</h1>
      <h2 className="page-subtitle">Calories, macros, health score</h2>

      <div className="phone-device">
        <div className="phone-statusbar">
          <span>9:41</span>
          <div className="status-icons">
            <span className="signal" />
            <span className="wifi" />
            <span className="battery"><i /></span>
          </div>
        </div>

        <div className="device-header">
          <button className="device-back" type="button" onClick={onScanAgain} aria-label="Back to scanner">
            <Icon name="back" />
          </button>
          <div className="time-tag">13:35 pm</div>
          <button className="device-more" type="button" aria-label="More options">
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          className="food-photo"
          style={{ backgroundImage: `url(${result.image ?? demoImage})` }}
        />

        <div className="result-card">
          <div className="result-name">{result.food}</div>

          <div className="nutrition-grid">
            <div className="metric-box">
              <span className="metric-label">Calories</span>
              <div className="metric-row">
                <strong>{result.calories}</strong>
                <button type="button" aria-label="Edit calories"><Icon name="spark" /></button>
              </div>
            </div>

            <div className="metric-box">
              <span className="metric-label">Portion</span>
              <div className="portion-box">
                <button type="button" aria-label="Decrease portion"><Icon name="minus" /></button>
                <span>{result.portion}</span>
                <button type="button" aria-label="Increase portion"><Icon name="plus" /></button>
              </div>
            </div>

            <div className="metric-box">
              <span className="metric-label">Protein</span>
              <div className="metric-row slim">
                <span className="badge badge-red">P</span>
                <strong>{result.protein}g</strong>
                <button type="button" aria-label="Edit protein"><Icon name="spark" /></button>
              </div>
            </div>

            <div className="metric-box">
              <span className="metric-label">Fat</span>
              <div className="metric-row slim">
                <span className="badge badge-gold">F</span>
                <strong>{result.fat}g</strong>
                <button type="button" aria-label="Edit fat"><Icon name="spark" /></button>
              </div>
            </div>

            <div className="metric-box">
              <span className="metric-label">Carbs</span>
              <div className="metric-row slim">
                <span className="badge badge-blue">C</span>
                <strong>{result.carbs}g</strong>
                <button type="button" aria-label="Edit carbs"><Icon name="spark" /></button>
              </div>
            </div>

            <div className="health-box">
              <span className="metric-label">Health Score</span>
              <div className="health-line">
                <span className="heart">❤</span>
                <strong>{result.health}/10</strong>
              </div>
            </div>
          </div>

          <button className="fix-button" type="button">
            <span className="fix-icon">✦</span>
            Fix Result
          </button>
        </div>

        <div className="ingredients-block">
          <h3>Ingredients</h3>
          <div className="ingredients-bar" />
        </div>
      </div>
    </div>
  )
}

function Home({ onScan, active, onNavigate }: { onScan: () => void; active: string; onNavigate: (value: string) => void }) {
  return (
    <main className="home-screen">
      <header className="home-header">
        <div>
          <p className="eyebrow">Good morning 👋</p>
          <h1>User</h1>
          <p className="muted">Tuesday, September 25</p>
        </div>
        <button className="profile-button" type="button"><Icon name="user" /></button>
      </header>

      <section className="hero-card">
        <div>
          <p className="eyebrow">Today’s calories</p>
          <strong>1,428</strong>
          <span>of 2,000 kcal</span>
        </div>
        <div className="progress-ring">72%</div>
      </section>

      <div className="quick-grid">
        <article><strong>92g</strong><span>Protein</span></article>
        <article><strong>2.1L</strong><span>Water</span></article>
        <article><strong>8,400</strong><span>Steps</span></article>
      </div>

      <section className="empty-meal">
        <p className="eyebrow">Add your next meal</p>
        <h2>What’s on your plate?</h2>
        <p>Scan a photo and get a quick nutrition estimate.</p>
        <button className="primary-button" type="button" onClick={onScan}><Icon name="camera" /> Scan food</button>
      </section>

      <nav className="bottom-nav">
        <button className={active === 'Home' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => onNavigate('Home')}><Icon name="home" /><span>Home</span></button>
        <button className={active === 'Progress' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => onNavigate('Progress')}><Icon name="chart" /><span>Progress</span></button>
        <button className="nav-scan" type="button" onClick={onScan} aria-label="Scan food"><Icon name="camera" /></button>
        <button className="nav-item" type="button"><Icon name="user" /><span>Profile</span></button>
      </nav>
    </main>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('results')
  const [result, setResult] = useState<ScanResult | null>(demoResult)

  const openScanner = () => setScreen('scanner')

  const showResult = (nextResult: ScanResult) => {
    setResult(nextResult)
    setScreen('results')
  }

  if (screen === 'scanner') return <Scanner onBack={() => setScreen('results')} onResult={showResult} />
  if (screen === 'results' && result) return <Results result={result} onScanAgain={openScanner} onHome={() => setScreen('home')} />

  return <Home onScan={openScanner} active="Home" onNavigate={() => undefined} />
}

export { App }
