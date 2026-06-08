import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
    try {
        console.log("REQ FILE:", req.file);

        const file = req.file.buffer.toString("base64");

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${file}`,
            {
                folder: "gaushala-gallery",
            }
        );
        
        

        res.status(200).json({
            success: true,
            imageUrl: result.secure_url,
        });

    } catch (error) {
        console.log("UPLOAD ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};