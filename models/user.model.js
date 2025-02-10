const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    confirmPassword: {
      type: String,
      default: "",
    },
    mobileNo: {
      type: String,
      default: "",
      trim: true,
    },
    countryCode: {
      type: String,
      default: "",
      trim: true,
    },
    countryName: {
      type: String,
      default: "",
      trim: true,
    },
    state: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    otpCode: {
      type: Number,
      default: null,
    },
    otpExpireIn: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("user", userSchema);