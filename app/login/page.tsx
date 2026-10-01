import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login - ByteSpace",
  description:
    "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Sign in with ease"
      subtext="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
    >
      <LoginForm />
    </AuthLayout>
  );
}
