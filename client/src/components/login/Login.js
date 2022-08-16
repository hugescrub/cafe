import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function Login() {
  const [Login, setLogin] = useState([]);
  const [requestFailed, setRequestFailed] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const errorMessage = () => {
    if (requestFailed) {
      return <p>{"Wrong username or password"}</p>;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username, password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/auth/login", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        } else {
          setRequestFailed(false);
          return res.json();
        }
      })
      .then((res) => {
        localStorage.setItem(
          "data",
          btoa(`${username}:${password}`)
        );
        console.log(res);
        setLogin(res);
        navigate("/admin");
      })
      .catch((error) => {
        console.log("error: " + error);
        setRequestFailed(true);
      });
  };

  const persistData = () => {
    localStorage.getItem("data");
  };

  useEffect(() => {
    persistData();
  }, [requestFailed]);

  return (
    <div className="body">
      <section className="login" id="login">
        <div className="head">
          <h1 className="login-title">LOGIN</h1>
        </div>
        <div className="form">
          <form>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="text"
              id="username"
              value={username}
              onChange={onUsernameChange}
              required
            />
            <input
              name="password"
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
            {errorMessage()}
          </form>
        </div>
      </section>
      <div className="login-footer">
        <Footer />
      </div>
    </div>
  );
}
