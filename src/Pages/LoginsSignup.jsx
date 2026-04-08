import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login")

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(false)

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  // ================= LOGIN =================
  const login = async () => {
    try {
      setLoading(true)

      const response = await fetch('http://localhost:4001/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setLoading(false)

      if (data.success) {
        showAlert("success", "Login me sukses!")

        localStorage.setItem('auth-token', data.token)
        localStorage.setItem('role', data.role)

        setTimeout(() => {
          if (data.role === "admin") {
            window.location.href = "http://localhost:5173"
          } else {
            window.location.replace('/')
          }
        }, 1000)

      } else {
        showAlert("error", data.errors || "Login failed")
      }

    } catch (error) {
      setLoading(false)
      showAlert("error", "Server error")
      console.error(error)
    }
  }

  // ================= SIGNUP =================
  const signup = async () => {
    try {
      setLoading(true)

      const response = await fetch('http://localhost:4001/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setLoading(false)

      if (data.success) {
        showAlert("success", "Regjistrimi u krye!")

        localStorage.setItem('auth-token', data.token)

        setTimeout(() => {
          window.location.replace('/')
        }, 1000)

      } else {
        showAlert("error", data.errors || "Signup failed")
      }

    } catch (error) {
      setLoading(false)
      showAlert("error", "Server error")
      console.error(error)
    }
  }

  return (
    <div className='loginsignup'>

      {/* ALERT */}
      {alert && (
        <div className={`custom-alert ${alert.type}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert(null)}>×</button>
        </div>
      )}

      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">

          {/* USERNAME ONLY FOR SIGNUP */}
          {state === "Sign Up" && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Your Name'
              autoComplete="off"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
            autoComplete="off"
          />

          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
            autoComplete="off"
          />

        </div>

        <button
          onClick={() => (state === "Login" ? login() : signup())}
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue"}
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

      </div>
    </div>
  )
}

export default LoginSignup