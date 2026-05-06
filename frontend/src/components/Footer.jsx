import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { hospital } from "../config/site.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-mark" aria-hidden="true">
          <img className="footer-logo" src={hospital.logo} alt="" />
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
          <Link to="/contact">{t("contact")}</Link>
          <Link to="/appointment">{t("bookAppointment")}</Link>
        </div>
      </div>
      <div className="footer-contact">
        <h4>{t("contact")}</h4>
        <span><Phone size={16} /> {hospital.phone}</span>
        <span><Mail size={16} /> {hospital.email}</span>
        <span><MapPin size={16} /> {hospital.address}</span>
      </div>
      <div className="footer-copyright">
        <span>© 2026. All Rights Reserved. | Designed & Developed by </span>
        <a href="https://alishbatech.com" target="_blank" rel="noreferrer">
          Alishbatech
        </a>
      </div>
    </footer>
  );
}
