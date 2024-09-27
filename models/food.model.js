const { default: mongoose } = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  diet: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

FoodSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
