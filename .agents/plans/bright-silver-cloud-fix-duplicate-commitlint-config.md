---
date: 2026-02-17
title: Fix Duplicate Commitlint Config
---

Goal: keep one canonical commitlint config and remove duplication.
- Compare `commitlint.config.cjs` vs `commitlint.config.ts` and all references.
- Pick canonical file format based on runtime/tooling compatibility.
- Merge any unique rules into canonical config.
- Delete duplicate config and update references/docs if needed.
- Verify with local commitlint invocation and project checks.
Done when: exactly one commitlint config remains and checks pass.
Unresolved questions: none.