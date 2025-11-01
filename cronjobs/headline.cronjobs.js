import cron from "node-cron";
import { fetchAndSaveHeadline } from "../services/headline.services.js";
import logger from "../utils/Logger.js";
// Runs every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  logger.info("🕒 Running 30-min headline cron job...");
    await fetchAndSaveHeadline();
  console.log("✅ Cron job finished.");
});
