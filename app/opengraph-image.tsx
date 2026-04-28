import { ImageResponse } from "next/og";

export const alt = "SP Automotive Collision & Repair";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 96, letterSpacing: -2, fontWeight: 700 }}>
          SP Automotive
        </div>
        <div style={{ fontSize: 32, color: "#737373", marginTop: 16 }}>
          Collision &amp; Repair · Sarasota, FL
        </div>
      </div>
    ),
    { ...size }
  );
}
