const User = require("../models/user");

exports.validateEmail = (email) => {
  // regex syntex  "/^" start with and "$/" end with this
  // to divide in between sections like "()"
  // to specify what is allowed in a section
  // ( all this before @ a-z are charachres
  // /d means digits
  // for . we cant just use ""." because in regex "." means any this is allowed se ew use "/."
  // "-" is also allowed
  //  + means as many chars)
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d\-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLenght = (text, min, max) => {
  if (text.length > max || text.length < min) return false;
  return true;
};

exports.validateUsername = async (username) => {
  a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      // change username
      username += (new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
