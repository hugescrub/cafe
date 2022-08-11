import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [Login, setLogin] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  /*
  * Use for accessing protected endpoint later
  * TODO: delete comment
  * 
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`)
    },
    body: JSON.stringify(data)
  };
  * 
  */

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username, password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/auth/login", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLogin(res);
      });
  };

  return (
    <div className="body">
      <section className="login" id="login">
        <div className="head">
          <h1 className="login-title">LOGIN</h1>
        </div>
        <div className="form">
          <form>
            <input
              type="text"
              placeholder="Username"
              className="text"
              id="username"
              value={username}
              onChange={onUsernameChange}
              required
            />
            <input
              type="password"
              placeholder="••••••••••••••"
              className="password"
              value={password}
              onChange={onPasswordChange}
              required
            />
            <button className="btn-login" id="do-login" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
