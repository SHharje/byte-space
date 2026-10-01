"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormState {
  fullName: string;
  email: string;
  password: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

export function RegisterForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<{
    fullName?: boolean;
    email?: boolean;
    password?: boolean;
  }>({});

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate a single field
  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return undefined;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateAll = (): boolean => {
    const newErrors: FormErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return !newErrors.fullName && !newErrors.email && !newErrors.password;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true });

    if (validateAll()) {
      // TEMP / STUB: Client-side validation successful.
      // TODO: Connect to backend authentication service / NextAuth when ready.
      console.log("Registration submitted successfully:", {
        fullName: formData.fullName,
        email: formData.email,
        password: "•".repeat(formData.password.length),
      });

      setSubmitSuccess(true);
    }
  };

  return (
    <div
      className="w-full rounded-[20px] bg-white p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,10,80,0.18)]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ── Eyebrow ── */}
      <p
        className="text-[15px] font-medium text-[#3B82F6]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Create an Account
      </p>

      {/* ── Heading ── */}
      <h1
        className="mt-1.5 text-[34px] font-bold leading-[1.2] text-ink"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Welcome to<br />ByteSpace
      </h1>

      {/* ── Success banner if validated in preview ── */}
      {submitSuccess && (
        <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-3 text-[14px] text-green-800">
          Account details validated! Check the browser console for form submission log.
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-6">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="register-name"
            className="block text-[14px] font-medium text-ink"
          >
            Full Name
          </label>
          <input
            id="register-name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            placeholder="Jamie Davis"
            className={`mt-2 w-full rounded-[10px] border bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-[#9CA3AF] transition-all outline-none ${
              errors.fullName && touched.fullName
                ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                : "border-card-border focus:border-transparent focus:ring-2 focus:ring-lime/60"
            }`}
          />
          {errors.fullName && touched.fullName && (
            <p className="mt-1.5 text-[13px] text-red-500 font-normal">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="register-email"
            className="block text-[14px] font-medium text-ink"
          >
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="designer@example.com"
            className={`mt-2 w-full rounded-[10px] border bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-[#9CA3AF] transition-all outline-none ${
              errors.email && touched.email
                ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                : "border-card-border focus:border-transparent focus:ring-2 focus:ring-lime/60"
            }`}
          />
          {errors.email && touched.email && (
            <p className="mt-1.5 text-[13px] text-red-500 font-normal">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="register-password"
            className="block text-[14px] font-medium text-ink"
          >
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="••••••••"
              className={`w-full rounded-[10px] border bg-white px-4 py-3.5 pr-11 text-[15px] text-ink placeholder:text-[#9CA3AF] transition-all outline-none ${
                errors.password && touched.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-400/40"
                  : "border-card-border focus:border-transparent focus:ring-2 focus:ring-lime/60"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="mt-1.5 text-[13px] text-red-500 font-normal">
              {errors.password}
            </p>
          )}
        </div>

        {/* ── Submit Button (Right-aligned) ── */}
        <div className="pt-1 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="px-7 py-3 text-[15px] font-medium"
          >
            Continue
          </Button>
        </div>
      </form>

      {/* ── Footer Link ── */}
      <div className="mt-7 text-center text-[15px]">
        <span className="text-muted">Already have an account? </span>
        <Link
          href="/login"
          className="font-medium text-[#3B82F6] hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
