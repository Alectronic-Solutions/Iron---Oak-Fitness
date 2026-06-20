import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Iron & Oak Fitness — Strength, grounded.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0e0f11",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: "#c9a227",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0e0f11"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 5v14M18 5v14M3 9l3-4M21 9l-3-4M3 15l3 4M21 15l-3 4M9 12h6" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#f4f1ea",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Iron &amp; Oak
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f1ea",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Strength, grounded.
        </h1>

        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#c9a227",
            marginTop: 32,
            marginBottom: 32,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: 24,
            color: "#b9b4a8",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          Group classes · Personal training · Flexible membership
        </p>
      </div>
    ),
    { ...size }
  );
}
