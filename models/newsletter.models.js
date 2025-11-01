import mongoose from "mongoose";

const NewsletterLogSchema = new mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    newsletterDate: { type: Date, required: true }, 
    status: {
      type: String,
      enum: ["sent", "failed", "bounced"],
      default: "sent",
    },
    providerMessageId: { type: String }, // SendGrid/SES ID for tracking
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for querying logs quickly
// NewsletterLogSchema.index({ subscriptionId: 1, newsletterDate: -1 });

const NewsletterLog = mongoose.model("NewsletterLog", NewsletterLogSchema);
export default NewsletterLog;
