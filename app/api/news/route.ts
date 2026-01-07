import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = encodeURIComponent("Nigeria tax reform 2025");
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-NG&gl=NG&ceid=NG:en`;

    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TaxCalculator/1.0)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch RSS feed");
    }

    const xmlText = await response.text();
    const items = parseRSSFeed(xmlText);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ items: [] });
  }
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

function parseRSSFeed(xmlText: string): NewsItem[] {
  const items: NewsItem[] = [];

  // Simple regex-based XML parsing for server-side
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null && items.length < 10) {
    const itemContent = match[1];

    const title = extractTag(itemContent, "title");
    const link = extractTag(itemContent, "link");
    const pubDate = extractTag(itemContent, "pubDate");
    const description = extractTag(itemContent, "description");
    const source = extractTagAttribute(itemContent, "source") || "Google News";

    items.push({
      title: cleanHtml(title),
      link,
      pubDate: formatDate(pubDate),
      description: cleanHtml(description).substring(0, 200),
      source,
    });
  }

  return items;
}

function extractTag(content: string, tagName: string): string {
  const regex = new RegExp(
    `<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>|<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`,
    "i"
  );
  const match = content.match(regex);
  return match ? (match[1] || match[2] || "").trim() : "";
}

function extractTagAttribute(content: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : "";
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
