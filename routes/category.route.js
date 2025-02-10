const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

router.post("/addCategory", addCategory);
router.get("/getCategory", getCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory)

module.exports = router;
