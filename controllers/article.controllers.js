import Article from "../models/article.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynHandler.js";

const getArticlesByCategory = asyncHandler(async (req, res) => {
    const { category, limit = 20 } = req.query;
    if (!category) {
        throw new ApiError(400, "Category is required");
  }
  let page = parseInt(req.query.page) || 1;
  let skip = (page - 1) * limit;

  if (category == "All") { 
      const articles = await Article.find().sort({ publishedAt: -1 }).skip(skip).limit(Number(limit));
      return res.json(new ApiResponse(200, articles, "Articles fetched successfully"));
  }
    const articles = await Article.find({ category }).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit));
    return res.json(new ApiResponse(200, articles, "Articles fetched successfully"));
});

const getOtherArticles = asyncHandler(async (req, res) => { 
    const { category, lastPublishedAt, limit = 20 } = req.query;
    if (!category || !lastPublishedAt) {
        throw new ApiError(400, "Category or last published is required");
    }
    const articles = await Article.find({ category, publishedAt: { $lt: new Date(lastPublishedAt) } })
        .sort({ publishedAt: -1 })
        .limit(Number(limit));
    return res.json(new ApiResponse(200, articles, "Articles fetched successfully"));

});

const getArticles = asyncHandler(async (req, res) => {
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
  const limit = 2;
  let page = parseInt(req.query.page) || 1;
  let skip = (page - 1) * limit;
 const articlesByCategory = await Promise.all(
    CATEGORY_QUERIES.map(async (category) => {
      return await Article.find({ category })
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(2);
    })
  );

  // Flatten the 2D array into a single array of articles
  const allArticles = articlesByCategory.flat();

  // Optionally, sort overall by published date (latest first)
  allArticles.sort((a, b) => b.publishedAt - a.publishedAt);

  return res.json(
    new ApiResponse(200, allArticles, "Top 2 articles per category fetched successfully")
  );
});

const getArticlesBySearch = asyncHandler(async (req, res) => { 
  const { query } = req.query;
  if (!query) {
      throw new ApiError(400, "Search query is required");
  }
  const articles = await Article.find({ 
      $or: [
      { title: { $regex: query, $options: "i" } },  
      { description: { $regex: query, $options: "i" } }
      ]
   })
      .sort({ publishedAt: -1 });
  return res.json(new ApiResponse(200, articles, "Articles fetched successfully"));
});





export { getArticles, getOtherArticles,getArticlesByCategory,getArticlesBySearch };  