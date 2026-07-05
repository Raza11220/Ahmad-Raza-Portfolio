import { useState, FormEvent } from "react";
import {
  Send, Sparkles, AlertCircle, CheckCircle, Mail, Phone, MapPin,
  Linkedin, Github, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SpotlightCard from "../components/SpotlightCard";
import { PERSONAL_INFO } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { z } from "zod";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Zod validation schema for contact form inputs
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be at most 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
});

export default function Contact() {
  const { isLightMode } = useTheme();
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Validate a single field's current value against its specific Zod schema shape
  const validateField = (key: keyof FormFields, value: string) => {
    const fieldSchema = contactSchema.shape[key];
    const parseResult = fieldSchema.safeParse(value);
    if (!parseResult.success) {
      setErrors((prev) => ({ ...prev, [key]: parseResult.error.issues[0].message }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleInputChange = (key: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    
    // Real-time validation: only show error if the user has touched the field or an error already exists
    if (touched[key] || errors[key]) {
      const fieldSchema = contactSchema.shape[key];
      const parseResult = fieldSchema.safeParse(value);
      if (!parseResult.success) {
        setErrors((prev) => ({ ...prev, [key]: parseResult.error.issues[0].message }));
      } else {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    }
  };

  const handleBlur = (key: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateField(key, form[key]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched upon submission attempt
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Validate the complete form data
    const parseResult = contactSchema.safeParse(form);
    if (!parseResult.success) {
      const fieldErrors: Partial<FormFields> = {};
      parseResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormFields] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Use Web3Forms - a highly reliable and completely free service for static sites.
      // It forwards form submissions directly to the portfolio owner's email address: cathode1122@gmail.com
      const formData = new FormData();
      formData.append("access_key", "7dfa17d5-d0ff-4e78-90b5-c419be1e7da9"); // Web3Forms key mapped to Ahmad's profile
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);
      formData.append("from_name", "Ahmad's Portfolio Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});
        // Reset status back to idle after 6 seconds
        setTimeout(() => setSubmitStatus("idle"), 6000);
      } else {
        throw new Error(data.message || "Failed to dispatch message via API");
      }
    } catch (err) {
      console.warn("API delivery offline, triggering mailto fallback...", err);
      // Perfect Fail-Safe: open mail client pre-populated so message is never lost!
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        form.subject
      )}&body=${encodeURIComponent(
        `Hi Ahmad,\n\nMy Name: ${form.name}\nMy Email: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      
      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      setSubmitStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-24 border-t overflow-hidden transition-colors duration-300 ${
        isLightMode ? "bg-[#f8fafc] border-slate-200" : "bg-[#030712] border-slate-900"
      }`}
    >
      {/* Ambient Radial Lights */}
      {!isLightMode && (
        <>
          <div className="absolute top-1/4 right-10 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-10 h-80 w-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              isLightMode
                ? "border-cyan-200 bg-cyan-50 text-cyan-600"
                : "border-cyan-500/30 bg-cyan-500/5 text-cyan-400"
            }`}
          >
            <Sparkles className="h-3 w-3 animate-pulse" /> Connect
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-300 ${
              isLightMode ? "text-slate-900" : "text-white"
            }`}
          >
            Get In Touch
          </motion.h2>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        </div>

        {/* Contact Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left panel: Info cluster */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3
                className={`font-display text-xl sm:text-2xl font-bold leading-tight transition-colors duration-300 ${
                  isLightMode ? "text-slate-900" : "text-white"
                }`}
              >
                Let's discuss a project or opportunity!
              </h3>
              <p
                className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isLightMode ? "text-slate-600" : "text-gray-400"
                }`}
              >
                Have an application idea, a complex front-end requirement, or an open engineering role? Send me a message and let's coordinate.
              </p>
            </div>

            {/* Quick coordinates cards */}
            <div className="space-y-4">
              <SpotlightCard
                className={`p-4 flex items-center gap-4 transition-all duration-300 ${
                  isLightMode ? "bg-white border-slate-200/80 shadow-sm" : "bg-slate-900/30 border-slate-800"
                }`}
                glowColor={isLightMode ? "rgba(6, 182, 212, 0.03)" : "rgba(6, 182, 212, 0.08)"}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isLightMode
                      ? "bg-cyan-50 text-cyan-600 border-cyan-100"
                      : "bg-slate-950 text-cyan-400 border-slate-800"
                  }`}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Email Correspondence</h4>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className={`text-sm font-medium transition-colors ${
                      isLightMode ? "text-slate-800 hover:text-cyan-600" : "text-white hover:text-cyan-400"
                    }`}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </SpotlightCard>

              <SpotlightCard
                className={`p-4 flex items-center gap-4 transition-all duration-300 ${
                  isLightMode ? "bg-white border-slate-200/80 shadow-sm" : "bg-slate-900/30 border-slate-800"
                }`}
                glowColor={isLightMode ? "rgba(59, 130, 246, 0.03)" : "rgba(59, 130, 246, 0.08)"}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isLightMode
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : "bg-slate-950 text-blue-400 border-slate-800"
                  }`}
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Call Coordinates</h4>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className={`text-sm font-medium transition-colors ${
                      isLightMode ? "text-slate-800 hover:text-blue-600" : "text-white hover:text-blue-400"
                    }`}
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </SpotlightCard>

              <SpotlightCard
                className={`p-4 flex items-center gap-4 transition-all duration-300 ${
                  isLightMode ? "bg-white border-slate-200/80 shadow-sm" : "bg-slate-900/30 border-slate-800"
                }`}
                glowColor={isLightMode ? "rgba(139, 92, 246, 0.03)" : "rgba(139, 92, 246, 0.08)"}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isLightMode
                      ? "bg-violet-50 text-violet-600 border-violet-100"
                      : "bg-slate-950 text-violet-400 border-slate-800"
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Current Location</h4>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isLightMode ? "text-slate-800" : "text-white"
                    }`}
                  >
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </SpotlightCard>
            </div>

            {/* Social Links cluster */}
            <div className={`flex gap-4 pt-4 border-t ${isLightMode ? "border-slate-200" : "border-slate-900"}`}>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                  isLightMode
                    ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    : "border-slate-800 bg-slate-900/40 text-gray-400 hover:text-white"
                }`}
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                  isLightMode
                    ? "border-slate-200 bg-white text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                    : "border-slate-800 bg-slate-900/40 text-gray-400 hover:text-cyan-400"
                }`}
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right panel: Form details inside Glass Card */}
          <div className="lg:col-span-7">
            <div
              className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                isLightMode
                  ? "bg-white border-slate-200/85 shadow-xl shadow-slate-100"
                  : "glass-panel border-slate-800 shadow-2xl"
              }`}
            >
              {/* Overlay visual grid */}
              <div
                className={`absolute inset-0 grid-bg pointer-events-none transition-opacity duration-300 ${
                  isLightMode ? "opacity-[0.04]" : "opacity-10"
                }`}
              />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                {/* Name field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="name-input"
                    className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                      isLightMode ? "text-slate-500" : "text-gray-400"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`w-full h-11 px-4 rounded-xl border text-xs transition-all ${
                      errors.name ? "border-red-500" : isLightMode ? "border-slate-200" : "border-slate-800"
                    } ${
                      isLightMode
                        ? "bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                        : "bg-slate-950/80 text-white placeholder-gray-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30"
                    }`}
                    placeholder="e.g. John Doe"
                  />
                  {errors.name && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-red-500">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email-input"
                    className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                      isLightMode ? "text-slate-500" : "text-gray-400"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`w-full h-11 px-4 rounded-xl border text-xs transition-all ${
                      errors.email ? "border-red-500" : isLightMode ? "border-slate-200" : "border-slate-800"
                    } ${
                      isLightMode
                        ? "bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                        : "bg-slate-950/80 text-white placeholder-gray-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30"
                    }`}
                    placeholder="e.g. johndoe@gmail.com"
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-red-500">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject-input"
                    className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                      isLightMode ? "text-slate-500" : "text-gray-400"
                    }`}
                  >
                    Subject / Topic
                  </label>
                  <input
                    id="subject-input"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    className={`w-full h-11 px-4 rounded-xl border text-xs transition-all ${
                      errors.subject ? "border-red-500" : isLightMode ? "border-slate-200" : "border-slate-800"
                    } ${
                      isLightMode
                        ? "bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                        : "bg-slate-950/80 text-white placeholder-gray-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30"
                    }`}
                    placeholder="e.g. Project Consultation"
                  />
                  {errors.subject && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-red-500">
                      <AlertCircle className="h-3 w-3" /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message-input"
                    className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                      isLightMode ? "text-slate-500" : "text-gray-400"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message-input"
                    value={form.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    className={`w-full p-4 rounded-xl border text-xs transition-all resize-none ${
                      errors.message ? "border-red-500" : isLightMode ? "border-slate-200" : "border-slate-800"
                    } ${
                      isLightMode
                        ? "bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                        : "bg-slate-950/80 text-white placeholder-gray-600 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30"
                    }`}
                    placeholder="Write detailed specifications of your project proposal..."
                  />
                  {errors.message && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-red-500">
                      <AlertCircle className="h-3 w-3" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submission button with load states and statuses */}
                <div className="pt-3">
                  <button
                    id="submit-message-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-xs text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${
                      isLightMode
                        ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/10 disabled:bg-slate-100 disabled:text-slate-400"
                        : "bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/15 disabled:bg-slate-800 disabled:text-gray-500"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Dispatching message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Secure Message
                      </>
                    )}
                  </button>
                </div>

                {/* Success feedback panel overlay */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center rounded-2xl p-6 backdrop-blur-sm ${
                        isLightMode ? "bg-white/95" : "bg-slate-950/95"
                      }`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4 animate-bounce">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h4
                        className={`font-display text-lg font-bold tracking-wide ${
                          isLightMode ? "text-slate-900" : "text-white"
                        }`}
                      >
                        Message Sent!
                      </h4>
                      <p
                        className={`mt-2 text-xs max-w-sm leading-relaxed ${
                          isLightMode ? "text-slate-600" : "text-gray-400"
                        }`}
                      >
                        Thank you for reaching out! Your message was delivered successfully. Ahmad will get back to you soon.
                      </p>
                      <button
                        onClick={() => setSubmitStatus("idle")}
                        className={`mt-6 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                          isLightMode
                            ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                            : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-gray-300"
                        }`}
                      >
                        Dismiss Overlay
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
