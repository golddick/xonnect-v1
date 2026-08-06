- [ ] Update `sitemap.ts` getPages to properly reflect Next App Router segments (if still required by the findings) and validate.
- [ ] Implement preview playback for scheduled and ended TV events when `previewVideoUrl` exists.
- [ ] Replace watch page date lock icon with a `Purchase` button for scheduled/upcoming events when preview is available and user lacks access.
- [ ] Enforce access gating so recordings require purchase while previews remain viewable to everyone.
- [ ] Add `Purchase` flow handling for anonymous users by prompting sign-in before purchase.
- [ ] Propagate `previewVideoUrl`, `recordingUrl`, `isLive`, `isEnded`, and `hasAccess` through player components.
- [ ] Update `watch-parts-panel` to label preview-only parts and hide purchase labels for users with access.
- [ ] Write tests for upcoming-with-preview, live-without-access, ended-with-recording-without-access, and ended-without-recording-but-preview.

