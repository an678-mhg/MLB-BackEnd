const Products = require("../models/Products");
const Description = require("../models/Description");
const Configuration = require("../models/Configuration");

const addProduct = async (req, res) => {
  try {
    const newProduct = new Products({
      name: req.body.name,
      newPrice: req.body.newPrice,
      oldPrice: req.body.oldPrice,
      image: req.body.image,
      colors: req.body.colors,
      memorys: req.body.memorys,
      category: req.body.category,
      thumnail: req.body.thumnail,
    });

    await newProduct.save();

    const newDescription = new Description({
      productId: newProduct._id,
      contentHtml: req.body.contentHtml,
      contentMarkdown: req.body.contentMarkdown,
    });

    await newDescription.save();

    const newConfiguration = new Configuration({
      productId: newProduct._id,
      display: req.body.display,
      resolution: req.body.resolution,
      operatingSystem: req.body.operatingSystem,
      chipset: req.body.chipset,
      ram: req.body.ram,
      mobileNetwork: req.body.mobileNetwork,
      pin: req.body.pin,
    });

    await newConfiguration.save();

    return res.status(203).json({
      success: true,
      message: "Create products success !!",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getProductsCategory = async (req, res) => {
  try {
    const getCategory = await Products.find({
      category: req.params.category,
    }).limit(5);

    if (getCategory.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Not a products !",
      });
    }

    return res.status(200).json({
      success: true,
      products: getCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const checkDelete = await Products.findOneAndDelete({ _id: req.params.id });
    if (!checkDelete) {
      return res.status(500).json({
        success: false,
        message: "Delete fail !!!",
      });
    }
    const checkDeleteConfiguration = await Configuration.findOneAndDelete({
      productId: req.params.id,
    });
    if (!checkDeleteConfiguration) {
      return res.status(500).json({
        success: false,
        message: "Delete fail !!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete success !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.id });
    if (!product)
      return res.status(500).json({
        success: false,
        message: "Product not found !",
      });

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findOne({
      productId: req.params.productId,
    });
    if (!configuration)
      return res.status(500).json({
        success: false,
        message: "Configuration not found !",
      });

    return res.json({
      success: true,
      configuration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

const getDescription = async (req, res) => {
  try {
    const description = await Description.findOne({
      productId: req.params.productId,
    });
    if (!description)
      return res.status(500).json({
        success: false,
        message: "description not found !",
      });

    return res.json({
      success: true,
      description,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found !!!",
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductsCategory,
  deleteProducts,
  getProduct,
  getConfiguration,
  getDescription,
};
