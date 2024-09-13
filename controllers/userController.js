const express = require("express");
const User = require("../models/user.model");
const ApiError = require("../util/ApiError");
const router = express.Router();

router.get("/", async (req, res) => {
  // Your logic to handle GET /api/users

  const [username, password] = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.json(new ApiError(400, "User not found with userid"));
  }
  res.json(user);
});

router.post("/", (req, res) => {
  // Your logic to handle POST /api/users
  res.json({ message: "Create a new user" });
});

module.exports = router;
