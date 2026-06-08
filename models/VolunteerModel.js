import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    city: {
      type: String,
    },

    message: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Volunteer =
  mongoose.models.Volunteer ||
  mongoose.model(
    "Volunteer",
    volunteerSchema
  );

export default Volunteer;

