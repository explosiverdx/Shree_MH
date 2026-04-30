import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      await login(Object.fromEntries(new FormData(event.currentTarget)));
      navigate("/appointment");
    } catch (err) {
      setError(err.response?.data?.message || t("loginFailed"));
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">{t("patientLogin")}</span>
        <h1>{t("welcomeBack")}</h1>
        <input name="email" type="email" placeholder={t("email")} required />
        <input name="password" type="password" placeholder={t("password")} required />
        <button className="btn primary" type="submit">{t("login")}</button>
        <p className="status">{error}</p>
        <p>{t("newPatient")} <Link to="/register">{t("createAccount")}</Link></p>
      </form>
    </main>
  );
}
