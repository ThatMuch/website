## 2026-03-14 - [Pnpm lockfile pollution]
**Learning:** Running `pnpm install` to resolve test dependencies in an ephemeral environment generates a massive `pnpm-lock.yaml` file. Committing this pollutes small performance PRs and violates boundaries.
**Action:** Always clean up uninstructed generated lockfiles (`git restore --staged pnpm-lock.yaml && rm pnpm-lock.yaml`) before creating a PR.
