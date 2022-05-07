const { request } = require("express");
const express = require("express");
const router = express.Router();

const Products = require("../../models/products");

router.post("/", async (req, res) => {
  try {
    const { partNumber, section, defects, workerId, reason } = req.body;

    const products = new Products({
      partNumber,
      section,
      defects,
      workerId,
      reason,
    });

    await products.save();
    res.send("Written to MongoDb");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find();

    res.json(allProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
