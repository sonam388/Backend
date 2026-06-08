import Blog from "../models/BlogModel.js";
import Gallery from "../models/GalleryModel.js";
import Contact from "../models/ContactModel.js";
import Donation from "../models/DonationModel.js";
import Volunteer from "../models/VolunteerModel.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const blogs = await Blog.countDocuments();

      const gallery =
        await Gallery.countDocuments();

      const contacts =
        await Contact.countDocuments();

      const donations =
        await Donation.countDocuments();

      const volunteers =
        await Volunteer.countDocuments();

      res.status(200).json({
        success: true,
        stats: {
          blogs,
          gallery,
          contacts,
          donations,
          volunteers,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };