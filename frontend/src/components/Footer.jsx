import { Mail, MapPin, Phone, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { hospital } from "../config/site.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-mark" aria-hidden="true">
          <Plus size={24} strokeWidth={3} />
        </span>
        <h3>{hospital.name}</h3>
        <strong>{t("footerTagline")}</strong>
        <p>{t("footerText")}</p>
      </div>
      <div className="footer-nav">
        <h4>{t("explore")}</h4>
        <div className="footer-links">
          <Link to="/departments">{t("departments")}</Link>
          <Link to="/doctors">{t("doctors")}</Link>
          <Link to="/appointment">{t("bookAppointment")}</Link>
          <Link to="/admin/login">{t("adminLogin")}</Link>
        </div>
      </div>
      <div className="footer-contact">
        <h4>{t("contact")}</h4>
        <span><Phone size={16} /> {hospital.phone}</span>
        <span><Mail size={16} /> {hospital.email}</span>
        <span><MapPin size={16} /> {hospital.address}</span>
      </div>
      <div className="footer-copyright">
        Copyright © 2026 <a href="https://alishbatech.com" target="_blank" rel="noreferrer">ALISHBATECH</a> . All Rights Reserved.
      </div>
    </footer>
  );
}
