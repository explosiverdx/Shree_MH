import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Clock3, Hash, LockKeyhole, ShieldCheck, Stethoscope } from "lucide-react";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { fallbackDoctors, getDoctorDepartment } from "../data/fallback.js";

export default function Appointment() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  useEffect(() => {
    api.get("/doctors")
      .then(({ data }) => data.length && setDoctors(data))
      .catch(() => {});
  }, []);

  async function loadMyAppointments() {
    const { data } = await api.get("/appointments/my");
    setAppointments(data);
  }

  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(() => setMessage(""), 3500);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (user?.role !== "patient") return;
    loadMyAppointments().catch(() => {});
  }, [user?.role]);

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

  if (user.role === "admin") {
    return (
      <main className="page">
        <section className="appointment-gate">
          <div>
            <span className="eyebrow">{t("appointmentBooking")}</span>
            <h1>{t("adminBookingTitle")}</h1>
            <p>{t("adminBookingText")}</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/admin">{t("openDashboard")}</Link>
            </div>
          </div>
          <div className="gate-card">
            <div className="gate-icon"><ShieldCheck /></div>
            <h2>{t("adminDashboard")}</h2>
            <div className="gate-list">
              <span><CalendarCheck size={18} /> {t("manageAppointments")}</span>
              <span><CalendarCheck size={18} /> {t("manageDoctors")}</span>
              <span><CalendarCheck size={18} /> {t("manageContactInquiries")}</span>
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
      setMessage(t("appointmentSuccess"));
      form.reset();
      setSelectedDepartment("");
      setSelectedDoctorId("");
      await loadMyAppointments();
    } catch (error) {
      setMessage(error.response?.data?.message || t("appointmentError"));
    }
  }

  function statusLabel(status) {
    const labels = {
      pending: t("pending"),
      confirmed: t("confirmed"),
      completed: t("completed"),
      cancelled: t("cancelled")
    };
    return labels[status] || status;
  }

  const departmentOptions = [...new Set(doctors.map((doctor) => doctor.department))];
  const filteredDoctors = selectedDepartment
    ? doctors.filter((doctor) => doctor.department === selectedDepartment)
    : doctors;

  function chooseDoctor(doctorId) {
    setSelectedDoctorId(doctorId);
    const doctor = doctors.find((item) => item._id === doctorId);
    if (doctor) setSelectedDepartment(doctor.department);
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
            <select
              name="department"
              value={selectedDepartment}
              onChange={(event) => {
                setSelectedDepartment(event.target.value);
                setSelectedDoctorId("");
              }}
              required
            >
              <option value="">{t("selectDepartment")}</option>
              {departmentOptions.map((department) => (
                <option key={department} value={department}>{getDoctorDepartment(department, language)}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <select name="doctor" value={selectedDoctorId} onChange={(event) => chooseDoctor(event.target.value)}>
              <option value="">{t("anyDoctor")}</option>
              {filteredDoctors.map((doctor) => (
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
          {message && <p className="status">{message}</p>}
        </form>
      </section>
      <section className="section compact appointment-status-section">
        <div className="section-head">
          <span className="eyebrow">{t("appointmentStatus")}</span>
          <h2>{t("myAppointments")}</h2>
          <p>{t("myAppointmentsText")}</p>
        </div>
        {appointments.length === 0 ? (
          <div className="table-card">
            <p>{t("noAppointments")}</p>
          </div>
        ) : (
          <div className="patient-progress-grid">
            {appointments.map((appointment) => (
              <article className="table-card patient-progress-card" key={appointment._id}>
                <div className="patient-progress-head">
                  <span className={`status-badge ${appointment.status}`}>{statusLabel(appointment.status)}</span>
                  <small><Hash size={14} /> {t("appointmentId")} {appointment._id.slice(-8).toUpperCase()}</small>
                </div>
                <h2>{appointment.patientName}</h2>
                <div className="gate-list">
                  <span><Stethoscope size={18} /> {getDoctorDepartment(appointment.department, language)} {t("with")} {appointment.doctorName}</span>
                  <span><CalendarCheck size={18} /> {new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                  <span><Clock3 size={18} /> {appointment.appointmentTime}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
