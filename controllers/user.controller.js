const User = require("../models/user.model");
const ApiError = require("../util/ApiError");
const bcrypt = require("bcrypt");
const SuccessResonse = require("../util/SuccsResponce");
const { generateToken } = require("../util/jwt.util");

const registerUser = async (req, res) => {
  const { email, password, name, confirmPassword } = req.body;
  const userExist = await User.findOne({ email: email });
  // Check if user exists
  if (userExist) {
    return res.status(400).json({
      staus: 400,
      message: "User already present with this email.",
    });
  }
  // Confirm password shhould match
  if (password !== confirmPassword) {
    return res.status(400).json(new ApiError(400, "Password doesnt match"));
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    name,
    password: hashed,
    roles: "ROLE_ADMIN",
    isActive: true,
  });
  try {
    // save and generate token
    const userNew = await user.save();
    const token = generateToken(userNew._id, userNew.email, userNew.roles);
    return res.status(200).json({
      token: token,
      status: 200,
      message: "User created Succfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(500, "Internal server error");
  }
};

const signIn = async (req, res) => {
  console.log("test");

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Email and password required."));
  }
  // Get user by email.
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json(new ApiError(400, "Bad Credintials"));
  }

  // match password with entered password
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json(new ApiError(400, "Bad Credintials"));

  // Generate token
  try {
    console.log("test");

    const token = generateToken(user._id, user.email, user.roles);
    return res.json({ token: token, status: 200 });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong", error));
  }
};

module.exports = { registerUser, signIn };
