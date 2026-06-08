import VolunteerModel from "../models/VolunteerModel.js";


// CREATE VOLUNTEER
export const createVolunteer = async (
  req,
  res
) => {
  try {

    const {
      name,
      mobile,
      email,
      city,
      message,
    } = req.body;

    const volunteer =
      await VolunteerModel.create({
        name,
        mobile,
        email,
        city,
        message,
      });

    res.status(201).json({
      success: true,
      message:
        "Volunteer Registered Successfully",
      volunteer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET VOLUNTEERS
export const getVolunteers = async (
  req,
  res
) => {
  try {

    const volunteers =
      await VolunteerModel.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      volunteers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};