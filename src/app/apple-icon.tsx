import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// same mark as icon.svg, on a full-bleed square (iOS rounds the corners itself)
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <rect x="1.5" y="1.5" width="61" height="61" fill="#111111" stroke="#f2efe9" strokeWidth="2" />
          <path
            d="M18 46V18h10.5c7 0 11.2 5 11.2 14s-4.2 14-11.2 14H18Zm5.8-5.2h4.3c3.9 0 6-3 6-8.8s-2.1-8.8-6-8.8h-4.3v17.6Z"
            fill="#f2efe9"
          />
          <circle cx="47" cy="18.5" r="2.6" fill="#ff5a33" />
        </svg>
      </div>
    ),
    size,
  );
}
