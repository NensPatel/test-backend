const express = require("express");
const router = express.Router();


const userRoutes = require("./user/user.route");
const transactionRoutes = require("./user/transaction.route");
const categoryRoutes = require("./user/category.route");

router.use("/user", userRoutes);
router.use("/transaction", transactionRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
