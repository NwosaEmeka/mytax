// Google RSS Feed Parser for Nigeria Tax News

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

export async function fetchTaxNews(): Promise<NewsItem[]> {
  try {
    // We'll use the server-side API to fetch news (avoids CORS issues)
    const response = await fetch(`/api/news`);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching tax news:", error);
    return [];
  }
}

// Parse RSS XML to NewsItem array
export function parseRSSFeed(xmlText: string): NewsItem[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const items = xmlDoc.querySelectorAll("item");
  const newsItems: NewsItem[] = [];

  items.forEach((item, index) => {
    if (index < 10) {
      // Limit to 10 items
      const title = item.querySelector("title")?.textContent || "";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      const source = item.querySelector("source")?.textContent || "Google News";

      newsItems.push({
        title: cleanHtml(title),
        link,
        pubDate: formatDate(pubDate),
        description: cleanHtml(description),
        source,
      });
    }
  });

  return newsItems;
}

function cleanHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
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
