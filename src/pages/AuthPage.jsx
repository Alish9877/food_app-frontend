
// Placeholder for imports

const AuthPage = () => {
  // Placeholder: Toggle between login and registration forms
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {/* Placeholder: Add form components */}
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default AuthPage;

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

