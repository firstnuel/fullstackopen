import Notification from "./Notification";
import { useState } from "react";
import { logInUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const clear = () => {
    setUsername("");
    setPassword("");
  };

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(logInUser({ username, password }));
    clear();
  };

  return (
    <>
      <h2>log into application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            aria-label="Username"
            onChange={handleName}
            autoComplete="username"
            required
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            aria-label="Password"
            onChange={handlePassword}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
