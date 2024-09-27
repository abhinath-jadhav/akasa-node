const express = require("express");
const Inventory = require("../models/inventory.model");
const SuccessResonse = require("../util/SuccsResponce");
const ApiError = require("../util/ApiError");
const router = express.Router();

const inventory = async (req, res) => {
  const foods = await Inventory.find();

  if (foods) {
    return res.json({ status: 200, message: "Success", inventories: foods });
  }
  res.json(new ApiError(500, "Something went wrong"));
};

const inventoryByFoodId = async (req, res) => {
  const id = req.params.id;
  const foods = await Inventory.find({ itemId: id });

  if (foods.length != 0) {
    return res.json(new SuccessResonse(200, "Success", foods[0]));
  }
  res.json(new ApiError(400, "Food Item Not found"));
};

const addInventory = async (req, res) => {
  const data = req.body;
  const inventory = await Inventory.findOne({ itemId: data.itemId });

  if (inventory) {
    inventory.stock = data.stock;
    inventory.save();
    return res.json(new SuccessResonse(200, "Stock Updated"));
  } else {
    const inv = new Inventory({
      itemId: data.itemId,
      stock: data.stock,
    });

    inv.save();
    return res.json(new SuccessResonse(200, "Item added in inventory"));
  }
};

module.exports = { inventory, inventoryByFoodId, addInventory };
