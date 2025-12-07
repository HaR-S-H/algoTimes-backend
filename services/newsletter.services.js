import { GoogleGenAI } from "@google/genai";
import Article from "../models/article.models.js";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function createNewsletter() {
  try {
    const CATEGORY_QUERIES = [
      "AI",
      "Cybersecurity",
      "Blockchain",
      "Cloud",
      "Startups",
      "Gadgets",
      "Software",
      "Space",
      "Science",
      "Sustainability"
    ];

    const articlesByCategory = await Promise.all(
      CATEGORY_QUERIES.map(async (category) => {
        return await Article.find({ category })
          .sort({ publishedAt: -1 })
          .limit(2);
      })
    );

    const allArticles = articlesByCategory.flat();
    allArticles.sort((a, b) => b.publishedAt - a.publishedAt);
    
    console.log(`Found ${allArticles.length} articles`);
    
    if (!allArticles || allArticles.length === 0) {
      return "No articles to generate newsletter.";
    }

    const cleanedArticles = allArticles.map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      source: a.source,
      category: a.category,
      publishedAt: a.publishedAt,
      url: a.url
    }));

    const prompt = `
Generate a detailed, readable, engaging **news newsletter** based on the following articles.
Summarize each article clearly, highlight important insights, and write in a smooth flowing format.

Articles JSON:
${JSON.stringify(cleanedArticles, null, 2)}

Newsletter requirements:
- Write like a professional editor.
- Group articles by category.
- Add short, attractive headings.
- Keep language easy & engaging.
- Avoid overly long words.
- Do not include the JSON back in output.
- Write 600-1000 words newsletter quality content.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const newsletter = response.text;
    console.log("✅ Newsletter generated successfully");
    console.log(newsletter);
    
    return newsletter;

  } catch (error) {
    console.error("❌ Error generating newsletter:", error);
    throw error;
  }
}
