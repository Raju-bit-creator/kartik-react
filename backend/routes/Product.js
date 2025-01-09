const express = require("express");
const { body, validationResult } = require("express-validator");
const fecthUser = require("../middleware/Fetchuser");
const Product = require("../models/Product");

router = express.Router();

router.get("/getallproduct", fecthUser, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

router.post(
  "/addproduct",
  fecthUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, instock, price } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Product({
        title,
        description,
        instock,
        price,
      });
      const saveProduct = await product.save();
      res.json(saveProduct);
    } catch (error) {
      res.status(500).send("internal server error", error);
    }
  }
);
router.put("/updateproduct/:id", fecthUser, async (req, res) => {
  const { title, description, price, instock } = req.body;
  try {
    const newProduct = {};
    if (title) {
      newProduct.title = title;
    }
    if (description) {
      newProduct.description = description;
    }
    if (price) {
      newProduct.price = price;
    }
    if (instock) {
      newProduct.instock = instock;
    }

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(404).send("not allowed");
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("internal server error", error.message);
  }
});

router.delete("/deleteproduct/:id", fecthUser, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }
    if (product.user.toString() !== req.user.id) {
      return res.status(404).send("not allowed");
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "product deleted" });
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});

module.exports = router;
