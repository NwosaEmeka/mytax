import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Taxbox Naija - Personal Income Tax Calculator 2025";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo/Flag */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          🇳🇬
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Taxbox Naija
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "#86efac",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Personal Income Tax Calculator
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 20,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "16px 32px",
              borderRadius: 12,
              color: "white",
              fontSize: 24,
            }}
          >
            ✓ 2025 Tax Reform
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "16px 32px",
              borderRadius: 12,
              color: "white",
              fontSize: 24,
            }}
          >
            ✓ First ₦800K Tax-Free
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "16px 32px",
              borderRadius: 12,
              color: "white",
              fontSize: 24,
            }}
          >
            ✓ Free Calculator
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "#bbf7d0",
          }}
        >
          taxcalc.com.ng
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
