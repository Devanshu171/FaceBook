// controllers have all the call back functions for routes
const {
  validateEmail,
  validateLenght,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { genrateToken } = require("../helpers/jwt");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../helpers/mialer");
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
    const emailVerificationToken = genrateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = genrateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Sucess ! Please activate your email",
    });
    // res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    // console.log(user);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res.status(400).json({
        message: "this account is already activited",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      res.status(200).json({
        message: "Account activited successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  //
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message:
          "The email adderss you entered is not connected to an account ",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      res.status(400).json({
        message: "Invalid credentials Please try again",
      });
    }
    const token = genrateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Sucess ! Please activate your email",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
