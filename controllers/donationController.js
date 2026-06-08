import DonationModel from "../models/DonationModel.js";


// CREATE DONATION
export const createDonation = async (
  req,
  res
) => {
  try {

    const {
      donorName,
      email,
      amount,
      mobile,
      message,
      paymentId,
      paymentStatus,
    } = req.body;

    const donation =
      await DonationModel.create({
        donorName,
        email,
        amount,
        mobile,
        message,
        paymentId,
        paymentStatus,
      });

    res.status(201).json({
      success: true,
      message: "Donation Added",
      donation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET DONATIONS
export const getDonations = async (
  req,
  res
) => {
  try {

    const donations =
      await DonationModel.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      donations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};