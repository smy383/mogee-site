import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

export const sitemap = onRequest(
  { region: "asia-northeast3", cors: false },
  async (req, res) => {
    try {
      const snap = await db
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get();

      const postUrls = snap.docs.map((doc) => {
        const data = doc.data();
        const ts = data.createdAt?.toDate?.() ?? new Date();
        const lastmod = ts.toISOString().split("T")[0];
        return `
  <url>
    <loc>https://mogee.org/post/${doc.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="https://mogee.org/post/${doc.id}" />
    <xhtml:link rel="alternate" hreflang="en" href="https://mogee.org/post/${doc.id}" />
    <xhtml:link rel="alternate" hreflang="ja" href="https://mogee.org/post/${doc.id}" />
  </url>`;
      });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://mogee.org/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="https://mogee.org/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://mogee.org/" />
    <xhtml:link rel="alternate" hreflang="ja" href="https://mogee.org/" />
  </url>

  <url>
    <loc>https://mogee.org/portfolio</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="ko" href="https://mogee.org/portfolio" />
    <xhtml:link rel="alternate" hreflang="en" href="https://mogee.org/portfolio" />
    <xhtml:link rel="alternate" hreflang="ja" href="https://mogee.org/portfolio" />
  </url>
${postUrls.join("")}
</urlset>`;

      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
      res.status(200).send(xml);
    } catch (err) {
      console.error("Sitemap error:", err);
      res.status(500).send("Internal Server Error");
    }
  }
);
