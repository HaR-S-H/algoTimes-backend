import Article from "../models/article.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynHandler.js";

const getArticles = asyncHandler(async (req, res) => {
    const { category, limit = 20 } = req.body;
    if (!category) {
        throw new ApiError(400, "Category is required");
    }
    const articles = await Article.find({ category }).sort({ publishedAt: -1 }).limit(Number(limit));
    return res.json(new ApiResponse(200, articles, "Articles fetched successfully"));
});

const getOtherArticles = asyncHandler(async (req, res) => { 
    const { category, lastPublishedAt, limit = 20 } = req.body;
    if (!category || !lastPublishedAt) {
        throw new ApiError(400, "Category or last published is required");
    }
    const articles = await Article.find({ category, publishedAt: { $lt: new Date(lastPublishedAt) } })
        .sort({ publishedAt: -1 })
        .limit(Number(limit));
    return res.json(new ApiResponse(200, articles, "Articles fetched successfully"));

});


export { getArticles, getOtherArticles };  