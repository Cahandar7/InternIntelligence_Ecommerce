import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import supabase from "../supabase/supabaseClient";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "../contexts/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const { language } = useContext(LanguageContext);
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
        title:
          language === "en"
            ? "Warning!"
            : language === "ru"
            ? "Предупреждение!"
            : "Xəbərdarlıq!",
        text:
          language === "en"
            ? "Email and password cannot be empty."
            : language === "ru"
            ? "Электронная почта и пароль не могут быть пустыми."
            : "E-poçtanızı və şifrənizi boş qoymayın.",
        icon: "warning",
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title:
          language === "en"
            ? "Invalid Email!"
            : language === "ru"
            ? "Неверный Email!"
            : "Keçərli E-poçtanın yoxdur!",
        text:
          language === "en"
            ? "Please enter a valid email address."
            : language === "ru"
            ? "Пожалуйста, введите действительный адрес электронной почты."
            : "Zəhmət olmasa keçərli bir e-poçtanızı daxil edin.",
        icon: "warning",
      });
      return;
    }

    if (adminAccount.email === email && adminAccount.password === password) {
      Swal.fire({
        title:
          language === "en"
            ? "Welcome Admin"
            : language === "ru"
            ? "Добро пожаловать, Админ"
            : "Xoş gəlmisiniz Admin",
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
          title:
            language === "en" ? "Oops!" : language === "ru" ? "Ой!" : "Hups!",
          text:
            err.message ||
            (language === "en"
              ? "Something went wrong. Try again."
              : language === "ru"
              ? "Что-то пошло не так. Попробуйте снова."
              : "Bir şeylər səhv getdi. Yenidən cəhd edin."),
          icon: "error",
        });
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Swal.fire({
        title:
          language === "en"
            ? "Enter Email!"
            : language === "ru"
            ? "Введите email!"
            : "E-poçtanızı daxil edin!",
        text:
          language === "en"
            ? "Please enter your email before requesting a password reset."
            : language === "ru"
            ? "Пожалуйста, введите ваш email перед запросом сброса пароля."
            : "Şifrə sıfırlama tələb etməzdən əvvəl e-poçtanızı daxil edin.",
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
        title:
          language === "en"
            ? "Check Your Email"
            : language === "ru"
            ? "Проверьте свой email"
            : "E-poçtanızı yoxlayın",
        text:
          language === "en"
            ? "A password reset link has been sent to your email."
            : language === "ru"
            ? "Ссылка для сброса пароля была отправлена на ваш email."
            : "Şifrə sıfırlama bağlantısı e-poçtaniza göndərildi.",
        icon: "info",
        confirmButtonText:
          language === "en"
            ? "Go Gmail"
            : language === "ru"
            ? "Перейти в Gmail"
            : "Gmail-a gedin",
      }).then((res) => {
        if (res.isConfirmed) {
          window.open("https://mail.google.com", "_blank");
        }
      });
    } catch (err) {
      Swal.fire({
        title:
          language === "en" ? "Error" : language === "ru" ? "Ошибка" : "Xəta",
        text:
          err.message ||
          (language === "en"
            ? "Failed to send reset email. Try again later."
            : language === "ru"
            ? "Не удалось отправить письмо для сброса. Попробуйте снова позже."
            : "Şifrə sıfırlama e-poçtası göndərilə bilmədi. Zəhmət olmasa daha sonra yenidən cəhd edin."),
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
          <h5 className="wrapper-title">
            {language === "en"
              ? "Sign in"
              : language === "ru"
              ? "Войти"
              : "Giriş Et"}
          </h5>

          <div className="input-box">
            <input
              id="email"
              name="email"
              type="email"
              placeholder={
                language === "en"
                  ? "Email"
                  : language === "ru"
                  ? "Электронная почта"
                  : "E-poçtanızı daxil edin"
              }
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
              placeholder={
                language === "en"
                  ? "Password"
                  : language === "ru"
                  ? "Пароль"
                  : "Şifrə"
              }
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
              <span>
                {language === "en"
                  ? "Remember me"
                  : language === "ru"
                  ? "Запомнить меня"
                  : "Yadında saxla"}
              </span>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </div>
            <span className="forgot" onClick={handleForgotPassword}>
              {language === "en"
                ? "Forgot password?"
                : language === "ru"
                ? "Забыли пароль?"
                : "Şifrəni unuttunuz?"}
            </span>
          </div>

          <div className="btn-box">
            <button type="submit" className="submit-btn">
              {language === "en"
                ? "Sign In"
                : language === "ru"
                ? "Войти"
                : "Giriş Et"}
            </button>
          </div>

          <div className="go-register">
            {language === "en"
              ? "Don't have an account?"
              : language === "ru"
              ? "Нет аккаунта?"
              : "Hesabınız yoxdur?"}
            <Link to={"/account/register"} className="go">
              {language === "en"
                ? "Register"
                : language === "ru"
                ? "Зарегистрироваться"
                : "Qeydiyyatdan keçin"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
