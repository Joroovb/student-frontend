import React, { useEffect } from "react";
import "./login.css";
import Logo from "../../assets/roclogo.png";

import LoginButton from "../../components/loginbutton/LoginButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        navigate("/");
      }
    };
    getSession();
  }, [navigate]);

  return (
    <div id="loginContainer">
      <img width={300} src={Logo} className="logo-img" />
      <h2>Welcome to the Clock In App! </h2>

      <div className="test">
        <h1>Login with google</h1>
        <p>To use the application you need to login with google.</p>
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
