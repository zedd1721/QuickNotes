const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT, { expiresIn: "24h" });
}

module.exports.registerUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating new user & saving to database
    const newUser = await userModel.create({name, email, password: hashedPassword});

    //Generate JWT token
    const token = generateAccessToken(newUser._id);

    return res.status(201).json({
      message: "User created",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Find User
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist, Create an Account",
        account: false,
      });
    }

    //Check Password
    const isMatch = await bcrypt.compare(password, user.password); //will return true or false
    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong Password",
        password: false,
      });
    }
    const token = generateAccessToken(user._id)

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
