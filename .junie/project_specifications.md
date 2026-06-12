# Xonnect Project Specifications

## 1. Project Overview
**Xonnect** is a creator-focused streaming and event management platform designed to bridge the gap between physical events and digital streaming. It provides tools for creators to host live performances, manage ticket sales (both physical and virtual), and engage with their communities.

## 2. Core Features
- **Live Video Streaming**: Custom video player with support for live and recorded content, real-time chat, and viewer engagement (likes, follows).
- **Event Management**: Discovery platform for browsing upcoming events, filtered by categories (Music, Gaming, Education, etc.).
- **Admin Dashboard**: Comprehensive analytics for organizers to track revenue (physical vs. stream), occupancy rates, and event performance.
- **Community Engagement**: Popups for joining communities, user profiles, and community setup tools.
- **Revenue & Payouts**: Support for tracking net/raw revenue and handling payout requests via modals.
- **Enterprise Partnership**: A dedicated application funnel for corporate partners with multi-step registration and custom revenue sharing.

## 3. User Roles
- **Viewer/End-User**: Discovers and attends events (physically or via stream), interacts in chat, and joins communities.
- **Creator**: Hosts events, streams content, and manages their own profile/community.
- **Admin**: Oversees the platform, reviews content, and analyzes financial/engagement metrics.
- **Enterprise Partner**: Corporate entities with custom support and revenue sharing models.

## 4. Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI (Radix UI primitives)
- **Animations**: Framer Motion
- **Data Visualization**: Chart.js (react-chartjs-2) and Recharts
- **Icons**: Lucide React
- **State Management**: React `useState`/`useEffect` and Server Actions for data fetching/mutations.

## 5. Current Implementation State
- **Data Layer**: Currently utilizes Server Actions in `@/actions` which return mock data. Some logic is prepared for Prisma/Database integration (noted in comments).
- **UI/UX**: Highly responsive design with a dark theme (black/gray/red color palette). Most components are client-side hydrated.
- **Build System**: Configured for Vercel deployment with unoptimized images and linting/type-check bypasses for faster development cycles.

## 6. Key File Mapping
- `admin-dashboard.tsx`: Main organizer analytics view.
- `events-page.tsx`: Public discovery interface.
- `video-stream-viewer.tsx`: Core streaming interface with chat integration.
- `enterprise-partnership.tsx`: Corporate partnership onboarding.
- `actions/admin.ts`: Data fetching logic for admin functionalities.
