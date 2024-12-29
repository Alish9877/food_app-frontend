import { useState } from "react"

const AuthPage = () => {
const [isLogin , setIsLogin] = useState()

return (
  <div  className="auth-page">
    <h1>{isLogin? 'Login' : 'Register'}</h1>
    {/* add from components */}
    <button onClick={() => setIsLogin (!isLogin)}>Switch to {isLogin? 'Register' : 'Login'}</button>
  </div>
)
}

export default AuthPage