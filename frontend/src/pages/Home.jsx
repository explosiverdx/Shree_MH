import { Activity, ArrowRight, CalendarCheck, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { hospital } from "../config/site.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Home() {
  const { t } = useLanguage();
  const features = [
    [HeartPulse, t("specialistLed"), t("specialistLedText")],
    [CalendarCheck, t("fastAppointments"), t("fastAppointmentsText")],
    [Sparkles, t("premiumExperience"), t("premiumExperienceText")]
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{t("premiumHospital")}</span>
          <h1>{t("heroTitle")}</h1>
          <p>
            {t("heroText").replace("{hospital}", hospital.name)}
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/appointment">{t("bookAppointment")} <ArrowRight size={18} /></Link>
            <Link className="btn soft" to="/departments">{t("viewDepartments")}</Link>
          </div>
          <div className="hero-stats">
            <strong>120+<span>{t("doctorsStat")}</span></strong>
            <strong>32<span>{t("yearsStat")}</span></strong>
            <strong>98%<span>{t("satisfactionStat")}</span></strong>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image"></div>
          <div className="floating-card top"><Activity /> {t("liveEmergency")}</div>
          <div className="floating-card bottom"><ShieldCheck /> {t("certifiedCare")}</div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">{t("whyChoose")}</span>
          <h2>{t("professionalCare")}</h2>
        </div>
        <div className="feature-grid">
          {features.map(([Icon, title, text]) => (
            <article className="premium-card" key={title}>
              <Icon className="card-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
