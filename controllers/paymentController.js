import Razorpay from "razorpay";
import crypto from "crypto";
import DonationModel from "../models/DonationModel.js";
import { sendDonationReceipt } from "../services/emailService.js";

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};


// CREATE ORDER
export const createOrder = async (
  req,
  res
) => {
  try {
    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return res.status(500).json({
        message: "Razorpay keys are not configured",
      });
    }

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt:
        "receipt_order_" +
        Math.random(),
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// VERIFY ORDER AND CREATE DONATION RECORD
export const verifyPayment = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay keys are not configured",
      });
    }

    const {
      donorName,
      email,
      mobile,
      amount,
      message,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const donation = await DonationModel.create({
      donorName,
      email,
      mobile,
      amount,
      message,
      paymentId: razorpay_payment_id,
      paymentOrderId: razorpay_order_id,
      paymentSignature: razorpay_signature,
      paymentStatus: "Paid",
    });

    await sendDonationReceipt({
      donorName,
      email,
      amount,
      paymentId: razorpay_payment_id,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and donation saved",
      donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};