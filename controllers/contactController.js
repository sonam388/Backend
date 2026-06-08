import ContactModel from "../models/ContactModel.js";


// CREATE CONTACT MESSAGE
export const createContact = async (req, res) => {
  try {

    const { name, email, mobile, message } =
      req.body;

    const contact = await ContactModel.create({
      name,
      email,
      mobile,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      contact,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// GET ALL CONTACTS
export const getContacts = async (req, res) => {
  try {

    const contacts = await ContactModel.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      contacts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};