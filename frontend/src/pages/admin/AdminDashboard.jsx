import { CalendarDays, MailQuestion, Stethoscope, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../../api/api.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { getDoctorDepartment, getDoctorSpecialization } from "../../data/fallback.js";

const emptyDoctor = {
  name: "",
  department: "",
  specialization: "",
  experience: "",
  qualification: "",
  fee: "",
  availableDays: ""
};

export default function AdminDashboard() {
  const { language, t } = useLanguage();
  const tabKeys = ["doctors", "appointments", "contacts"];
  const doctorFields = ["name", "department", "specialization", "qualification"];
  const [tab, setTab] = useState("doctors");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [message, setMessage] = useState("");

  async function loadAdminData() {
    const [doctorRes, appointmentRes, contactRes] = await Promise.all([
      api.get("/doctors"),
      api.get("/appointments"),
      api.get("/contacts")
    ]);
    setDoctors(doctorRes.data);
    setAppointments(appointmentRes.data);
    setContacts(contactRes.data);
  }

  useEffect(() => {
    loadAdminData().catch((error) => setMessage(error.response?.data?.message || t("loadAdminError")));
  }, [t]);

  const metrics = useMemo(() => [
    [t("doctors"), doctors.length, Stethoscope],
    [t("appointments"), appointments.length, CalendarDays],
    [t("inquiries"), contacts.length, MailQuestion]
  ], [doctors.length, appointments.length, contacts.length, t]);

  async function saveDoctor(event) {
    event.preventDefault();
    const payload = {
      ...doctorForm,
      experience: Number(doctorForm.experience),
      fee: Number(doctorForm.fee || 0),
      availableDays: doctorForm.availableDays.split(",").map((day) => day.trim()).filter(Boolean)
    };

    try {
      await api.post("/doctors", payload);
      setDoctorForm(emptyDoctor);
      setMessage(t("doctorAdded"));
      await loadAdminData();
    } catch (error) {
      setMessage(error.response?.data?.message || t("saveDoctorError"));
    }
  }

  async function deleteDoctor(id) {
    await api.delete(`/doctors/${id}`);
    await loadAdminData();
  }

  async function updateAppointment(id, status) {
    await api.patch(`/appointments/${id}/status`, { status });
    await loadAdminData();
  }

  async function updateContact(id, status) {
    await api.patch(`/contacts/${id}/status`, { status });
    await loadAdminData();
  }

  async function deleteContact(id) {
    await api.delete(`/contacts/${id}`);
    await loadAdminData();
  }

  return (
    <main className="page admin-page">
      <section className="section compact">
        <div className="section-head">
          <span className="eyebrow">{t("adminDashboard")}</span>
          <h1>{t("manageAdmin")}</h1>
        </div>

        <div className="metric-grid">
          {metrics.map(([label, value, Icon]) => (
            <article className="metric-card" key={label}>
              <Icon />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <div className="tabs">
          {tabKeys.map((item) => (
            <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>
              {t(item)}
            </button>
          ))}
        </div>

        <p className="status">{message}</p>

        {tab === "doctors" && (
          <section className="admin-grid">
            <form className="form-card" onSubmit={saveDoctor}>
              <h2>{t("addDoctor")}</h2>
              {doctorFields.map((field) => (
                <input
                  key={field}
                  value={doctorForm[field]}
                  onChange={(event) => setDoctorForm({ ...doctorForm, [field]: event.target.value })}
                  placeholder={t(field)}
                  required
                />
              ))}
              <div className="form-row">
                <input
                  value={doctorForm.experience}
                  onChange={(event) => setDoctorForm({ ...doctorForm, experience: event.target.value })}
                  placeholder={t("experience")}
                  type="number"
                  required
                />
                <input
                  value={doctorForm.fee}
                  onChange={(event) => setDoctorForm({ ...doctorForm, fee: event.target.value })}
                  placeholder={t("fee")}
                  type="number"
                />
              </div>
              <input
                value={doctorForm.availableDays}
                onChange={(event) => setDoctorForm({ ...doctorForm, availableDays: event.target.value })}
                placeholder={t("availableDaysPlaceholder")}
              />
              <button className="btn primary" type="submit">{t("saveDoctor")}</button>
            </form>

            <div className="table-card">
              <h2>{t("manageDoctors")}</h2>
              {doctors.map((doctor) => (
                <div className="table-row" key={doctor._id}>
                  <div>
                    <strong>{doctor.name}</strong>
                    <span>{getDoctorDepartment(doctor.department, language)} - {getDoctorSpecialization(doctor.specialization, language)}</span>
                  </div>
                  <button className="icon-button danger" onClick={() => deleteDoctor(doctor._id)} aria-label={t("deleteDoctor")}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "appointments" && (
          <div className="table-card">
            <h2>{t("manageAppointments")}</h2>
            {appointments.map((appointment) => (
              <div className="table-row" key={appointment._id}>
                <div>
                  <strong>{appointment.patientName}</strong>
                  <span>{getDoctorDepartment(appointment.department, language)} {t("with")} {appointment.doctorName} {t("on")} {new Date(appointment.appointmentDate).toLocaleDateString()} {t("at")} {appointment.appointmentTime}</span>
                </div>
                <select value={appointment.status} onChange={(event) => updateAppointment(appointment._id, event.target.value)}>
                  <option value="pending">{t("pending")}</option>
                  <option value="confirmed">{t("confirmed")}</option>
                  <option value="completed">{t("completed")}</option>
                  <option value="cancelled">{t("cancelled")}</option>
                </select>
              </div>
            ))}
          </div>
        )}

        {tab === "contacts" && (
          <div className="table-card">
            <h2>{t("manageContactInquiries")}</h2>
            {contacts.map((contact) => (
              <div className="table-row" key={contact._id}>
                <div>
                  <strong>{contact.name}</strong>
                  <span>{contact.subject} - {contact.email}</span>
                  <small>{contact.message}</small>
                </div>
                <select value={contact.status} onChange={(event) => updateContact(contact._id, event.target.value)}>
                  <option value="new">{t("newStatus")}</option>
                  <option value="reviewed">{t("reviewed")}</option>
                  <option value="resolved">{t("resolved")}</option>
                </select>
                <button className="icon-button danger" onClick={() => deleteContact(contact._id)} aria-label={t("deleteInquiry")}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
