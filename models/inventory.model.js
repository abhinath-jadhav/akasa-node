const { Schema, default: mongoose } = require("mongoose");

const InventorySchema = new Schema({
  itemId: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
