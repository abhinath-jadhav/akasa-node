const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const userRouter = require("../controllers/userController.js");

const mongoose = require("mongoose");

// Replace with your MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://jabhinath1995:5qRQLsjQEZ6wYitd@cluster0.tllxlzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

//Get all students
router.get("/", (req, res) => {
  res.send("App is running..");
});

router.use("/user", userRouter);

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
