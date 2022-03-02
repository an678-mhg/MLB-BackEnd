const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    newPrice: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: String,
    },
    image: {
      type: Array,
      required: true,
    },
    thumnail: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    memorys: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
