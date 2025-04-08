import React, { useState, useContext } from "react";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import Swal from "sweetalert2";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Register = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const adminAccount = { email: "admin@gmail.com", password: "admin123" };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (adminAccount.email === email && adminAccount.password === password) {
      Swal.fire({
        title: language === "en" ? "STOP" : language === "ru" ? "СТОП" : "STOP",
        text:
          language === "en"
            ? "This is reserved account"
            : language === "ru"
            ? "Это зарезервированная учетная запись"
            : "Bu hesab ayrılmışdır",
        icon: "warning",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        title:
          language === "en"
            ? "Weak Password!"
            : language === "ru"
            ? "Слабый пароль!"
            : "Zəif şifrə!",
        text:
          language === "en"
            ? "Password must be at least 6 characters long."
            : language === "ru"
            ? "Пароль должен быть не менее 6 символов."
            : "Şifrə ən azı 6 simvoldan ibarət olmalıdır.",
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
        title:
          language === "en" ? "Oops!" : language === "ru" ? "Ой!" : "Hups!",
        text:
          language === "en"
            ? "Something went wrong"
            : language === "ru"
            ? "Что-то пошло не так"
            : "Bir şeylər səhv getdi",
        icon: "error",
      });
    }

    if (data) {
      Swal.fire({
        title:
          language === "en"
            ? "Good job!"
            : language === "ru"
            ? "Хорошая работа!"
            : "Əla!",
        text:
          language === "en"
            ? "Account created successfully"
            : language === "ru"
            ? "Аккаунт успешно создан"
            : "Hesab uğurla yaradıldı",
        icon: "success",
      }).then(() => navigate("/account/login"));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
              ? "Sign up"
              : language === "ru"
              ? "Зарегистрироваться"
              : "Qeydiyyat"}
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
                  : "E-poçanızı daxil edin"
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

          <div className="btn-box">
            <button type="submit" className="submit-btn">
              {language === "en"
                ? "Sign Up"
                : language === "ru"
                ? "Зарегистрироваться"
                : "Qeydiyyatdan keç"}
            </button>
          </div>
          <div className="go-register">
            {language === "en"
              ? "Already have an account?"
              : language === "ru"
              ? "Уже есть аккаунт?"
              : "Hesabınız var? "}
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

export default Register;
