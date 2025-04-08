import React, { useState, useContext } from "react";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import Swal from "sweetalert2";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const ResetPassword = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
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
        title:
          language === "en"
            ? "Oops..."
            : language === "ru"
            ? "Ой..."
            : "Hups...",
        text:
          language === "en"
            ? "Passwords do not match!"
            : language === "ru"
            ? "Пароли не совпадают!"
            : "Şifrələr uyğun gəlmir!",
      });
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      Swal.fire({
        title:
          language === "en"
            ? "Warning!"
            : language === "ru"
            ? "Предупреждение!"
            : "Xəbərdarlıq!",
        text:
          language === "en"
            ? "Password cannot be empty."
            : language === "ru"
            ? "Пароль не может быть пустым."
            : "Şifrə boş ola bilməz.",
        icon: "warning",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title:
          language === "en"
            ? "Weak Password"
            : language === "ru"
            ? "Слабый пароль"
            : "Zəif şifrə",
        text:
          language === "en"
            ? "Password should be at least 8 characters long."
            : language === "ru"
            ? "Пароль должен быть не менее 8 символов."
            : "Şifrə ən azı 8 simvol olmalıdır.",
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
        title:
          language === "en"
            ? "Password Reset Successfully!"
            : language === "ru"
            ? "Пароль успешно сброшен!"
            : "Şifrə uğurla sıfırlandı!",
        text:
          language === "en"
            ? "Your password has been updated."
            : language === "ru"
            ? "Ваш пароль был обновлен."
            : "Şifrəniz yeniləndi.",
      });

      setTimeout(() => {
        navigate("/account/login");
      }, 3000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title:
          language === "en"
            ? "Oops..."
            : language === "ru"
            ? "Ой..."
            : "Hups...",
        text:
          err.message || language === "en"
            ? "Something went wrong. Try again."
            : language === "ru"
            ? "Что-то пошло не так. Попробуйте снова."
            : "Bir şey səhv getdi. Yenidən cəhd edin.",
      });
    }
  };

  return (
    <div
      className={`account-box page ${
        theme === "dark" ? "dark-lrr" : "light-lrr"
      }`}
    >
      <div className="login-register-wrapper">
        <form onSubmit={handleSubmit}>
          <h5 className="wrapper-title">
            {language === "en"
              ? "Reset Your Password"
              : language === "ru"
              ? "Сбросить пароль"
              : "Şifrənizi sıfırlayın"}
          </h5>

          <div className="input-box">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder={
                language === "en"
                  ? "New Password"
                  : language === "ru"
                  ? "Новый пароль"
                  : "Yeni şifrə"
              }
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
              placeholder={
                language === "en"
                  ? "Confirm Password"
                  : language === "ru"
                  ? "Подтвердите пароль"
                  : "Şifrəni təsdiq edin"
              }
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
              {language === "en"
                ? "Reset Password"
                : language === "ru"
                ? "Сбросить пароль"
                : "Şifrəni sıfırla"}
            </button>
          </div>

          <div className="go-register">
            {language === "en"
              ? "Remember password?"
              : language === "ru"
              ? "Помните пароль?"
              : "Şifrənizi xatırlayırsınız? "}
            <Link to={"/account/login"} className="go">
              {language === "en"
                ? "Login"
                : language === "ru"
                ? "Войти"
                : "Daxil ol"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
