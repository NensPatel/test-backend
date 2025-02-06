const userSchema = require("../../models/user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const findEmail = await userSchema.findOne({ email });
    if (findEmail) {
      return res.status(409).send({
        isSuccess: false,
        message: "Email is already existing !!",
      });
    } else {
      const Password = await bcrypt.hash(password, 10);
      const newUser = await userSchema({
        fullName,
        email,
        password: Password,
      });
      await newUser.save();
      const authToken = jwt.sign(
        { id: newUser._id },
        process.env.USER_TOKEN_KEY,
        { expiresIn: process.env.TOKEN_EXPIRY_TIME }
      );

      return res.status(200).send({
        isSuccess: true,
        message: "User created successfully",
        data: newUser,
        authToken,
      });
    }
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong, please try again!",
      error: error.message,
    });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findEmail = await userSchema.findOne({ email });
    if (!findEmail) {
      return res.status(404).send({
        isSuccess: false,
        message: "Email not found",
      });
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        findEmail.password
      );
      if (!comparePassword) {
        return res.status(401).send({
          isSuccess: false,
          message: "Password is Incorrect",
        });
      } else {
        const { fullName, email } = findEmail;
        const authToken = jwt.sign(
          { id: findEmail._id },
          process.env.USER_TOKEN_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );
        return res.status(200).send({
          isSuccess: true,
          message: "User Logged in successfully",
          user: { fullName, email },
          authToken,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong, please try again!",
      error: error,
    });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await userSchema.findById(userId).select("-password -confirmPassword");
    if (!profile) {
      return res.status(404).send({
        isSuccess: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      isSuccess: true,
      message: "Get user successfully.",
      data: profile,
    });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
 const userId= req.user._id

 const updatedUser = req.body;

 try {
    const user = await userSchema.findByIdAndUpdate(userId, updatedUser, {new:true});
    if(!user){
      return res.status(404).send({
        isSuccess: false,
        message: "User not found",
      })
    }
    res.status(200).send({
      isSuccess: true,
      message: "User updated successfully",
      data: updatedUser,
    });
 } catch (error) {
  return res.status(500).send({
    isSuccess: false,
    message: "Something went wrong",
    error: error.message,
  });
 }
};

