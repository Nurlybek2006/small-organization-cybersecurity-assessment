export type Severity = "LOW" | "MEDIUM" | "HIGH";
export type Language = "kk" | "ru" | "en";
export const severityFor = (score: number): Severity =>
  score <= 4 ? "LOW" : score <= 9 ? "MEDIUM" : "HIGH";
export const riskScore = (likelihood: number, impact: number): number => {
  if (
    !Number.isInteger(likelihood) ||
    likelihood < 1 ||
    likelihood > 5 ||
    !Number.isInteger(impact) ||
    impact < 1 ||
    impact > 5
  )
    throw new RangeError("Likelihood and impact must be integers from 1 to 5");
  return likelihood * impact;
};
export const severityLabel: Record<Language, Record<Severity, string>> = {
  kk: { LOW: "Төмен", MEDIUM: "Орташа", HIGH: "Жоғары" },
  ru: { LOW: "Низкий", MEDIUM: "Средний", HIGH: "Высокий" },
  en: { LOW: "Low", MEDIUM: "Medium", HIGH: "High" },
};
export interface AssetDto {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  criticality: number;
  createdAt: string;
  updatedAt: string;
  risks?: Array<{
    id: string;
    score: number;
    severity: Severity;
    threat?: { name: string };
  }>;
}
export interface DashboardSummary {
  securityScore: number;
  assetCount: number;
  riskCount: number;
  high: number;
  medium: number;
  low: number;
  controlsComplete: number;
  controlCount: number;
  openRecommendations: number;
  risks: Array<{
    id: string;
    score: number;
    severity: Severity;
    asset: { name: string };
    threat: { name: string };
    mitigation: string;
    updatedAt: string;
  }>;
  activities: Array<{
    id: string;
    action: string;
    entity: string;
    entityId: string;
    details: string;
    createdAt: string;
  }>;
}
