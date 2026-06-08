import bcrypt from "bcryptjs";
import AdminModel from "../models/AdminModel.js";
import generateToken from "../utils/generateToken.js";


// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const adminExists = await AdminModel.findOne({
      email,
    });

    if (adminExists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await AdminModel.findOne({
      email,
    });

    if (
      admin &&
      (await bcrypt.compare(
        password,
        admin.password
      ))
    ) {

      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });

    } else {

      res.status(401).json({
        message: "Invalid Email or Password",
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};