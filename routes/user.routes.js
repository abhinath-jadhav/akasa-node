const { Router } = require("express");
const { registerUser, signIn } = require("../controllers/user.controller");
const { verifyTokenAndRole } = require("../util/jwt.util");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", signIn);
userRouter.get("/flight", verifyTokenAndRole(), (req, res) => {
  res.json({
    status: "200",
    message: "Success",
    flights: [
      {
        id: 1,
        flightId: "QP 1248",
        userId: "testuser@gmail.com",
        path: "Mumbai To Pune",
      },
      {
        id: 2,
        flightId: "QP 2313",
        userId: "testuser@gmail.com",
        path: "Pune To Mumbai",
      },
      {
        id: 3,
        flightId: "QP 1982",
        userId: "testuser@gmail.com",
        path: "Mumbai To Bangalore",
      },
      {
        id: 4,
        flightId: "QP 2456",
        userId: "testuser@gmail.com",
        path: "Bangalore to Mumbai",
      },
    ],
  });
});

userRouter.get("/", verifyTokenAndRole(["ROLE_ADMIN"]), (req, res) => {
  return res.json("success");
});

module.exports = userRouter;
