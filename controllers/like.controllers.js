import asyncHandler from "../utils/asynHandler.js";
import Article from "../models/article.models.js";
import Headline from "../models/headline.models.js";
import ApiResponse from "../utils/ApiResponse.js";
const addLike = asyncHandler(async (req, res) => {
    const { type,id } = req.body;
    if (!type) { 
        throw new ApiError(400, "Type is required");
    }
    if (type == "article") { 
        const article = await Article.findById(id);
        article.likes += 1;
        await article.save();
        return res.json(new ApiResponse(200, article, "Article liked successfully"));
    }
    else {
        const headline = await Headline.findById(id);
        headline.likes += 1;
        await headline.save();
        return res.json(new ApiResponse(200, headline, "headline liked successfully"));
    }
});         

const removeLike = asyncHandler(async (req, res) => {
    const { type, id } = req.body;
    if (!type) {
        throw new ApiError(400, "Type is required");
    }
    if (type == "article") {
        const article = await Article.findById(id);
        article.likes -= 1;
        await article.save();
        return res.json(new ApiResponse(200, article, "Article disliked successfully"));
    }
    else {
        const headline = await Headline.findById(id);
        headline.likes -= 1;
        await headline.save();
        return res.json(new ApiResponse(200, headline, "headline disliked successfully"));
    }
});


export { addLike, removeLike };