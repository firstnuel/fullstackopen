import Notification from "./Notification"
import { useState } from "react"

const LoginForm = ({ handleLogin, message, success }) => {

      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')

      const handleName = event => setUsername(event.target.value)
      const handlePassword = event => setPassword(event.target.value)
      const clear = () => {
        setUsername('')
        setPassword('')
      }

      const Login = event => {
        event.preventDefault()

        handleLogin({username, password,})
        clear()
      }

    return (
    <>
    <h2>log into application</h2>
    <Notification 
          message={message}
          success={success} />
    <form onSubmit={Login}>
      <div>
        username <input
          type="text"
          value={username}
          name="Username"
          onChange={handleName}
          autoComplete="username"
          required
        />
      </div>
      <div>
        password <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
          autoComplete="current-password"
          required
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>   
)}

export default LoginForm
