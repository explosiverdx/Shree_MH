import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { hospital } from "../config/site.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function AdminLogin() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      await login(Object.fromEntries(new FormData(event.currentTarget)), true);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || t("adminLoginFailed"));
    }
  }

  return (
    <main className="auth-page admin-auth">
      <form className="auth-card" onSubmit={submit}>
        <div className="admin-login-brand">
          <span className="admin-login-mark">
            <ShieldCheck size={26} />
          </span>
          <div>
            <span className="eyebrow">{t("adminLogin")}</span>
            <h1>{t("adminPanel")}</h1>
          </div>
        </div>
        <p>{hospital.name}</p>
        <p className="auth-subtitle">{t("adminPanelText")}</p>
        <input name="email" type="email" placeholder={t("adminEmail")} required />
        <input name="password" type="password" placeholder={t("password")} required />
        <button className="btn primary" type="submit">{t("openDashboard")}</button>
        <p className="status">{error}</p>
      </form>
    </main>
  );
}
