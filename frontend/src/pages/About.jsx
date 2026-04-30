import { hospital } from "../config/site.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function About() {
  const { t } = useLanguage();

  return (
    <main className="page">
      <section className="split-section">
        <div>
          <span className="eyebrow">{t("aboutHospital")}</span>
          <h1>{t("aboutTitle").replace("{hospital}", hospital.name)}</h1>
          <p>
            {t("aboutText1")}
          </p>
          <p>
            {t("aboutText2")}
          </p>
        </div>
        <div className="about-panel">
          <img
            className="about-panel-image"
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=85"
            alt="Orthopedic doctor reviewing patient scan"
          />
          <div className="about-panel-stats">
            <div>
              <strong>24/7</strong>
              <span>{t("emergencyCare")}</span>
            </div>
            <div>
              <strong>{t("eightMin")}</strong>
              <span>{t("avgResponse")}</span>
            </div>
            <div>
              <strong>ISO</strong>
              <span>{t("qualityOps")}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
