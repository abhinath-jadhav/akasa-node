const { default: mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
