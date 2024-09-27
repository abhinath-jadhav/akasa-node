const Category = require("../models/category.model");
const Food = require("../models/food.model");
const Inventory = require("../models/inventory.model");
const ApiError = require("../util/ApiError");
const SuccessResonse = require("../util/SuccsResponce");

const getAll = async (req, res) => {
  const foods = await Food.find();

  if (foods) {
    return res.json(new SuccessResonse(200, "Success", foods));
  }
  res.json(new ApiError(500, "Something went wrong"));
};

const favorites = async (req, res) => {
  const foods = await Food.find({ featured: true });

  if (foods) {
    return res.json(new SuccessResonse(200, "Success", foods));
  }
  res.json(new ApiError(500, "Something went wrong"));
};

const addFood = async (req, res) => {
  const {
    name,
    price,
    diet,
    description,
    img,
    ratings,
    featured,
    stock,
    category,
  } = req.body;
  const food = new Food({
    name: name,
    price: price,
    diet: diet,
    description: description,
    img: img,
    ratings: ratings,
    featured: featured,
    category: category,
  });

  const updatedFood = await food.save();

  const inv = new Inventory({
    itemId: updatedFood._id,
    stock: stock,
  });
  inv.save();

  res.json({ status: 200, message: "Item added" });
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories) {
      return res.json({
        status: 200,
        categories: categories,
        message: "Success",
      });
    }

    return res.json(new ApiError(500, "Something went wrong."));
  } catch (error) {
    console.error(error);
    return res.json(new ApiError(500, "Something went wrong."));
  }
};

const addCategories = async (req, res) => {
  const cat = req.body;
  const newCat = new Category({
    name: cat.name,
    desc: cat.desc,
  });

  await newCat.save();
  return res.json("success");
};

const getCartItems = async (req, res) => {
  try {
    const items = req.body;
    const ids = items.map((i) => i.item);

    const map = items.reduce((acc, o) => {
      acc[o.item] = o.quantity;
      return acc;
    }, {});

    const foods = await Food.find({ _id: { $in: ids } });

    const updatedCart = foods.map((o) => {
      const updated = o.toObject();
      updated.qty = map[o._id];
      return updated;
    });
    return res.json({ status: 200, message: "Success", cart: updatedCart });
  } catch (error) {
    console.error(error);
    return res.json(new ApiError());
  }
};

module.exports = {
  getAll,
  favorites,
  getCategories,
  addCategories,
  addFood,
  getCartItems,
};
