import mongoose from "mongoose";
import userModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import transporter from "../configs/mailer.js";
import session from "express-session";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fiels are required" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Email is existed" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const registerUser = new userModel({
      name,
      email,
      password: hashedpassword,
    });

    await registerUser.save();

    // const successMail = {
    //   from: "info@vadebarcos.com", // sender address
    //   to: email, // list of receivers
    //   subject: "Hello ✔ Welcome", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: `<b>Hello world? </b>

    //   <br> Your name is ${name}
    //   `, // html body
    // };

    // await transporter.sendMail(successMail);

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { _id } = req.params;
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ success: false, message: "Input requireds" });

  try {
    const existed = await userModel.findOne({ email });
    if (!existed) return res.json({ success: false, message: "Invalid Email" });

    const isOk = await bcrypt.compare(password, existed.password);
    if (!isOk) return res.json({ success: false, message: "Invalid Password" });

    req.session.memberId = existed._id;

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const dashboard = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Get logged in user's credential

export const getLoggedUser = async (req, res) => {
  if (req.session.memberId) {
    try {
      const user = await userModel.findById(req.session.memberId);
      if (user) {
        return res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error: " + error.message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No user logged in",
    });
  }
};

// Logout via session
export const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Logout failed" });
      }

      res.clearCookie("connect.sid");
      return res.json({ success: true, message: "Logged out successfully" });
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
