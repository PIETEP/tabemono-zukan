"use client";

import { useState } from "react";
import { healthScore, type Nutrients, type UserState } from "@/lib/score";

const empty: Nutrients = { protein: 0, fiber: 0, sodiumMg: 0, satFatG: 0, addedSugarG: 0 };

export default function Home() {
  const [ua, setUa] = useState<UserState>({ goal: "減塩" });
  const [a, setA] = useState<Nutrients>({ ...empty });
  const [b, setB] = useState<Nutrients>({ ...empty });

  const scoreA = healthScore(a, ua);
  const scoreB = healthScore(b, ua);
  const better = scoreA === scoreB ? "同点" : scoreA > scoreB ? "A が推し" : "B が推し";

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Tabemono Zukan – デモ</h1>
      <p className="text-gray-600">A食材とB食材の栄養値を入れて「どちらが“今の自分”に良いか」を仮判定します（ロジックはデモ用）。</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">今の自分</h2>
        <select
          className="border p-2 rounded"
          value={ua.goal}
          onChange={(e) => setUa({ ...ua, goal: e.target.value as UserState["goal"] })}
        >
          <option value="減塩">減塩</option>
          <option value="減量">減量</option>
          <option value="筋肥大">筋肥大</option>
          <option value="妊活">妊活</option>
          <option value="集中">集中</option>
        </select>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <FoodCard title="A 食材" n={a} onChange={setA} />
        <FoodCard title="B 食材" n={b} onChange={setB} />
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">結果</h2>
        <div className="border rounded p-4">
          <p className="text-lg">
            A: <b>{scoreA}</b> 点　/　B: <b>{scoreB}</b> 点　→　<b>{better}</b>
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-6 mt-2">
            <li>係数はデモ用。後でデータベース/文献に基づき調整します。</li>
            <li>「減塩」選択時はナトリウム（食塩相当）へのペナルティが強くかかります。</li>
          </ul>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">参考文献（枠だけ）</h3>
        <p className="text-sm text-gray-600">この枠に PubMed / 公的DB のリンクを並べます（MVPでは手動、のち自動抽出）。</p>
      </section>
    </main>
  );
}

function FoodCard({
  title,
  n,
  onChange,
}: {
  title: string;
  n: Nutrients;
  onChange: (v: Nutrients) => void;
}) {
  return (
    <div className="border rounded p-4 space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <NumInput label="たんぱく質 (g)" value={n.protein} onChange={(v) => onChange({ ...n, protein: v })} />
      <NumInput label="食物繊維 (g)" value={n.fiber} onChange={(v) => onChange({ ...n, fiber: v })} />
      <NumInput label="ナトリウム (mg)" value={n.sodiumMg} onChange={(v) => onChange({ ...n, sodiumMg: v })} />
      <NumInput label="飽和脂肪酸 (g)" value={n.satFatG} onChange={(v) => onChange({ ...n, satFatG: v })} />
      <NumInput label="追加糖 (g)" value={n.addedSugarG} onChange={(v) => onChange({ ...n, addedSugarG: v })} />
    </div>
  );
}

function NumInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span>{label}</span>
      <input
        type="number"
        step="0.1"
        className="border p-2 w-full rounded mt-1"
        value={value ?? 0}
        onChange={(e) => onChange(parseFloat(e.target.value || "0"))}
      />
    </label>
  );
}
