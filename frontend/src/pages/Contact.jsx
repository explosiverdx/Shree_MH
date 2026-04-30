import { useState } from "react";
import api from "../api/api.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      await api.post("/contacts", Object.fromEntries(new FormData(event.currentTarget)));
      event.currentTarget.reset();
      setMessage(t("inquirySent"));
    } catch (error) {
      setMessage(error.response?.data?.message || t("inquiryError"));
    }
  }

  return (
    <main className="page">
      <section className="form-layout">
        <div>
          <span className="eyebrow">{t("contact")}</span>
          <h1>{t("contactTitle")}</h1>
          <p>{t("contactText")}</p>
        </div>
        <form className="form-card" onSubmit={submit}>
          <input name="name" placeholder={t("fullName")} required />
          <input name="email" type="email" placeholder={t("emailAddress")} required />
          <input name="phone" placeholder={t("phoneNumber")} />
          <input name="subject" placeholder={t("subject")} required />
          <textarea name="message" rows="5" placeholder={t("message")} required></textarea>
          <button className="btn primary" type="submit">{t("sendInquiry")}</button>
          <p className="status">{message}</p>
        </form>
      </section>
    </main>
  );
}
