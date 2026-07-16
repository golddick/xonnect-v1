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
  let pages: string[] = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip API folders
      if (file.toLowerCase() === "api") continue;

      pages = pages.concat(getPages(fullPath, `${basePath}/${file}`, depth + 1));
    } else if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".jsx") || file.endsWith(".js")) {
      // Skip API routes
      if (basePath.includes("/api")) continue;

      let route = `${basePath}/${file.replace(/\.(tsx|ts|jsx|js)$/, "")}`;

      // Handle index pages
      if (route.endsWith("/index")) route = route.replace("/index", "");
      if (route.includes("[") && route.includes("]")) {
        // Optionally skip dynamic routes or replace with canonical example
        continue; // skipping for sitemap
      }

      pages.push(route || "/");
    }
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
