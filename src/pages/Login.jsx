import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../supabase/supabaseClient";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const adminAccount = { email: "admin@gmail.com", password: "admin123" };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        title: "Warning!",
        text: "Email and password cannot be empty.",
        icon: "warning",
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title: "Invalid Email!",
        text: "Please enter a valid email address.",
        icon: "warning",
      });
      return;
    }

    if (adminAccount.email === email && adminAccount.password === password) {
      Swal.fire({
        title: "Welcome Admin",
        icon: "success",
      });
      localStorage.setItem("isAdmin", true);
      navigate("/admin");
      setEmail("");
      setPassword("");
    } else {
      localStorage.setItem("isAdmin", false);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        if (
          data &&
          adminAccount.email !== email &&
          adminAccount.password !== password
        ) {
          navigate("/shop");
          setEmail("");
          setPassword("");
        }
      } catch (err) {
        Swal.fire({
          title: "Oops!",
          text: err.message || "Something went wrong. Try again.",
          icon: "error",
        });
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Swal.fire({
        title: "Enter Email!",
        text: "Please enter your email before requesting a password reset.",
        icon: "warning",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/account/login/reset-password",
      });

      if (error) {
        throw error;
      }

      Swal.fire({
        title: "Check Your Email",
        text: "A password reset link has been sent to your email.",
        icon: "info",
        confirmButtonText: "Go Gmail",
      }).then((res) => {
        if (res.isConfirmed) {
          window.open("https://mail.google.com", "_blank");
        }
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "Failed to send reset email. Try again later.",
        icon: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="account-box page">
      <div className="login-register-wrapper">
        <form onSubmit={handleSubmit}>
          <h5 className="wrapper-title">Sign in</h5>

          <div className="input-box">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon className="icon" icon={faUser} size="lg" />
          </div>

          <div className="input-box">
            <input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <FontAwesomeIcon
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordVisibility}
                icon={faEyeSlash}
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordVisibility}
                icon={faEye}
                size="lg"
              />
            )}
          </div>

          <div className="remember-forgot">
            <div className="remember">
              <span>Remember me</span>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
            <span className="forgot" onClick={handleForgotPassword}>
              Forgot password?
            </span>
          </div>

          <div className="btn-box">
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </div>

          <div className="go-register">
            Don't have an account?
            <Link to={"/account/register"} className="go">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
