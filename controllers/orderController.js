const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all orders" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create a new order" });
});

module.exports = router;
