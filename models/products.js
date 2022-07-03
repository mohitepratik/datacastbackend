const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  partNumber: {
    type: String,
  },

  section: {
    type: String,
  },

  defects: {
    type: String,
  },

  workerId: {
    type: String,
  },

  reason: {
    type: String,
  },
}, {timestamps: {createdAt:'created_at', updatedAt:'updated_at'}});
module.exports = Product = mongoose.model("products", ProductSchema);