import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      await register(Object.fromEntries(new FormData(event.currentTarget)));
      navigate("/appointment");
    } catch (err) {
      setError(err.response?.data?.message || t("registrationFailed"));
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">{t("patientRegister")}</span>
        <h1>{t("patientRegisterTitle")}</h1>
        <input name="name" placeholder={t("fullName")} required />
        <input name="email" type="email" placeholder={t("email")} required />
        <input name="phone" placeholder={t("phone")} />
        <input name="password" type="password" placeholder={t("password")} required />
        <button className="btn primary" type="submit">{t("register")}</button>
        <p className="status">{error}</p>
        <p>{t("alreadyRegistered")} <Link to="/login">{t("login")}</Link></p>
      </form>
    </main>
  );
}
