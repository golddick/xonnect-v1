import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const baseUrl = "https://www.xonnect.net";

// Assign priority based on nesting
function getPriority(depth: number): number {
  if (depth === 0) return 1.0; // homepage
  if (depth === 1) return 0.8; // top-level
  return 0.6; // deeper pages
}

function getPages(dir: string, basePath = "", depth = 0): string[] {
  const pages: string[] = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Determine if this directory contains a page.tsx leaf (route)
  const hasPageLeaf = entries.some((e) => {
    if (!e.isFile()) return false;
    const name = e.name.toLowerCase();
    return name === "page.tsx" || name === "page.ts" || name === "page.jsx" || name === "page.js";
  });

  // If directory is a route leaf, add route (directory path as URL segments)
  if (hasPageLeaf) {
    // basePath is already the URL path without trailing slash
    const route = basePath || "/";

    // Preserve dynamic-route exclusion as applicable
    if (!route.includes("[") && !route.includes("]")) {
      pages.push(route);
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const folderName = entry.name;

    // Skip API folders
    if (folderName.toLowerCase() === "api") continue;

    // Skip route groups: (groupName) should not affect the URL segment
    if (folderName.startsWith("(") && folderName.endsWith(")")) continue;

    const nextBasePath = basePath ? `${basePath}/${folderName}` : `/${folderName}`;

    pages.push(...getPages(path.join(dir, folderName), nextBasePath, depth + 1));
  }

  return pages;
}



export default function sitemap(): MetadataRoute.Sitemap {

  const pagesDir = path.join(process.cwd(), "app"); // or "pages"
  const routes = getPages(pagesDir);

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: getPriority(route.split("/").length - 1),
  }));
}
