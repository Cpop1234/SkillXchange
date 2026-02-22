import React from "react";
import Button from "react-bootstrap/Button";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const apiBaseUrl = axios.defaults.baseURL || import.meta.env.VITE_LOCALHOST || import.meta.env.VITE_SERVER_URL || "";

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  return (
    <div className="login-scene">
      <div className="login-blob blob-a" />
      <div className="login-blob blob-b" />
      <div className="login-blob blob-c" />

      <div className="login-panel">
        <p className="login-kicker">SkillXchange Access</p>
        <h1>Welcome Back</h1>
        <p className="login-copy">Sign in with Google to continue learning, mentoring, and meeting peers.</p>

        <Button className="google-btn" onClick={handleGoogleLogin}>
          <FaGoogle />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Login;