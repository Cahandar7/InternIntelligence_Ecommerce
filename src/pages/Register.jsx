import React, { useState } from "react";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const adminAccount = { email: "admin@gmail.com", password: "admin123" };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (adminAccount.email === email && adminAccount.password === password) {
      Swal.fire({
        title: "STOP",
        text: "This is reserved account",
        icon: "warning",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        title: "Weak Password!",
        text: "Password must be at least 6 characters long.",
        icon: "warning",
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setEmail("");
      setPassword("");
      Swal.fire({
        title: "Oops!",
        text: "Something get wrong",
        icon: "error",
      });
    }

    if (data) {
      Swal.fire({
        title: "Good job!",
        text: "Account created successfully",
        icon: "success",
      }).then(() => navigate("/account/login"));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="account-box page">
      <div className="login-register-wrapper">
        <form onSubmit={handleSubmit}>
          <h5 className="wrapper-title">Sign up</h5>

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

          <div className="btn-box">
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </div>
          <div className="go-register">
            Already have an account?
            <Link to={"/account/login"} className="go">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
