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
}

const demoResult: Omit<ScanResult, 'image'> = {
  food: 'Fruit bowl',
  calories: 320,
  protein: 5,
  carbs: 58,
  fat: 9,
  fiber: 11,
  portion: '1 medium bowl',
}

function Icon({ name }: { name: 'back' | 'camera' | 'flash' | 'gallery' | 'close' | 'home' | 'chart' | 'user' }) {
  const icons = {
    back: '‹', camera: '⌾', flash: '✦', gallery: '▧', close: '×', home: '⌂', chart: '▥', user: '○',
  }
  return <span className={`icon icon-${name}`} aria-hidden="true">{icons[name]}</span>
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
    }, 700)
  }

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  return <main className="scanner-screen">
    <header className="scanner-header">
      <button className="circle-button light" type="button" onClick={onBack} aria-label="Back"><Icon name="back" /></button>
      <span>Scanner</span>
      <button className="scanner-flash" type="button" aria-label="Toggle flash"><Icon name="flash" /></button>
    </header>
    <div className="camera-view" style={preview ? { backgroundImage: `linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.2)),url(${preview})` } : undefined}>
      <div className="scan-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      {preview && <div className="scan-status">Photo captured</div>}
      {isAnalyzing && <div className="analyzing"><span className="spinner" />Reading your meal…</div>}
    </div>
    <section className="scanner-controls">
      <div className="scanner-modes"><button className="mode active" type="button"><Icon name="camera" /><span>Scan Food</span></button><button className="mode" type="button"><span className="mode-symbol">▤</span><span>Barcode</span></button><button className="mode" type="button"><span className="mode-symbol">◉</span><span>Food label</span></button><button className="mode" type="button"><Icon name="gallery" /><span>Library</span></button></div>
      <div className="capture-row"><button className="round-tool" type="button" aria-label="Choose from gallery"><Icon name="gallery" /></button><label className="shutter" aria-label="Take or choose a food photo"><input type="file" accept="image/*" capture="environment" onChange={handleImage} /><span /></label><button className="round-tool" type="button" aria-label="Mute sound">⌁</button></div>
      <p className="scanner-hint">Take a clear photo of your meal to get a nutrition estimate.</p>
    </section>
  </main>
}

function Results({ result, onScanAgain, onHome }: { result: ScanResult; onScanAgain: () => void; onHome: () => void }) {
  return <main className="results-screen"><header className="results-header"><button className="circle-button" type="button" onClick={onScanAgain} aria-label="Back to scanner"><Icon name="back" /></button><div><p className="eyebrow">Demo analysis</p><h1>Your meal</h1></div><button className="circle-button" type="button" onClick={onHome} aria-label="Close"><Icon name="close" /></button></header>{result.image && <img className="result-image" src={result.image} alt="Captured meal" />}<section className="result-card"><p className="eyebrow">Looks like</p><h2>{result.food}</h2><p className="portion">Estimated portion: {result.portion}</p><div className="calorie-total"><strong>{result.calories}</strong><span>kcal</span></div><div className="nutrition-grid"><div><strong>{result.protein}g</strong><span>Protein</span></div><div><strong>{result.carbs}g</strong><span>Carbs</span></div><div><strong>{result.fat}g</strong><span>Fat</span></div><div><strong>{result.fiber}g</strong><span>Fiber</span></div></div><p className="demo-note">Demo result for now. Your API will provide real food recognition and nutrition data later.</p><button className="primary-button" type="button" onClick={onScanAgain}>Scan another meal</button></section></main>
}

function Home({ onScan, active, onNavigate }: { onScan: () => void; active: string; onNavigate: (value: string) => void }) {
  return <main className="home-screen"><header className="home-header"><div><p className="eyebrow">Good morning 👋</p><h1>User</h1><p className="muted">Tuesday, September 25</p></div><button className="profile-button" type="button"><Icon name="user" /></button></header><section className="hero-card"><div><p className="eyebrow">Today’s calories</p><strong>1,428</strong><span>of 2,000 kcal</span></div><div className="progress-ring">72%</div></section><div className="quick-grid"><article><strong>92g</strong><span>Protein</span></article><article><strong>2.1L</strong><span>Water</span></article><article><strong>8,400</strong><span>Steps</span></article></div><section className="empty-meal"><p className="eyebrow">Add your next meal</p><h2>What’s on your plate?</h2><p>Scan a photo and get a quick nutrition estimate.</p><button className="primary-button" type="button" onClick={onScan}><Icon name="camera" /> Scan food</button></section><nav className="bottom-nav"><button className={active === 'Home' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => onNavigate('Home')}><Icon name="home" /><span>Home</span></button><button className={active === 'Progress' ? 'nav-item active' : 'nav-item'} type="button" onClick={() => onNavigate('Progress')}><Icon name="chart" /><span>Progress</span></button><button className="nav-scan" type="button" onClick={onScan} aria-label="Scan food"><Icon name="camera" /></button><button className="nav-item" type="button"><Icon name="user" /><span>Profile</span></button></nav></main>
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [result, setResult] = useState<ScanResult | null>(null)
  const openScanner = () => setScreen('scanner')
  const showResult = (nextResult: ScanResult) => { setResult(nextResult); setScreen('results') }
  if (screen === 'scanner') return <Scanner onBack={() => setScreen('home')} onResult={showResult} />
  if (screen === 'results' && result) return <Results result={result} onScanAgain={openScanner} onHome={() => setScreen('home')} />
  return <Home onScan={openScanner} active="Home" onNavigate={() => undefined} />
}

export { App }
