import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MailQuestion,
  Pencil,
  Stethoscope,
  Trash2,
  X
} from "lucide-react";
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

const emptyDepartment = {
  name: "",
  icon: "Stethoscope",
  description: ""
};

const departmentOptions = [
  {
    name: "Orthopedics",
    icon: "Bone",
    description: "Bone, joint, fracture, arthritis, sports injury, and trauma care from experienced orthopedic specialists."
  },
  {
    name: "Joint Replacement",
    icon: "Activity",
    description: "Knee, hip, and shoulder replacement planning with modern surgical care and recovery support."
  },
  {
    name: "Spine Care",
    icon: "Stethoscope",
    description: "Back pain, neck pain, disc problems, posture concerns, and spine rehabilitation care."
  },
  {
    name: "Emergency & Trauma",
    icon: "HeartPulse",
    description: "24/7 emergency response for fractures, accidents, pain, trauma, and urgent multispeciality support."
  },
  {
    name: "Sports Injury",
    icon: "Activity",
    description: "Care for ligament injuries, sprains, shoulder injuries, knee injuries, and sports rehabilitation."
  },
  {
    name: "Physiotherapy & Rehabilitation",
    icon: "Stethoscope",
    description: "Physiotherapy, mobility training, post-surgery recovery, and guided rehabilitation programs."
  }
];

const specializationOptions = [
  "Senior Orthopedic Surgeon",
  "Joint Replacement Specialist",
  "Spine and Trauma Consultant",
  "Emergency & Trauma Specialist",
  "Sports Injury Specialist",
  "Physiotherapy and Rehabilitation Specialist"
];

export default function AdminDashboard() {
  const { language, t } = useLanguage();
  const tabKeys = ["overview", "doctors", "departments", "appointments", "contacts"];
  const [tab, setTab] = useState("overview");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [departmentForm, setDepartmentForm] = useState(emptyDepartment);
  const [editingDoctorId, setEditingDoctorId] = useState("");
  const [editingDepartmentId, setEditingDepartmentId] = useState("");
  const [message, setMessage] = useState("");

  async function loadAdminData() {
    const [departmentRes, doctorRes, appointmentRes, contactRes] = await Promise.all([
      api.get("/departments"),
      api.get("/doctors"),
      api.get("/appointments"),
      api.get("/contacts")
    ]);
    setDepartments(departmentRes.data);
    setDoctors(doctorRes.data);
    setAppointments(appointmentRes.data);
    setContacts(contactRes.data);
  }

  useEffect(() => {
    loadAdminData().catch((error) => setMessage(error.response?.data?.message || t("loadAdminError")));
  }, [t]);

  const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending").length;
  const openInquiries = contacts.filter((contact) => contact.status !== "resolved").length;

  const metrics = useMemo(() => [
    [t("doctors"), doctors.length, Stethoscope],
    [t("departments"), departments.length, Building2],
    [t("appointments"), appointments.length, CalendarDays],
    [t("pending"), pendingAppointments, Clock3],
    [t("inquiries"), openInquiries, MailQuestion]
  ], [departments.length, doctors.length, appointments.length, pendingAppointments, openInquiries, t]);

  function doctorPayload() {
    return {
      ...doctorForm,
      experience: Number(doctorForm.experience),
      fee: Number(doctorForm.fee || 0),
      availableDays: doctorForm.availableDays.split(",").map((day) => day.trim()).filter(Boolean)
    };
  }

  async function saveDoctor(event) {
    event.preventDefault();
    try {
      if (editingDoctorId) {
        await api.put(`/doctors/${editingDoctorId}`, doctorPayload());
        setMessage(t("doctorUpdated"));
      } else {
        await api.post("/doctors", doctorPayload());
        setMessage(t("doctorAdded"));
      }
      cancelDoctorEdit();
      await loadAdminData();
    } catch (error) {
      setMessage(error.response?.data?.message || t("saveDoctorError"));
    }
  }

  function editDoctor(doctor) {
    setEditingDoctorId(doctor._id);
    setDoctorForm({
      name: doctor.name || "",
      department: doctor.department || "",
      specialization: doctor.specialization || "",
      experience: doctor.experience || "",
      qualification: doctor.qualification || "",
      fee: doctor.fee || "",
      availableDays: (doctor.availableDays || []).join(", ")
    });
    setTab("doctors");
  }

  function cancelDoctorEdit() {
    setEditingDoctorId("");
    setDoctorForm(emptyDoctor);
  }

  async function deleteDoctor(id) {
    await api.delete(`/doctors/${id}`);
    setMessage(t("doctorDeleted"));
    await loadAdminData();
  }

  async function saveDepartment(event) {
    event.preventDefault();
    try {
      if (editingDepartmentId) {
        await api.put(`/departments/${editingDepartmentId}`, departmentForm);
        setMessage(t("departmentUpdated"));
      } else {
        await api.post("/departments", departmentForm);
        setMessage(t("departmentAdded"));
      }
      cancelDepartmentEdit();
      await loadAdminData();
    } catch (error) {
      setMessage(error.response?.data?.message || t("saveDepartmentError"));
    }
  }

  function editDepartment(department) {
    setEditingDepartmentId(department._id);
    setDepartmentForm({
      name: department.name || "",
      icon: department.icon || "Stethoscope",
      description: department.description || ""
    });
    setTab("departments");
  }

  function cancelDepartmentEdit() {
    setEditingDepartmentId("");
    setDepartmentForm(emptyDepartment);
  }

  function chooseDepartmentTemplate(name) {
    const selected = departmentOptions.find((department) => department.name === name);
    setDepartmentForm(selected ? selected : { ...departmentForm, name });
  }

  async function deleteDepartment(id) {
    await api.delete(`/departments/${id}`);
    setMessage(t("departmentDeleted"));
    await loadAdminData();
  }

  async function updateAppointment(id, status) {
    await api.patch(`/appointments/${id}/status`, { status });
    await loadAdminData();
  }

  async function deleteAppointment(id) {
    await api.delete(`/appointments/${id}`);
    setMessage(t("appointmentDeleted"));
    await loadAdminData();
  }

  async function updateContact(id, status) {
    await api.patch(`/contacts/${id}/status`, { status });
    await loadAdminData();
  }

  async function deleteContact(id) {
    await api.delete(`/contacts/${id}`);
    setMessage(t("inquiryDeleted"));
    await loadAdminData();
  }

  function statusLabel(status) {
    const labels = {
      pending: t("pending"),
      confirmed: t("confirmed"),
      completed: t("completed"),
      cancelled: t("cancelled"),
      new: t("newStatus"),
      reviewed: t("reviewed"),
      resolved: t("resolved")
    };
    return labels[status] || status;
  }

  return (
    <main className="page admin-page">
      <section className="section compact">
        <div className="admin-hero">
          <div>
            <span className="eyebrow">{t("adminDashboard")}</span>
            <h1>{t("manageAdmin")}</h1>
          </div>
          <div className="admin-hero-card">
            <CheckCircle2 size={20} />
            <span>{t("adminControlRoom")}</span>
          </div>
        </div>

        <div className="metric-grid admin-metrics">
          {metrics.map(([label, value, Icon]) => (
            <article className="metric-card" key={label}>
              <Icon />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <div className="tabs admin-tabs">
          {tabKeys.map((item) => (
            <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>
              {t(item)}
            </button>
          ))}
        </div>

        {message && <p className="status admin-status">{message}</p>}

        {tab === "overview" && (
          <section className="admin-overview">
            <div className="table-card">
              <h2>{t("recentAppointments")}</h2>
              {appointments.slice(0, 5).map((appointment) => (
                <div className="table-row admin-row" key={appointment._id}>
                  <div>
                    <strong>{appointment.patientName}</strong>
                    <span>{getDoctorDepartment(appointment.department, language)} {t("with")} {appointment.doctorName}</span>
                    <small>{new Date(appointment.appointmentDate).toLocaleDateString()} {t("at")} {appointment.appointmentTime}</small>
                  </div>
                  <span className={`status-badge ${appointment.status}`}>{statusLabel(appointment.status)}</span>
                </div>
              ))}
            </div>
            <div className="table-card">
              <h2>{t("recentInquiries")}</h2>
              {contacts.slice(0, 5).map((contact) => (
                <div className="table-row admin-row" key={contact._id}>
                  <div>
                    <strong>{contact.name}</strong>
                    <span>{contact.subject}</span>
                    <small>{contact.email}</small>
                  </div>
                  <span className={`status-badge ${contact.status}`}>{statusLabel(contact.status)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "doctors" && (
          <section className="admin-grid">
            <form className="form-card" onSubmit={saveDoctor}>
              <div className="admin-form-head">
                <h2>{editingDoctorId ? t("editDoctor") : t("addDoctor")}</h2>
                {editingDoctorId && (
                  <button className="icon-button" type="button" onClick={cancelDoctorEdit} aria-label={t("cancel")}>
                    <X size={18} />
                  </button>
                )}
              </div>
              <input
                value={doctorForm.name}
                onChange={(event) => setDoctorForm({ ...doctorForm, name: event.target.value })}
                placeholder={t("name")}
                required
              />
              <select
                value={doctorForm.department}
                onChange={(event) => setDoctorForm({ ...doctorForm, department: event.target.value })}
                required
              >
                <option value="">{t("selectDepartment")}</option>
                {departments.map((department) => (
                  <option key={department._id} value={department.name}>
                    {getDoctorDepartment(department.name, language)}
                  </option>
                ))}
              </select>
              <select
                value={doctorForm.specialization}
                onChange={(event) => setDoctorForm({ ...doctorForm, specialization: event.target.value })}
                required
              >
                <option value="">{t("selectSpecialization")}</option>
                {specializationOptions.map((specialization) => (
                  <option key={specialization} value={specialization}>
                    {getDoctorSpecialization(specialization, language)}
                  </option>
                ))}
              </select>
              <input
                value={doctorForm.qualification}
                onChange={(event) => setDoctorForm({ ...doctorForm, qualification: event.target.value })}
                placeholder={t("qualification")}
                required
              />
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
              <button className="btn primary" type="submit">{editingDoctorId ? t("updateDoctor") : t("saveDoctor")}</button>
            </form>

            <div className="table-card">
              <h2>{t("manageDoctors")}</h2>
              {doctors.map((doctor) => (
                <div className="table-row" key={doctor._id}>
                  <div>
                    <strong>{doctor.name}</strong>
                    <span>{getDoctorDepartment(doctor.department, language)} - {getDoctorSpecialization(doctor.specialization, language)}</span>
                    <small>{doctor.experience} {t("yearsShort")} | {doctor.qualification}</small>
                  </div>
                  <button className="icon-button" onClick={() => editDoctor(doctor)} aria-label={t("editDoctor")}>
                    <Pencil size={18} />
                  </button>
                  <button className="icon-button danger" onClick={() => deleteDoctor(doctor._id)} aria-label={t("deleteDoctor")}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "departments" && (
          <section className="admin-grid">
            <form className="form-card" onSubmit={saveDepartment}>
              <div className="admin-form-head">
                <h2>{editingDepartmentId ? t("editDepartment") : t("addDepartment")}</h2>
                {editingDepartmentId && (
                  <button className="icon-button" type="button" onClick={cancelDepartmentEdit} aria-label={t("cancel")}>
                    <X size={18} />
                  </button>
                )}
              </div>
              <select
                value={departmentForm.name}
                onChange={(event) => chooseDepartmentTemplate(event.target.value)}
                required
              >
                <option value="">{t("selectDepartment")}</option>
                {departmentOptions.map((department) => (
                  <option key={department.name} value={department.name}>
                    {getDoctorDepartment(department.name, language)}
                  </option>
                ))}
              </select>
              <select
                value={departmentForm.icon}
                onChange={(event) => setDepartmentForm({ ...departmentForm, icon: event.target.value })}
              >
                <option value="Stethoscope">Stethoscope</option>
                <option value="Bone">Bone</option>
                <option value="Activity">Activity</option>
                <option value="HeartPulse">HeartPulse</option>
              </select>
              <textarea
                value={departmentForm.description}
                onChange={(event) => setDepartmentForm({ ...departmentForm, description: event.target.value })}
                placeholder={t("description")}
                rows="5"
                required
              />
              <button className="btn primary" type="submit">{editingDepartmentId ? t("updateDepartment") : t("saveDepartment")}</button>
            </form>

            <div className="table-card">
              <h2>{t("manageDepartments")}</h2>
              {departments.map((department) => (
                <div className="table-row" key={department._id}>
                  <div>
                    <strong>{department.name}</strong>
                    <span>{department.description}</span>
                  </div>
                  <button className="icon-button" onClick={() => editDepartment(department)} aria-label={t("editDepartment")}>
                    <Pencil size={18} />
                  </button>
                  <button className="icon-button danger" onClick={() => deleteDepartment(department._id)} aria-label={t("deleteDepartment")}>
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
                  <span>{getDoctorDepartment(appointment.department, language)} {t("with")} {appointment.doctorName}</span>
                  <small>{new Date(appointment.appointmentDate).toLocaleDateString()} {t("at")} {appointment.appointmentTime} | {appointment.email} | {appointment.phone}</small>
                </div>
                <select value={appointment.status} onChange={(event) => updateAppointment(appointment._id, event.target.value)}>
                  <option value="pending">{t("pending")}</option>
                  <option value="confirmed">{t("confirmed")}</option>
                  <option value="completed">{t("completed")}</option>
                  <option value="cancelled">{t("cancelled")}</option>
                </select>
                <button className="icon-button danger" onClick={() => deleteAppointment(appointment._id)} aria-label={t("deleteAppointment")}>
                  <Trash2 size={18} />
                </button>
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
