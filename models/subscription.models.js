import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    // categories: [{ type: String, required: true }], // topics they want
    status: {
      type: String,
      enum: ["pending", "active", "unsubscribed"],
      default: "pending",
    },
    // verifiedAt: { type: Date },
    // unsubscribeToken: { type: String, required: true }, // for secure unsubscribe links
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
