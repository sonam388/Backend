import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    donorName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    mobile: {
      type: String,
    },

    paymentId: {
      type: String,
    },

    paymentOrderId: {
      type: String,
    },

    paymentSignature: {
      type: String,
    },

    message: {
      type: String,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

const Donation =
  mongoose.models.Donation ||
  mongoose.model("Donation", donationSchema);

export default Donation;

