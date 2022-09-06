// controllers have all the call back functions for routes
const User = require("../models/user");
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
    const user = await new User({
      first_name,
      last_name,
      email,
      password,
      username,
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
