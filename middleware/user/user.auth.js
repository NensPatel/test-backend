const userSchema = require("../../models/user/user.model");
const jwt = require("jsonwebtoken");

exports.verifyTokenUser = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.header["x-access-token"] ||
    req.header("authorization");
  if (!token) {
    return res
      .status(400)
      .send({ message: "Token is required", isSuccess: false });
  } 
  const bearerToken = token.split(" ")[1];
  try {
    jwt.verify(
      bearerToken,
      process.env.USER_TOKEN_KEY,
      async (error, authData) => {
        if (error) {
          return res.status(409).send({
            error: error.message,
            message: "Invalid token",
            isSuccess: false,
          });
        }
        let user = await userSchema.findOne({
          _id: authData.id,
        });
        req.user = user;
        if (!req.user) {
          return res.status(400).send({
            message: "Please pass token in header.",
            isSuccess: false,
          });
        }
        next();
      }
    );
  } catch (error) {
    return res.status(500).message({
      error: error.message,
      message: "Something went wrong, please try agian!",
      isSuccess: false,
    });
  }
};