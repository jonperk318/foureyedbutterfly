import React from 'react'

const Login = () => {
  return (
    <div className="auth">
      <h1>Welcome, Ruby.</h1>
      <form>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Login</button>
          <p>Sorry, wrong username and/or password</p>
      </form>
    </div>
  )
}

export default Login