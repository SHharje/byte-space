"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate individual field
  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
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
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
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
    setTouched({ email: true, password: true });

    if (validateAll()) {
      // TEMP / STUB: Client-side validation successful.
      // TODO: Connect to backend authentication service / NextAuth when ready.
      console.log("Login submitted successfully:", {
        email: formData.email,
        password: "•".repeat(formData.password.length),
      });

      setSubmitSuccess(true);
    }
  };

  const handleSocialClick = (provider: "Facebook" | "Google") => {
    // TEMP / STUB: Social OAuth placeholder.
    // TODO: Wire up OAuth provider authentication.
    console.log(`Social login initiated: ${provider}`);
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
        Sign In
      </p>

      {/* ── Heading ── */}
      <h1
        className="mt-1.5 text-[34px] font-bold leading-[1.2] text-ink"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Welcome Back
      </h1>

      {/* ── Success banner if validated in preview ── */}
      {submitSuccess && (
        <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-3 text-[14px] text-green-800">
          Sign in credentials validated! Check console for submission log.
        </div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-[14px] font-medium text-ink"
          >
            Email
          </label>
          <input
            id="login-email"
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
            htmlFor="login-password"
            className="block text-[14px] font-medium text-ink"
          >
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="login-password"
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
            Sign In
          </Button>
        </div>
      </form>

      {/* ── "or" Divider ── */}
      <div className="relative my-8 flex items-center justify-center">
        <div className="w-full border-t border-card-border" />
        <span className="absolute bg-white px-4 text-[14px] text-muted">
          or
        </span>
      </div>

      {/* ── Social Login Buttons ── */}
      <div className="flex items-center justify-center gap-4">
        {/* Facebook Button */}
        <button
          type="button"
          onClick={() => handleSocialClick("Facebook")}
          aria-label="Sign in with Facebook"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border bg-white text-ink transition-all hover:bg-[#F9FAFB] hover:border-gray-300 active:scale-95"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Google Button */}
        <button
          type="button"
          onClick={() => handleSocialClick("Google")}
          aria-label="Sign in with Google"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border bg-white text-ink transition-all hover:bg-[#F9FAFB] hover:border-gray-300 active:scale-95"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        </button>
      </div>

      {/* ── Footer Link ── */}
      <div className="mt-8 text-center text-[15px]">
        <span className="text-muted">New user? </span>
        <Link
          href="/register"
          className="font-medium text-[#3B82F6] hover:underline"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
