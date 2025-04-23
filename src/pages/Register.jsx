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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const adminAccount = { email: "admin@gmail.com", password: "admin123" };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      adminAccount.email === email &&
      adminAccount.password === password &&
      adminAccount.password === confirmPassword
    ) {
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

    if (password.length < 8 || confirmPassword.length < 8) {
      Swal.fire({
        title:
          language === "en"
            ? "Weak Password!"
            : language === "ru"
            ? "Слабый пароль!"
            : "Zəif şifrə!",
        text:
          language === "en"
            ? "Password must be at least 8 characters long."
            : language === "ru"
            ? "Пароль должен быть не менее 8 символов."
            : "Şifrə ən azı 8 simvoldan ibarət olmalıdır.",
        icon: "warning",
      });
      return;
    }

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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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

          <div className="input-box">
            <input
              id="password"
              name="password"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder={
                language === "en"
                  ? "Confirm password"
                  : language === "ru"
                  ? "Подтвердите пароль"
                  : "Şifrəni təsdiqləyin"
              }
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
