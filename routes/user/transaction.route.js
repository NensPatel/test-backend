const express = require("express");
const router = express.Router();

const {
  addTransaction,
} = require("../../controllers/user/transaction.controller");

router.post("/addTransaction", addTransaction);

module.exports = router;
