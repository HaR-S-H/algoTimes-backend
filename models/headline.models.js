import mongoose from "mongoose";

const HeadlineSchema = new mongoose.Schema(
  {
    source: {
     type: String 
    },
    author: { type: String, default: "Unknown" },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    url: { type: String, required: true },
    urlToImage: { type: String },
    publishedAt: { type: Date, required: true },
    content: { type: String },
    likes: { type: Number, default: 0 },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24, // ⏳ Automatically delete after 24 hours
    },
  },
  { timestamps: true }
);

// Prevent duplicates by title
// HeadlineSchema.index({ title: 1 }, { unique: true });

const Headline = mongoose.model("Headline", HeadlineSchema);
export default Headline;
