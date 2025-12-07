import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema(
  {
    newsletterDate: { type: Date, required: true },
    url: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

// Index for querying logs quickly
// NewsletterLogSchema.index({ subscriptionId: 1, newsletterDate: -1 });

const newsLetter= mongoose.model("newsLetter", newsLetterSchema);
export default newsLetter;
