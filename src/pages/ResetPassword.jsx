import React, { useState } from "react";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      Swal.fire({
        title: "Warning!",
        text: "Password cannot be empty.",
        icon: "warning",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password should be at least 8 characters long.",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Password Reset Successfully!",
        text: "Your password has been updated.",
      });

      setTimeout(() => {
        navigate("/account/login");
      }, 3000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div className="account-box page">
      <div className="login-register-wrapper">
        <form onSubmit={handleSubmit}>
          <h5 className="wrapper-title">Reset Your Password</h5>

          <div className="input-box">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
              required
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

          <div className="input-box">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordVisible ? (
              <FontAwesomeIcon
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={toggleConfirmPasswordVisibility}
                icon={faEyeSlash}
                size="lg"
              />
            ) : (
              <FontAwesomeIcon
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={toggleConfirmPasswordVisibility}
                icon={faEye}
                size="lg"
              />
            )}
          </div>

          <div className="btn-box">
            <button type="submit" className="submit-btn">
              Reset Password
            </button>
          </div>

          <div className="go-register">
            Remember password?
            <Link to={"/account/login"} className="go">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
