"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

export default function TaxNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data.items || []);
      } catch (err) {
        setError("Failed to load tax news");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>📰 Latest Tax News</CardTitle>
          <CardDescription>
            Loading news from Google RSS Feed...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>📰 Latest Tax News</CardTitle>
          <CardDescription>Nigeria Tax Reform Updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Key Updates from Nigeria Tax Reform 2025
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>
                  • Individuals earning ₦800,000 or less annually are now tax
                  exempt
                </li>
                <li>• New progressive tax rates up to 25% for high earners</li>
                <li>• Small companies (turnover ≤ ₦100M) exempt from CIT</li>
                <li>• Capital Gains Tax increased to 30% for companies</li>
                <li>• New Development Levy of 4% replaces multiple levies</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              For the latest updates, visit{" "}
              <a
                href="https://news.google.com/search?q=Nigeria+tax+reform+2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Google News
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>📰 Latest Tax News</CardTitle>
        <CardDescription>
          Live updates from Google News RSS Feed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border"
            >
              <h4 className="font-medium text-sm line-clamp-2 hover:text-green-600">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.pubDate}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Powered by Google News RSS
        </p>
      </CardContent>
    </Card>
  );
}
