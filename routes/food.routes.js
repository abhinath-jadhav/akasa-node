const { Router } = require("express");
const {
  getAll,
  favorites,
  getCategories,
  addCategories,
  addFood,
  getCartItems,
} = require("../controllers/food.controller");

const foodRouter = Router();

foodRouter.get("/", getAll);
foodRouter.get("/favorites", favorites);
foodRouter.post("/", addFood);
foodRouter.get("/category", getCategories);
foodRouter.post("/category", addCategories);
foodRouter.post("/ids", getCartItems);

module.exports = foodRouter;
