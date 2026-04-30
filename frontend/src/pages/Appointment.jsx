import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { fallbackDoctors, getDoctorDepartment } from "../data/fallback.js";

export default function Appointment() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/doctors")
      .then(({ data }) => data.length && setDoctors(data))
      .catch(() => {});
  }, []);

  if (!user) {
    return (
      <main className="page">
        <section className="appointment-gate">
          <div>
            <span className="eyebrow">{t("appointmentBooking")}</span>
            <h1>{t("loginFirstTitle")}</h1>
            <p>
              {t("loginFirstText")}
            </p>
            <div className="hero-actions">
              <Link className="btn primary" to="/login">{t("patientLogin")}</Link>
              <Link className="btn soft" to="/register">{t("createAccount")}</Link>
            </div>
          </div>
          <div className="gate-card">
            <div className="gate-icon"><LockKeyhole /></div>
            <h2>{t("secureBooking")}</h2>
            <div className="gate-list">
              <span><CalendarCheck size={18} /> {t("chooseDoctorAfterLogin")}</span>
              <span><ShieldCheck size={18} /> {t("jwtProtected")}</span>
              <span><CalendarCheck size={18} /> {t("adminConfirm")}</span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const selectedDoctor = doctors.find((doctor) => doctor._id === values.doctor);

    try {
      await api.post("/appointments", {
        ...values,
        doctorName: selectedDoctor?.name || "Any Available Doctor"
      });
      form.reset();
      setMessage(t("appointmentSuccess"));
    } catch (error) {
      setMessage(error.response?.data?.message || t("appointmentError"));
    }
  }

  return (
    <main className="page">
      <section className="form-layout">
        <div>
          <span className="eyebrow">{t("appointmentBooking")}</span>
          <h1>{t("bookVisit")}</h1>
          <p>{t("loggedInAs")} {user?.name}. {t("requestProtected")}</p>
        </div>
        <form className="form-card" onSubmit={submit}>
          <div className="form-row">
            <input name="patientName" defaultValue={user?.name} placeholder={t("patientName")} required />
            <input name="email" type="email" defaultValue={user?.email} placeholder={t("email")} required />
          </div>
          <div className="form-row">
            <input name="phone" defaultValue={user?.phone} placeholder={t("phone")} required />
            <select name="department" required>
              <option value="">{t("selectDepartment")}</option>
              {[...new Set(doctors.map((doctor) => doctor.department))].map((department) => (
                <option key={department} value={department}>{getDoctorDepartment(department, language)}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <select name="doctor">
              <option value="">{t("anyDoctor")}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>{doctor.name} - {getDoctorDepartment(doctor.department, language)}</option>
              ))}
            </select>
            <input name="appointmentDate" type="date" required />
          </div>
          <div className="form-row">
            <input name="appointmentTime" type="time" required />
            <input name="message" placeholder={t("symptoms")} />
          </div>
          <button className="btn primary" type="submit">{t("confirmAppointment")}</button>
          <p className="status">{message}</p>
        </form>
      </section>
    </main>
  );
}
