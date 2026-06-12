- [x] Update prisma/schema.prisma (pending migration, but code expectations added later)
  - [ ] Add CreatorVideoFolder model with folderType enum
  - [ ] Add CreatorVideo.folderId relation (all videos must belong to a folder)
  - [ ] Add CreatorVideoView / CreatorVideoLike / CreatorVideoComment models for counters


- [ ] Add API route: app/api/creator/videos/folders/route.ts
  - [ ] POST create folder
  - [ ] GET list creator folders

- [ ] Edit API route: app/api/creator/videos/route.ts
  - [ ] Require folderId in payload
  - [ ] Attach all created CreatorVideo rows to folderId (all types)
  - [ ] For series: episodes share same folderId

- [ ] Add API route: app/api/creator/videos/list/route.ts
  - [ ] GET creator folders with aggregated views/likes/comments

- [ ] Edit client: creator-videos.tsx
  - [ ] Replace mock data with fetch from /api/creator/videos/list
  - [ ] Add folder create/select UI
  - [ ] Render folders as single cards; no episode expansion

- [ ] Edit client: upload-video-component.tsx
  - [x] Replace fetch blocks with useEffect + add folderLoading state
  - [x] Auto-create folder via POST /api/creator/videos/folders when folderId missing (folderType = contentType) and packageName is provided
  - [ ] Ensure folderId is included in all upload POST payloads (and verify series episode flow)

- [ ] After code changes: run prisma migrate + generate (you will do)
- [ ] Start dev server and verify folder-first flow + counters
