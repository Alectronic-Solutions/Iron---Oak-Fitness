import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { pageMetadata } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Member Login",
    description: "Sign in to manage your Iron & Oak bookings, membership and payments.",
    path: "/login",
  }),
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="hero-bg">
      <div className="shell grid min-h-[70vh] place-items-center py-12 sm:py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="eyebrow">Member portal</p>
            <h1 className="mt-3 text-4xl uppercase leading-none text-bone sm:text-5xl">
              Welcome back
            </h1>
            <p className="mt-3 text-bone-muted">Bookings, billing and your training, in one place.</p>
          </div>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-bone-muted">
            Not a member yet?{" "}
            <Link href="/free-trial" className="text-oak-soft underline hover:text-bone">
              Try a class free
            </Link>{" "}
            or{" "}
            <Link href="/membership" className="text-oak-soft underline hover:text-bone">
              see plans
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
