import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Orea Camp, campamento de verano en Ciudad Real";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#102c27",
        color: "#f3e9d4",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        overflow: "hidden",
        padding: "70px 76px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "2px solid rgba(243, 233, 212, 0.18)",
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 62px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 25,
            fontWeight: 700,
            gap: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              background: "#f07b36",
              borderRadius: 999,
              display: "flex",
              height: 20,
              width: 20,
            }}
          />
          Orea Camp · Temporada 2027
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 0.98,
              maxWidth: 930,
            }}
          >
            El verano en el que empiezan a volver distintos
          </div>
          <div
            style={{
              color: "#a8b58b",
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Naturaleza y aventura · 6 a 16 años · Ciudad Real
          </div>
        </div>
      </div>
      <svg
        height="630"
        style={{ opacity: 0.22, position: "absolute", right: -120, top: 0 }}
        viewBox="0 0 520 630"
        width="520"
      >
        <path
          d="M85 30C285 75 35 175 310 235C500 276 150 350 395 430C520 470 260 555 480 612"
          fill="none"
          stroke="#f3e9d4"
          strokeWidth="3"
        />
        <path
          d="M160 5C340 105 92 150 380 215C540 250 225 340 460 392C570 420 355 520 515 580"
          fill="none"
          stroke="#f07b36"
          strokeWidth="6"
        />
      </svg>
    </div>,
    size,
  );
}
