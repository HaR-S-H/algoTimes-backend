import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Unknown",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    urlToImage: { type: String },
    publishedAt: { type: Date, required: true },
    content: { type: String },
    category: {
      type: String,
      enum: [
        "AI",
        "Cybersecurity",
        "Blockchain",
        "Cloud",
        "Startups",
        "Gadgets",
        "Software",
        "Space",
        "Science",
        "Sustainability",
      ],
      required: true,
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ArticleSchema.index({ title: 1, category: 1 }, { unique: true });

const Article = mongoose.model("Article", ArticleSchema);
export default Article;
