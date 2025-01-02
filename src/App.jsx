import { useEffect, useState } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const navigate = useNavigate()

  // Restore user session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.log('No token found. User not logged in.')
          setUser(null)
          return
        }
        const restoredUser = await checkSession()
        setUser(restoredUser)
        localStorage.setItem('user', JSON.stringify(restoredUser))
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
    localStorage.clear()
    navigate('/auth/login')
  }

  const ProtectedRoute = ({ component }) => {
    useEffect(() => {
      if (!user) {
        navigate('/auth/login')
      }
    }, [user, navigate])

    return user ? component : null
  }

  const AdminRoute = ({ component }) => {
    if (!user || user.role !== 'Admin') {
      navigate('/')
      return null
    }
    return component
  }

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/auth/login" element={<AuthPage setUser={setUser} />} />
          <Route
            path="/auth/register"
            element={<AuthPage setUser={setUser} />}
          />

          {/* Protected Routes */}
          <Route
            path="/account-settings"
            element={
              <ProtectedRoute
                component={
                  <AccountSettingsPage user={user} setUser={setUser} />
                }
              />
            }
          />
          <Route
            path="/deliveries"
            element={
              <ProtectedRoute component={<DeliveryPage user={user} />} />
            }
          />
          <Route
            path="/meal-plans"
            element={
              <ProtectedRoute component={<MealPlansPage user={user} />} />
            }
          />
          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute component={<SubscriptionPage user={user} />} />
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={<AdminRoute component={<AdminPage />} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
