const express = require("express");
const route = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");
const {
  addProduct,
  getProducts,
  getProductsCategory,
  deleteProducts,
  getProduct,
  getConfiguration,
  getDescription,
} = require("../controllers/ProductController");

// POST
// /api/product
// Mô tả: thêm sản phẩm
// Private
route.post("/", checkAdmin, addProduct);

// GET
// /api/product
// Mô tả: Lấy về tất cả sản phẩm
// Public
route.get("/", getProducts);

// GET
// /api/product
// Mô tả: Lấy sản phẩm theo id
// Public
route.get("/:id", getProduct);

// DELETE
// /api/product/:id
// Mô tả: Xóa sản phẩm
// Private
route.delete("/:id", checkAdmin, deleteProducts);

// GET
// /api/product/:category
// Mô tả: Lấy theo danh mục vd: Phone, Laptop, Watch, Tablet
// Public
route.get("/category/:category", getProductsCategory);

// GET
// /api/product/configuration/:productId
// Mô tả: Lấy cấu hình products
route.get("/configuration/:productId", getConfiguration);

// GET
// /api/product/description/:productId
route.get("/description/:productId", getDescription);

module.exports = route;