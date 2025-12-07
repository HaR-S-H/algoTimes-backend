import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,   // Return rate limit info in headers
  legacyHeaders: false,    // Disable X-RateLimit-* headers
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

export default limiter;
