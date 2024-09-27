const { Router } = require("express");
const {
  addToCart,
  reduceFromCart,
  getUserCart,
  saveCart,
} = require("../controllers/cart.controller");
const { verifyTokenAndRole } = require("../util/jwt.util");

const cartRouter = Router();
cartRouter.post("/", saveCart);
cartRouter.post("/:id", addToCart);
cartRouter.put("/:id", reduceFromCart);
cartRouter.get("/", getUserCart);

module.exports = cartRouter;
