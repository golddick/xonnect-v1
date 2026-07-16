import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/superadmin", "/creator"],
    },
    sitemap: "https://www.xonnect.net/sitemap.xml",
  };
}
