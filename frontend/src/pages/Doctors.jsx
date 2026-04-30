import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { fallbackDoctors, getDoctorDepartment, getDoctorSpecialization } from "../data/fallback.js";

export default function Doctors() {
  const { language, t } = useLanguage();
  const [doctors, setDoctors] = useState(fallbackDoctors);

  useEffect(() => {
    api.get("/doctors")
      .then(({ data }) => data.length && setDoctors(data))
      .catch(() => {});
  }, []);

  return (
    <main className="page">
      <section className="section compact">
        <div className="section-head">
          <span className="eyebrow">{t("doctors")}</span>
          <h1>{t("doctorsTitle")}</h1>
        </div>
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <article className="doctor-card" key={doctor._id}>
              <div className="doctor-avatar">{doctor.name.split(" ").slice(-1)[0][0]}</div>
              <h3>{doctor.name}</h3>
              <p>{getDoctorSpecialization(doctor.specialization, language)}</p>
              <div className="pill-row">
                <span>{getDoctorDepartment(doctor.department, language)}</span>
                <span>{doctor.experience} {t("yearsShort")}</span>
                <span><Star size={14} fill="currentColor" /> 4.9</span>
              </div>
              <small>{doctor.qualification}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
