const transactionSchema = require("../../models/user/transaction.model");
const categorySchema = require("../../models/user/category.model");

// Add a transaction
exports.addTransaction = async (req, res) => {

  const {user, title, amount, category, type, date } = req.body;

  try {
    const validCategory = await categorySchema.findById(category);
    if (!validCategory) {
      return res.status(400).send({
        isSuccess: false,
        message: "Invalid category ID",
      });
    }

    const createObj = {
      user,
      title,
      amount,
      category,
      type,
      date,
    };

    const transaction = new transactionSchema(createObj);
    await transaction.save();

    return res.status(201).send({
      isSuccess: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
