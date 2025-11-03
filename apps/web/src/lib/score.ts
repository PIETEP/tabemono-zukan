export type UserState = {
  goal?: "減量" | "筋肥大" | "妊活" | "減塩" | "集中";
  cautions?: Array<"高血圧" | "糖質制限" | "カフェイン感受性">;
};

export type Nutrients = {
  energyKcal?: number;
  protein?: number;     // g
  fiber?: number;       // g
  sodiumMg?: number;    // mg
  satFatG?: number;     // g
  addedSugarG?: number; // g
  folateMcg?: number;   // µg
  vitaminDmcg?: number; // µg
};

// v1: 超簡易スコア（デモ用）
export function healthScore(n: Nutrients, u?: UserState): number {
  let score = 50;
  if (n.fiber) score += Math.min(15, n.fiber * 1.2);
  if (n.protein) score += Math.min(15, (n.protein / 20) * 10);
  if (n.sodiumMg) score -= Math.min(20, n.sodiumMg / 100);
  if (n.satFatG) score -= Math.min(10, n.satFatG);
  if (n.addedSugarG) score -= Math.min(10, n.addedSugarG / 2);

  if (u?.goal === "減塩") score -= (n.sodiumMg ?? 0) / 80;
  if (u?.goal === "妊活") score += ((n.folateMcg ?? 0) / 100) * 2;

  return Math.max(0, Math.min(100, Math.round(score)));
}
