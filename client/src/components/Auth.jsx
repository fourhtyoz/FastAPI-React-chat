import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { registerUser, loginUser, fetchProtectedData } from "../api";
import { authStore } from "../stores/authStore";

const Auth = observer(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const { access_token } = await loginUser(username, password);
        const user = await fetchProtectedData(access_token);
        authStore.setUser(user, access_token);
        alert("Login successful!");
      } else {
        await registerUser(username, password);
        alert("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Authentication failed!");
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isLogin ? "Login" : "Register"}
      </button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
});

export default Auth;
