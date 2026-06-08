import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {

    try {

      token =
        req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.admin = await AdminModel.findById(
        decoded.id
      ).select("-password");

      next();

    } catch (error) {

      res.status(401).json({
        message: "Not Authorized",
      });

    }

  }

  if (!token) {

    res.status(401).json({
      message: "No Token Found",
    });

  }
};

export default protect;