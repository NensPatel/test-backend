const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transaction.controller");

router.post("/addTransaction", addTransaction);
router.post("/getTransaction/", getTransaction);
router.put("/updateTransaction/:id", updateTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction)

module.exports = router;
