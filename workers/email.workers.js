import fs from "fs";
import path from "path";
import { Worker } from "bullmq";
import bullClient from "../redis/bullmq.js";
import transporter from "../utils/nodeMailer.js";
import asyncHandler from "../utils/asynHandler.js";

const worker = new Worker(
  "emailQueue",
  asyncHandler(async (job) => {
    const { recipient } = job.data;
    console.log("Processing email job for recipient:", recipient);
    // 1. Find the only PDF in uploads folder
    const uploadDir = path.join(process.cwd(), "uploads");
    const files = fs.readdirSync(uploadDir);
    const pdfFile = files.find(f => f.endsWith(".pdf"));

    if (!pdfFile) {
      console.error("No PDF found in uploads folder.");
      return;
    }

    const pdfPath = path.join(uploadDir, pdfFile);

    // 2. Email body
    const text = `Hello,

Here is your AlgoTimes Newsletter.

Best regards,
AlgoTimes Team`;

    // 3. Send email with the PDF attached
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "Your AlgoTimes Newsletter",
      text,
      attachments: [
        {
          filename: pdfFile,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("Newsletter email sent with PDF:", pdfPath);
  }),
  { connection: bullClient, concurrency: 2 }
);

export default worker;
