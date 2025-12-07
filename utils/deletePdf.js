import fs from "fs";
import path from "path";

const deleteOldLocalPDF = () => {
  try {
    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) return;

    const files = fs.readdirSync(uploadDir);

    for (const file of files) {
      if (file.endsWith(".pdf")) {
        fs.unlinkSync(path.join(uploadDir, file));
        console.log("Deleted old PDF:", file);
      }
    }
  } catch (err) {
    console.error("Error deleting old PDF:", err);
  }
};
export default deleteOldLocalPDF;