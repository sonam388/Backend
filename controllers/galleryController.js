import GalleryModel from "../models/GalleryModel.js";

export const addGalleryImage = async (
  req,
  res
) => {
  try {
    const { title, image } = req.body;

    const gallery =
      await GalleryModel.create({
        title,
        image,
      });

    res.status(201).json({
      success: true,
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGalleryImages =
  async (req, res) => {
    try {
      const gallery =
        await GalleryModel.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        gallery,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteGalleryImage =
  async (req, res) => {
    try {
      await GalleryModel.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message: "Image Deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };