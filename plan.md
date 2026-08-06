## Plan: TV Watch preview & purchase flow

TL;DR - Allow preview videos for upcoming and ended events; show a purchase button next to the event date (replacing the lock icon) for users who can buy early access; recordings remain behind purchase; preview remains viewable to everyone.

**Steps**
1. Update watch page composition to prefer preview video when event is upcoming or ended and preview exists.
2. Replace the lock icon beside the event date with a `Purchase` button for scheduled/upcoming events when a preview exists and the user does not already have access.
3. Modify player and overlay logic in the event player so that:
   - If `isLive` and user lacks access: keep the current locked banner/overlay (no preview auto-play).
   - If `isScheduled` (not live) and `previewVideoUrl` exists: show preview to all users; if user has access, hide purchase CTA/text.
   - If `isEnded`: if a recording exists and user has access -> show full recording; if no recording but preview exists -> show preview to all users; if recording exists but user lacks access -> show preview (if present) and keep recording locked behind purchase.
   - Ensure `hasAccess` gating is enforced server-side for recordings API and live tokens.
4. Add/ensure a `Purchase` button component near the event date that triggers the existing purchase flow (`/app/api/tv/watch/[id]/purchase/route.ts` and `components/payment-overlay.tsx`). For logged-out users, trigger the sign-in flow before purchase.
5. Update `video-view-panel` / `event-stream-player` to accept/propagate `previewVideoUrl`, `recordingUrl`, `isLive`, `isEnded`, and `hasAccess`, and render the preview or recording accordingly.
6. Update parts/playlist UI (`watch-parts-panel`) to mark preview-only parts and not show purchase text for users with access.
7. Add unit/integration tests covering: upcoming-with-preview, live-without-access, ended-with-recording-without-access, ended-without-recording-but-preview.
8. Manual verification & QA: smoke test watch pages for live, scheduled, and ended events with and without access, both authenticated and anonymous.

**Relevant files**
- `app/(Xonnect_tv)/tv/watch/_components/watch-page.tsx`
- `app/(Xonnect_tv)/tv/watch/[id]/page.tsx`
- `components/common_component/event-stream-player.tsx`
- `components/common_component/video-view-panel.tsx`
- `custom-video-player.tsx`
- `components/tv/watch/watch-parts-panel.tsx`
- `app/api/tv/watch/[id]/purchase/route.ts`
- `lib/video-purchases.ts`

**Verification**
- Unit tests: confirm preview plays for scheduled/ended when present; purchase button appears next to date when user lacks access; hide purchase CTA when `hasAccess` is true.
- Integration/manual: test scheduled-with-preview, live-without-access, ended-with-recording-without-access across auth states.
- API validation: ensure `/api/tv/watch/[id]` denies recording tokens without purchase and that preview URLs are public or proxied correctly.
