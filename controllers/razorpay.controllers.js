import asyncHandler from "../utils/asynHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Subscription from "../models/subscription.models.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
const createOrder = asyncHandler(async (req, res) => {
    const { email } = req.body;
 const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
    
    const options = {
        amount: 10000,
        currency: "INR",
         receipt: "receipt_" + Date.now(),
    }
 
    
    const order = await razorpay.orders.create(options);
  
   
    
    return res.json(new ApiResponse(200, { orderId: order.id, amount: order.amount }, "Order created successfully"));
})

const verifyOrder = asyncHandler(async (req, res) => {
    const { email, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
        .digest("hex");
    if (expectedSignature === razorpay_signature) {
      // Save email in DB
      const subscription = new Subscription({ email, status: "active" });
        await subscription.save();
        await sendEmail("newsLetter", {
                recipient: email,
            });
        return res.json(new ApiResponse(200, null, "Payment verified and subscription activated"));
    }
    return res.json(new ApiError(400, "Invalid signature, payment verification failed"));

})

export { createOrder, verifyOrder };