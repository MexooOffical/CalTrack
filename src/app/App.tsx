import { useEffect, useState } from 'react'
import './app.css'

export function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <span className="brand-mark" aria-hidden="true">C</span>
        <div>
          <p className="eyebrow">CalTrack</p>
          <h1>Nutrition, made simple.</h1>
        </div>
      </header>
      <section className="setup-card" aria-labelledby="setup-title">
        <p className="status-pill">{isOnline ? 'Ready for setup' : 'Offline mode'}</p>
        <h2 id="setup-title">Your app foundation is ready.</h2>
        <p>Next we can build the mobile-first food capture and nutrition experience.</p>
      </section>
    </main>
  )
}
