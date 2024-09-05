import Notification from "./Notification"

const LoginForm = ({ handleLogin, username, handleName,
    password, handlePassword, message, success }) => (
  <>
  <h2>log into application</h2>
  <Notification 
        message={message}
        success={success} />
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleName}
        autoComplete="username"
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePassword}
        autoComplete="current-password"
      />
    </div>
    <button type="submit">login</button>
  </form>
  </>   
)

export default LoginForm
