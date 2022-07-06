const { request } = require("express");
const express = require("express");
const router = express.Router();
const momnet = require('moment')
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

router.get("/date", async (req,res)=>{
  try {
    const products = await Products.aggregate([
      {$match :{
        created_at: {
          $gte: momnet().startOf('isoWeek').toDate(),
          $lt: momnet().endOf('isoWeek').toDate()
        }
      }}
    ]) 
    console.log(products)
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send('failed')
  }
})
module.exports = router;