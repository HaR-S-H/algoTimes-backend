import axios from "axios";
import Article from "../models/article.models.js";
import logger from "../utils/Logger.js";

const CATEGORY_QUERIES = [
  "AI",
  "Cybersecurity",
  "Blockchain",
  "Cloud",
  "Startups",
  "Gadgets" ,
  "Software",
  "Space",
  "Science",
  "Sustainability"
];
export async function fetchAndSaveNews(query) {
  try {
    if (!query) return;

    logger.info(` Fetching ${query} news...`);

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=100&page=1&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;
    console.log(url);
    
    const { data } = await axios.get(url);
    if (data.status !== "ok") {
      
      
      logger.error(`Failed to fetch ${query} news.`);
      return;
    }
    const articles = data.articles.map((a) => ({
      source: a.source?.name || "Unknown",
      author: a.author || "Unknown",
      title: a.title,
      description: a.description,
      url: a.url,
      urlToImage: a.urlToImage,
      publishedAt: a.publishedAt,
      content: a.content,
      category:query,
    }));

    for (const article of articles) {
      try {
        await Article.create(article);
      } catch (err) {
        if (err.code === 11000) {
          continue;
        } else {
          logger.error("Error saving article:", err.message);
        }
      }
    }

    logger.info(` Saved ${articles.length} ${query} articles.`);
  } catch (error) {
    console.log(error);
    
    console.error(` Error fetching ${query} news:`, error.message);
  }
}

export async function fetchAllCategories() {
  for (const category of CATEGORY_QUERIES) {
    await fetchAndSaveNews(category);
  }
}
