import { describe, expect, it } from "vitest";

import { siteContent } from "./site-content";

describe("siteContent", () => {
  it("publishes an honest 2027 prelaunch state", () => {
    expect(siteContent.season.year).toBe(2027);
    expect(siteContent.season.status).toBe("prelaunch");
    expect(siteContent.season.sessions).toEqual([]);
    expect(siteContent.season.message).toBe("Fechas y plazas próximamente");
  });

  it("contains a chronological, complete camp day", () => {
    expect(siteContent.timeline[0].time).toBe("08:30");
    expect(siteContent.timeline.at(-1)?.time).toBe("22:15");
    expect(siteContent.timeline.length).toBeGreaterThanOrEqual(8);
  });

  it("does not expose stale 2026 sales language", () => {
    expect(JSON.stringify(siteContent)).not.toMatch(/690|630|últimas plazas/i);
  });
});
