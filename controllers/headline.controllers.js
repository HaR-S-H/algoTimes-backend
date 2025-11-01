import Headline from "../models/headline.models.js";
import asyncHandler from "../utils/asynHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
const getHeadlines = asyncHandler(async (req, res) => {
    const headlines = await Headline.find().sort({ publishedAt: -1 }).limit(20);
    return res.json(new ApiResponse(200, headlines, "Headlines fetched successfully"));
});

const getOtherHeadlines = asyncHandler(async (req, res) => {
    const { lastPublishedAt, limit = 20 } = req.body;

    let query = {};
    if (!lastPublishedAt) {
       throw new ApiError(400, "lastPublishedAt  is required");  
    }
 query.publishedAt = { $lt: new Date(lastPublishedAt) };
    const headlines = await Headline.find(query)
        .sort({ publishedAt: -1 }) 
        .limit(Number(limit));

    return res.json(new ApiResponse(200, headlines, "Headlines fetched successfully"));
});



export { getHeadlines,getOtherHeadlines };