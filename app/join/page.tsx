import { ShieldCheck } from "lucide-react";
import { JoinFlow } from "@/components/join/JoinFlow";
import { pageMetadata } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Join",
    description: "Become an Iron & Oak member in under two minutes. No joining fee, cancel anytime.",
    path: "/join",
  }),
  // Checkout steps shouldn't compete with the membership page in search.
  robots: { index: false, follow: true },
};

export default function JoinPage() {
  return (
    <div className="grain">
      <div className="shell py-10 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Membership</p>
          <h1 className="mt-3 text-4xl uppercase leading-none text-bone sm:text-5xl">
            Join Iron &amp; Oak
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-bone-muted">
            <ShieldCheck className="h-4 w-4 text-oak" />
            No joining fee · no contract · cancel anytime
          </p>
        </div>
        <JoinFlow />
      </div>
    </div>
  );
}
