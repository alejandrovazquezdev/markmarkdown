import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Landing from './pages/Landing'
import './styles/global.css'

const Trainer = lazy(() => import('./pages/Trainer'))

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="route-loading" role="status">
              <span>$ cargando trainer…</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Trainer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
