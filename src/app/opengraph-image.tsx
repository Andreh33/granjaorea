import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "Granja Escuela Orea: granja escuela, hípica y campamentos en Ciudad Real";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#fbfaf5",
        color: "#183b2b",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        overflow: "hidden",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            color: "#7b8042",
            fontFamily: "Georgia, serif",
            fontSize: 34,
            fontWeight: 800,
            gap: 20,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              background: "#c7643d",
              display: "flex",
              height: 5,
              width: 72,
            }}
          />
          OREA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Georgia, serif",
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            Naturaleza para aprender. Todo el año.
          </div>
          <div
            style={{
              color: "#183b2b",
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            Granja escuela · Hípica · Campamentos
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#7b8042",
            display: "flex",
            fontSize: 23,
            fontWeight: 700,
            justifyContent: "space-between",
            letterSpacing: 1,
          }}
        >
          <span>Ciudad Real</span>
          <span>Desde 1990</span>
        </div>
      </div>
      <svg
        height="630"
        style={{ opacity: 0.16, position: "absolute", right: -80, top: 0 }}
        viewBox="0 0 560 630"
        width="560"
      >
        <path
          d="M65 18C290 88 42 172 332 238C532 284 164 358 426 438C548 476 292 554 522 616"
          fill="none"
          stroke="#7b8042"
          strokeWidth="4"
        />
        <path
          d="M152 2C356 102 94 158 398 222C550 254 238 344 488 402C584 426 374 520 548 586"
          fill="none"
          stroke="#c7643d"
          strokeWidth="7"
        />
      </svg>
    </div>,
    size,
  );
}
