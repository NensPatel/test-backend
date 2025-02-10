const express = require("express");
const router = express.Router();


const userRoutes = require("./user.route");
const transactionRoutes = require("./transaction.route");
const categoryRoutes = require("./category.route");

router.use("/user", userRoutes);
router.use("/transaction", transactionRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
