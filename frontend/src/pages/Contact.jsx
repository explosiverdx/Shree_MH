import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

export default function Contact() {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(() => setMessage(""), 3500);
    return () => window.clearTimeout(timer);
  }, [message]);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || t("inquiryError"));
      }

      form.reset();
      setMessage(t("inquirySent"));
    } catch (error) {
      setMessage(error.message || t("inquiryError"));
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
          {message && <p className="status">{message}</p>}
        </form>
      </section>
    </main>
  );
}
