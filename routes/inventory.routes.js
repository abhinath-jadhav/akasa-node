const { Router } = require("express");
const {
  inventory,
  inventoryByFoodId,
  addInventory,
} = require("../controllers/inventory.controller");
const { verifyTokenAndRole } = require("../util/jwt.util");

const inventoryRouter = Router();

inventoryRouter.get("/", inventory);
inventoryRouter.get("/:id", inventoryByFoodId);
inventoryRouter.post("/", verifyTokenAndRole(["ROLE_ADMIN"]), addInventory);

module.exports = inventoryRouter;
