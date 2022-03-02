const express = require("express");
const mongosee = require("mongoose");
const usersRoute = require("../server/src/routes/UsersRoute");
const uploadRoute = require("../server/src/routes/UploadRoute");
const adminRoute = require("../server/src/routes/AdminRoute");
const productRoute = require("../server/src/routes/ProductRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const url = `mongodb+srv://${process.env.ROOT}:${process.env.PASS}@shop-app.tamej.mongodb.net/shop-app?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongosee.connect(url);
    console.log("connectDB success !");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api/auth", usersRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
