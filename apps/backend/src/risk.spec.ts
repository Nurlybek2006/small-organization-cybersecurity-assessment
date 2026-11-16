import { riskScore, severityFor } from "@cyberguard/shared";
describe("оқу тәуекелінің детерминистік моделі", () => {
  it("ықтималдық пен әсерді көбейтеді", () => expect(riskScore(4, 3)).toBe(12));
  it("білім беру шектерін қолданады", () => {
    expect(severityFor(4)).toBe("LOW");
    expect(severityFor(5)).toBe("MEDIUM");
    expect(severityFor(9)).toBe("MEDIUM");
    expect(severityFor(10)).toBe("HIGH");
  });
  it("1–5 аралығын тексереді", () => expect(() => riskScore(0, 3)).toThrow());
});
