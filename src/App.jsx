import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
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

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account-settings" element={<AccountSettingsPage />} />
            <Route path="/admin" element={<AdminPage />} />
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
