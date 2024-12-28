import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Feed from './pages/Feed'
import Home from './pages/Home'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    // Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav
          user={user}
          handleLogOut={handleLogOut}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
