import axios from "axios";
import Headline from "../models/headline.models.js";
import logger from "../utils/Logger.js";

export async function fetchAndSaveHeadline() {
  try {
    logger.info(`Fetching Headline ...`);

    const url = `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEWS_API_KEY}`;

    const { data } = await axios.get(url);
    if (data.status !== "ok") {
      logger.error(`Failed to fetch Headline.`);
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
    }));

    for (const article of articles) {
      try {
        await Headline.create(article);
      } catch (err) {
        if (err.code === 11000) {
          continue;
        } else {
          console.error("Error saving article:", err.message);
        }
      }
    }

    console.log(`Saved ${articles.length} Headlines.`);
  } catch (error) {
    console.error(`Error fetching Headline:`, error.message);
  }
}

