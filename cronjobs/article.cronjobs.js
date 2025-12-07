import cron from "node-cron";
import { fetchAllCategories } from "../services/article.services.js";
import logger from "../utils/Logger.js";

cron.schedule("0 */10 * * *", async () => {
// cron.schedule("29 19 * * *", async () => {
  logger.info("Running 10 hours article cron job...")
  await fetchAllCategories();
  console.log("✅ Cron job finished.");
});
