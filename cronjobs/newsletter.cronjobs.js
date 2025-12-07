import cron from "node-cron";
import { createNewsletter } from "../services/newsletter.services.js";
import logger from "../utils/Logger.js";
import { generateAndUploadPDF } from "../utils/upload.js";
import Subscription from "../models/subscription.models.js";
import sendEmail from "../utils/sendEmail.js";
cron.schedule("0 1 * * *", async () => {
  try {
    logger.info("🕒 Running newsletter cron job at 22:36...");

      const markdownContent = await createNewsletter();
      generateAndUploadPDF(markdownContent);

    console.log("✅ Cron job finished successfully.");
    const subscribers = await Subscription.find({});
    for (const subscriber of subscribers) {
      await sendEmail("newsLetter", {
        recipient: subscriber.email,
      });
    }
  } catch (error) {
    console.error("❌ Cron job failed:", error);
    
  }
});
