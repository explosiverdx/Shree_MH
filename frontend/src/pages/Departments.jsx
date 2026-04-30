import { Activity, Bone, HeartPulse, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { fallbackDepartments, getDepartmentCopy } from "../data/fallback.js";

const icons = { Activity, Bone, HeartPulse, Stethoscope };

export default function Departments() {
  const { language, t } = useLanguage();
  const [departments, setDepartments] = useState(fallbackDepartments);

  useEffect(() => {
    api.get("/departments")
      .then(({ data }) => data.length && setDepartments(data))
      .catch(() => {});
  }, []);

  return (
    <main className="page">
      <section className="section compact">
        <div className="section-head">
          <span className="eyebrow">{t("departments")}</span>
          <h1>{t("departmentsTitle")}</h1>
        </div>
        <div className="feature-grid">
          {departments.map((department) => {
            const Icon = icons[department.icon] || Stethoscope;
            const copy = getDepartmentCopy(department, language);
            return (
              <article className="premium-card" key={department._id}>
                <Icon className="card-icon" />
                <h3>{copy.name}</h3>
                <p>{copy.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
