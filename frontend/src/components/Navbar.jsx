import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { hospital } from "../config/site.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    [t("home"), "/"],
    [t("about"), "/about"],
    [t("departments"), "/departments"],
    [t("doctors"), "/doctors"],
    [t("contact"), "/contact"]
  ];

  return (
    <header className="navbar">
      <div className="header-shell">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <img className="brand-logo" src={hospital.logo} alt={`${hospital.name} logo`} />
          </span>
          <span className="brand-copy">
            <strong>{hospital.shortName}</strong>
            <span className="brand-mobile-name">{hospital.name}</span>
            <em>{hospital.speciality}</em>
          </span>
        </Link>
        <button className="icon-button mobile-only" onClick={() => setOpen(!open)} aria-label={t("toggleMenu")}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          {user?.role === "admin" && <NavLink to="/admin" onClick={() => setOpen(false)}>{t("admin")}</NavLink>}
          <button className="mobile-nav-cta muted" onClick={toggleLanguage}>
            {language === "EN" ? t("hindi") : t("english")}
          </button>
          <Link className="mobile-nav-cta" to="/appointment" onClick={() => setOpen(false)}>{t("bookAppointment")}</Link>
          {user ? (
            <button className="mobile-nav-cta muted" onClick={() => { logout(); setOpen(false); }}>{t("logout")}</button>
          ) : (
            <Link className="mobile-nav-cta muted" to="/login" onClick={() => setOpen(false)}>{t("patientLogin")}</Link>
          )}
        </nav>
        <div className="header-actions">
          <button className="language-switch" onClick={toggleLanguage}>
            <span>{language}</span>
            <strong>{language === "EN" ? "HI" : "EN"}</strong>
          </button>
          {user ? (
            <button className="nav-action" onClick={logout}>{t("logout")}</button>
          ) : (
            <Link className="nav-action" to="/login">{t("patientLogin")}</Link>
          )}
          <Link className="appointment-cta" to={user?.role === "admin" ? "/admin" : "/appointment"}>
            {user?.role === "admin" ? t("adminDashboard") : t("bookAppointment")} <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}/*  */
