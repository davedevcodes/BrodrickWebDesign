import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/settings";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const settings = await getSiteSettings();

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
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {settings.agency_name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#B3B3B3",
            textAlign: "center",
            padding: "0 120px",
          }}
        >
          {settings.seo_description}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
