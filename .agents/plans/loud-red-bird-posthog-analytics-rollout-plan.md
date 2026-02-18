---
date: 2026-02-18
title: PostHog Analytics Rollout Plan
status: Ready for implementation
owner: Product Engineering
---

## Goal
Implement PostHog analytics across the app to answer week-1 product questions around discoverability and activation, while keeping instrumentation explicit, debuggable, and privacy-safe.

## Success Criteria
- We can reliably answer: search usage, preview engagement, and copy/install conversion by block category and route.
- Events are stable, typed, and queryable without ad-hoc cleanup.
- No session replay is enabled.
- Production analytics can be removed quickly via code rollback.

## Final Decisions (from interview)
- Hosting: PostHog Cloud US (`https://us.i.posthog.com`).
- Consent model: Full tracking in production; no opt-out flow required for current user base.
- Identity: No login-based identity; use PostHog anonymous `distinct_id` only.
- Session replay: Disabled (not in scope now).
- Primary activation metric: Any copy/install action.
- Data hygiene: Track production only; filter internal/dev/test traffic via env/domain allowlist.
- Rollback: Code rollback only (no runtime kill-switch requirement).
- Taxonomy style: `verb_object` snake_case event names.
- Property policy: Strict schema + sanitizer per event.

## Scope

### In Scope
- Client-side PostHog initialization and provider wiring.
- Manual `$pageview` capture on route changes.
- Instrumentation for high-value user actions (search, preview, copy/install, CTA).
- Event schema typing and centralized analytics helpers.
- Production verification and initial dashboard setup.

### Out of Scope
- Session replay and autocapture-heavy rollout.
- Login/user identification flows.
- Regional consent branching or CMP integration.
- Server-side event pipeline migration.

## Technical Design

## 1) Foundation
- Add dependencies: `posthog-js`, `@posthog/react`.
- Add env vars:
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST` (set to `https://us.i.posthog.com`)
  - `NEXT_PUBLIC_VERCEL_ENV` (or equivalent env discriminator already in project)
- Create `app/providers/posthog-provider.tsx` (client component):
  - Initialize with `defaults: '2025-11-30'`.
  - Set `capture_pageview: false`.
  - Keep replay disabled (`disable_session_recording: true` if needed, and do not add replay plugin).
  - Use lazy import/init only in production environment.

## 2) Global Wiring
- Wrap app tree with provider in `app/layout.tsx`.
- Add route tracker component using `usePathname` + `useSearchParams`:
  - Emit explicit `$pageview` on route/query change.
  - Include normalized route metadata in event properties.
- Review legacy production tracking script in `app/(blocks)/layout.tsx`:
  - Remove only after PostHog parity verification is complete.
  - Avoid double-firing pageview events during transition.

## 2.1) Reverse Proxy for Adblock Resistance
- Add PostHog rewrites in `next.config.ts` so browser requests stay on our domain.
- Use a non-obvious path prefix (adblock-resistant): `/ingest`.
- Keep static rewrite first, catch-all second, and enable trailing slash handling required by PostHog API.

```ts
async rewrites() {
  return [
    {
      source: '/ingest/static/:path*',
      destination: 'https://us-assets.i.posthog.com/static/:path*',
    },
    {
      source: '/ingest/:path*',
      destination: 'https://us.i.posthog.com/:path*',
    },
  ]
},
skipTrailingSlashRedirect: true,
```

- Update SDK init to route through proxy:
  - `api_host: '/ingest'`
  - `ui_host: 'https://us.posthog.com'`
- Avoid obvious blocked paths (`/analytics`, `/tracking`, `/telemetry`, `/posthog`).
- Verification: in browser network tab, confirm `200` requests to `/ingest/*` and events visible in PostHog activity.
- Fallback: if host platform rewrites cause `503`/`400`, switch to Next.js `proxy.ts`/middleware-based proxying for header control.

## 3) Event Taxonomy and Contracts
- Create typed source of truth in `lib/analytics/events.ts`.
- Naming convention: `verb_object` snake_case.
- Implement helper API in `lib/analytics/capture.ts`:
  - `capture(eventName, props)`
  - runtime sanitation + schema validation
  - no-op fallback outside production

Required week-1 events:
- `search_submitted`
- `search_filter_changed`
- `block_preview_opened`
- `snippet_copied`
- `registry_install_clicked`
- `cta_clicked`

Common event properties (base contract):
- `route_path` (normalized pathname)
- `route_query_keys` (array of keys only, no raw values)
- `referrer_host` (hostname only)
- `block_id` (when available)
- `category_id` (when available)
- `ui_surface` (search_bar, block_card, preview_modal, docs_page, etc.)
- `vercel_env` (production/preview/development)
- `app_version` (commit SHA or release tag if available)

Event-specific property guidance:
- `search_submitted`: include query length and token count; do not include raw query text.
- `search_filter_changed`: include filter key/value from controlled enum only.
- `snippet_copied`: include snippet type/language and copy target; no code payload.
- `registry_install_clicked`: include package/block identifier and invocation context.
- `cta_clicked`: include CTA identifier and destination host only.

## 4) Privacy, Safety, and Data Hygiene
- Do not send PII in event properties (emails, full URLs with params, free-form text blobs).
- Add sanitizer rules:
  - Strip email-like strings.
  - Strip URL query strings; keep host/path only if needed.
  - Cap string length (for example 120 chars) and array length.
  - Reject unknown properties for typed events.
- Mark sensitive UI regions with PostHog no-capture attributes where appropriate.
- Track in production only with strict guardrails:
  - No capture on localhost.
  - No capture on preview/staging unless explicitly enabled.
  - Exclude known internal domains/users through ingestion filters or property filter in dashboards.

## 5) Verification and Adoption

Verification checklist:
- Dev smoke test with PostHog Live Events.
- Production spot checks for each required event.
- Confirm one `$pageview` per navigation (no duplicates).
- Confirm properties match schema and sanitizer behavior.
- Confirm no session replay data appears.

Dashboard/Funnel pack (week 1):
- Top routes by unique visitors.
- Search engagement funnel: `search_submitted` -> `block_preview_opened` -> (`snippet_copied` OR `registry_install_clicked`).
- Activation by category: conversion rate to copy/install.
- CTA conversion by source route and CTA id.

## Rollout Sequence
1. Ship provider + production-only initialization + typed capture helper.
2. Add explicit pageview tracker and high-value event instrumentation.
3. Remove/replace legacy tracking script after parity validation.
4. Build dashboards and run first-week KPI review.
5. Iterate event gaps and schema improvements based on query friction.

## Failure Modes and Mitigations
- Duplicate events due to mixed legacy/new tracking:
  - Mitigation: temporary dual-run validation window and event count comparison before old script removal.
- High-cardinality property blow-up:
  - Mitigation: strict event schemas + sanitizer + enum-only dynamic fields.
- Analytics noise from internal/testing traffic:
  - Mitigation: production-only capture and exclusion filters.
- Runtime/client issues from analytics SDK:
  - Mitigation: isolate analytics helper and rollback via code deploy revert.

## Implementation Notes
- Keep all instrumentation calls behind a small internal analytics API rather than calling `posthog.capture` directly from UI components.
- Prefer event emissions at intent boundaries (submit/click/open) over low-value interaction spam.
- Keep event docs close to code in `lib/analytics/events.ts` to avoid drift.

## Open Questions
- None blocking for initial rollout.
- Optional future decision: add runtime kill-switch env toggle if rollback speed becomes an operational concern.
