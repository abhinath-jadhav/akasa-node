const express = require("express");
const app = express();
const PORT = 8888;
const router = express.Router();
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const foodRouter = require("./routes/food.routes");
const inventoryRouter = require("./routes/inventory.routes");
const cartRouter = require("./routes/cart.routes");
const { verifyTokenAndRole } = require("./util/jwt.util");

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
