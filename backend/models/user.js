const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    text: true,
  },
  last_name: {
    type: String,
    required: [true, "lase name is required"],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, "user name is required"],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  picture: {
    type: String,
    defaul: "",
    trim: true,
  },
  cover: {
    type: String,
    trim: true,
    defaul: "",
  },
  cover: {
    type: String,
    defaul: "",
  },
  cover: {
    type: String,
    defaul: "",
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    trim: true,
  },
  bYear: {
    type: Number,
    required: true,
    trim: true,
  },
  bMonth: {
    type: Number,
    required: true,
    trim: true,
  },
  bDay: {
    type: Number,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  search: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  details: {
    bio: {
      type: String,
    },
    otherName: {
      type: String,
    },
    Job: {
      type: String,
    },
    workplace: {
      type: String,
    },
    highSchool: {
      type: String,
    },
    college: {
      type: String,
    },
    currentCity: {
      type: String,
    },
    homeTown: {
      type: String,
    },
    relationship: {
      type: String,
      enum: ["Single", "In a relationship", "Married", "Divorced"],
    },
    instagram: {
      type: String,
    },
    SavedPost: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },

  // timestamp: true,
});

module.exports = mongoose.model("User", userSchema);
