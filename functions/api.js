const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");
const { verifyTokenAndRole } = require("../util/jwt.util");
const userRouter = require("../routes/user.routes");
const foodRouter = require("../routes/food.routes");
const inventoryRouter = require("../routes/inventory.routes");
const cartRouter = require("../routes/cart.routes");

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

router.use(express.json());

router.get("/", (req, res) => {
  res.send("App is running..");
});

router.use("/user", userRouter);
router.use("/food", foodRouter);
router.use("/inventory", inventoryRouter);
router.use("/cart", cartRouter);

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
