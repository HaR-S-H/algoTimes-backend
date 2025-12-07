import { mdToPdf } from "md-to-pdf";
import s3 from "./s3.js";
import newsLetter from "../models/newsletter.models.js";
import deleteOldLocalPDF from "./deletePdf.js";
import fs from "fs";
import path from "path";
export const generateAndUploadPDF = async (markdownContent) => {
  try {

    // 1. Markdown → PDF buffer
    const pdf = await mdToPdf({ content: markdownContent });
    const pdfBuffer = pdf.content;

    // 2. Upload to S3
    const fileName = `pdfs/${Date.now()}.pdf`;

    const s3Url = await new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileName,
          Body: pdfBuffer,
          ContentType: "application/pdf",
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data.Location);
        }
      );
    });
    deleteOldLocalPDF();
      const news = new newsLetter({
        newsletterDate: new Date(),
        url: s3Url,
  })
    await news.save();
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localPath = path.join(
      uploadDir,
      `newsletter-${Date.now()}.pdf`
    );

    fs.writeFileSync(localPath, pdfBuffer);
    console.log("New PDF saved locally at:", localPath);
  
  } catch (error) {
    console.error("PDF upload error:", error);
  }
};
