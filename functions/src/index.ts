import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const rss = onRequest(
  { region: "asia-northeast3", cors: false },
  async (req, res) => {
    try {
      const snap = await db
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(50)
        .get();

      const items = snap.docs.map((doc) => {
        const data = doc.data();
        const ts = data.createdAt?.toDate?.() ?? new Date();
        const pubDate = ts.toUTCString();
        const title = escapeXml(data.title?.ko || data.title || "");
        const description = escapeXml(
          data.summary?.ko || data.summary || data.content?.ko?.slice(0, 200) || ""
        );
        const url = `https://mogee.org/post/${doc.id}`;
        const tags: string[] = data.tags || [];
        const categories = tags
          .map((tag: string) => `<category>${escapeXml(tag)}</category>`)
          .join("\n      ");

        return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${categories}
    </item>`;
      });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Mogee Development</title>
    <link>https://mogee.org</link>
    <description>Flutter 앱 개발 블로그. AI, 앱 개발, 기술 이야기를 공유합니다.</description>
    <language>ko</language>
    <copyright>Copyright 2024 Mogee Development</copyright>
    <atom:link href="https://mogee.org/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>https://mogee.org/og-image.png</url>
      <title>Mogee Development</title>
      <link>https://mogee.org</link>
    </image>
${items.join("")}
  </channel>
</rss>`;

      res.set("Content-Type", "application/rss+xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=1800, s-maxage=1800");
      res.status(200).send(xml);
    } catch (err) {
      console.error("RSS error:", err);
      res.status(500).send("Internal Server Error");
    }
  }
);

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
