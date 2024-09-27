const Cart = require("../models/cart.model");
const Food = require("../models/food.model");
const Inventory = require("../models/inventory.model");
const ApiError = require("../util/ApiError");
const { getUser } = require("../util/jwt.util");

const saveCart = async (req, res) => {
  const items = req.body;
  const user = await getUser(req);
  let cart = await Cart.findOne({ userId: user });

  if (!cart) {
    return res.json({ status: 400, message: "User cart not found" });
  }

  cart.items = items;

  await cart.save();
  res.json({ status: 200, message: "Success" });
};

const getUserCart = async (req, res) => {
  try {
    const user = await getUser(req);

    let cart = await Cart.findOne({ userId: user });
    if (!cart) {
      return res.json({ status: 400, message: "User cart not found" });
    }
    const ids = cart.items.map((o) => o.item);

    const foods = await Food.find({ _id: { $in: ids } });

    const map = cart.items.reduce((acc, o) => {
      acc[o.item] = o.quantity;
      return acc;
    }, {});

    const updatedCart = foods.map((food) => {
      const updated = food.toObject();
      updated.qty = map[food._id];

      return updated;
    });

    return res.json({
      status: 200,
      message: "Success",
      size: cart.items.length,
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);
    return res.json(new ApiError(400, "Something went wrong"));
  }
};

const reduceFromCart = async (req, res) => {
  const id = req.params.id;
  const user = await getUser(req);

  try {
    let cart = await Cart.findOne({ userId: user, "items.item": id });

    if (cart) {
      const item = cart.items.find((o) => o.item == id);

      if (item.quantity > 1) {
        await Cart.findOneAndUpdate(
          { userId: user, "items.item": id },
          { $inc: { "items.$.quantity": -1 } }
        );
        return res.json({
          status: 200,
          message: "Success",
          item: { item: id, quantity: item.quantity - 1 },
        });
      } else {
        await Cart.findOneAndUpdate(
          { userId: user },
          { $pull: { items: { item: id } } }
        );

        return res.json({
          status: 200,
          message: "Success",
          item: { item: id, quantity: 0 },
        });
      }
    } else {
      return res.json({ status: 400, message: "Item not available" });
    }
  } catch (error) {
    console.error(err);
    return res.json(new ApiError(500, "Something went wrong", [error]));
  }
};

const addToCart = async (req, res) => {
  const id = req.params.id;
  const user = await getUser(req);

  if (!user) {
    return res.json(new ApiError(400, "Please provide token or session id."));
  }

  try {
    const inv = await Inventory.findOne({ itemId: id });
    let cart = await Cart.findOne({ userId: user });
    let item = cart?.items.find((o) => o.item == id);
    console.log(inv);

    if (inv?.stock == 0 || item?.quantity == inv.stock) {
      return res.json({ status: 400, message: "Out of stock" });
    }

    if (cart) {
      const updateCart = await Cart.findOneAndUpdate(
        { userId: user, "items.item": id },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
      );

      if (!updateCart) {
        cart = await Cart.findOneAndUpdate(
          { userId: user },
          { $push: { items: { item: id, quantity: 1 } } },
          { new: true }
        );
      } else {
        cart = updateCart;
      }
    } else {
      // If the cart doesn't exist, create a new one with the item
      cart = new Cart({
        userId: user,
        items: [{ item: id, quantity: 1 }],
      });
      await cart.save();
    }

    item = cart.items.find((o) => o.item == id);

    return res.json({ status: 200, message: "Success", item });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong", errors: [error] });
  }
};

module.exports = { addToCart, reduceFromCart, getUserCart, saveCart };

// H band
// medical 6lac
// 11k first month
// Postpaid Card
// 800 per month
// grautity
// 32 Leaves 22+6+4
// 8% unconditional variable pay
// March Upraisal

// 23.5
// 1.75 var
// 21.75
// 1,81
// 98,700
//
