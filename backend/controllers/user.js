// controllers have all the call back functions for routes
const {
  validateEmail,
  validateLenght,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.home = (req, res) => {
  res.status(404).json({
    message: "something",
    error: "something",
  });
};

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "The Email address is already exist! Try logging in or using another account",
      });
    }
    // return;
    if (!validateLenght(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First name must be between 3 anfd 30 characters",
      });
    }

    if (!validateLenght(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last name must be between 3 anfd 30 characters",
      });
    }

    if (!validateLenght(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be atleat 6 characters",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    // return;

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    // console.log("error saving user", error);
    res.status(500).json({ message: error.message });
  }
};
