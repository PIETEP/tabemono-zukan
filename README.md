# 食べ物図鑑 – Tabemono Zukan

このレポジトリは「このレシピはどれくらい身体にいい？」を根拠付きで即答するMVPです。

## MVP
- Health Score (0–100)
- A/B 食材比較（ユーザー状態に最適化）
- レシピ栄養自動計算＋構造化データ

## 開発
- Next.js / Node 20
- DB: Postgres (Prisma)
- `pnpm i && pnpm dev`

## 自動化
- `/codex` コメントで仕様ドラフト生成（docs/specs に吐き出し）
- CI: lint, typecheck, test
