import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { checkSession } from './services/authService'
import Nav from './components/Nav'
import AccountSettingsPage from './pages/AccountSettingsPage'
import AdminPage from './pages/AdminPage'
import AuthPage from './pages/AuthPage'
import DeliveryPage from './pages/DeliveryPage'
import HomePage from './pages/HomePage'
import MealPlansPage from './pages/MealPlansPage'
import SubscriptionPage from './pages/SubscriptionPage'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const restoredUser = await checkSession()
        setUser(restoredUser)
      } catch (error) {
        console.error('Session restoration failed:', error)
        setUser(null)
        localStorage.clear()
      }
    }
    restoreSession()
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/auth/login')
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} handleLogOut={handleLogOut} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth/login"
              element={<AuthPage setUser={setUser} />}
            />
            <Route
              path="/auth/register"
              element={<AuthPage setUser={setUser} />}
            />
            <Route
              path="/account-settings"
              element={<AccountSettingsPage user={user} setUser={setUser} />}
            />
            <Route
              path="/admin"
              element={user?.role === 'Admin' ? <AdminPage /> : <HomePage />}
            />
            <Route path="/deliveries" element={<DeliveryPage />} />
            <Route path="/meal-plans" element={<MealPlansPage />} />
            <Route path="/subscriptions" element={<SubscriptionPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
