import React from 'react'

const Login = () => {
  return (
    <div className="auth">
        <div className="auth-container login-container">
          <h1>Welcome, Ruby.</h1>
          <form>
            <input required type="text" placeholder="username" />
            <input required type="password" placeholder="password" />
            <button>Login</button>
              <p>Sorry, wrong username and/or password</p>
          </form>
        </div>
    </div>
  )
}

export default Login