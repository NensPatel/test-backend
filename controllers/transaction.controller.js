const transactionSchema = require("../models/transaction.model");

// Add a transaction
exports.addTransaction = async (req, res) => {
  const { user, title, amount, categoryName, type, date } = req.body;

  try {
    

    const createObj = {
      user,
      title,
      amount,
      categoryName,
      type,
      date,
    };

    const transaction = new transactionSchema(createObj);
    await transaction.save();

    const data = await transactionSchema
      .findById(transaction._id)

    return res.status(201).send({
      isSuccess: true,
      message: "Transaction created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const data = await transactionSchema
      .find({})
      // .populate("category", "categoryName");
    const count = await transactionSchema.countDocuments();
    return res.status(200).send({
      isSuccess: true,
      message: "Transaction fetched successfully",
      totalTransaction: count,
      data,
    });
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateTransaction = async(req, res) =>{
  try {
    const {id} = req.params;
    const updatedData = {...req.body};

    const transaction = await transactionSchema.findById(id);
    if(!transaction){
      return res.status(404).send({
        isSuccess: false,
        message: "Transaction data not found",
      })
    }

    const data = await transactionSchema.findByIdAndUpdate(id, updatedData, {new:true});
    return res.status(200).send({
      isSuccess: true,
      message: "Transaction updated successfully",
      data
    })
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

exports.deleteTransaction = async(req, res) =>{
  try {
    const {id} = req.params;
    const transaction = await transactionSchema.findById(id);
    if(!transaction){
      return res.status(404).send({
        isSuccess: false,
        message: "Transaction data not found",
      })
    }

    const deletedTransaction = await transactionSchema.findByIdAndDelete(id);
    if(!deletedTransaction){
      return res.status(404).send({
        isSuccess: false,
        message: "Transaction data not found",
      })
    }

    return res.status(200).send({
      isSuccess: true,
      message: "Transaction deleted successfully",
    });
    
  } catch (error) {
    return res.status(500).send({
      isSuccess: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}