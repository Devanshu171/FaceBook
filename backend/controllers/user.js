// controllers have all the call back functions for routes
exports.home = (req, res) => {
  res.status(404).json({
    message: "something",
    error: "something",
  });
};
