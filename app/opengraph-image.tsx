import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e0f11",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(176,122,60,0.35) 0%, rgba(14,15,17,0) 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 14,
              backgroundColor: "#c9a227",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#f4f1ea",
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            Iron <span style={{ color: "#cda06a", margin: "0 12px" }}>&amp;</span> Oak
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#c9a227",
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 22,
            color: "#b9b4a8",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    { ...size },
  );
}
