"use client";

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="min-h-11 cursor-pointer text-xs text-bone-faint transition-colors hover:text-oak-soft"
    >
      Back to top ↑
    </button>
  );
}
