const categorySchema = require("../models/category.model")

exports.addCategory = async (req, res) => {
  const { categoryName, user } = req.body;
  try {
    const createObj = {
      categoryName,
      user,
    };

    const data = await categorySchema.create(createObj);
    await data.save();
    return res.status(200).send({
      isSuccess: true,
      message: "Category created successfully",
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

exports.getCategory = async (req, res) => {
  try {
    const data = await categorySchema.find({});
    const count = await categorySchema.countDocuments();
    return res.status(200).send({
      isSuccess: true,
      message: "Category fetched successfully",
      totalCategories: count,
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

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const upadatedData = { ...req.body };
    const category = await categorySchema.findById(id);
    if (!category) {
      return res.status(404).send({
        isSuccess: false,
        message: "Category not found",
      });
    }

    const data = await categorySchema.findByIdAndUpdate(id, upadatedData, {
      new: true,
    });

    return res.status(200).send({
      isSuccess: true,
      message: "Category Updated Successfully",
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

exports.deleteCategory = async(req, res) =>{
    try {
      const { id } = req.params;
      const category = await categorySchema.findById(id );
      if (!category) {
        return res.status(404).send({
          isSuccess: false,
          message: "category not found!",
        });
      }
      const deleteCategory = await categorySchema.findByIdAndDelete(id);
      if (!deleteCategory) {
        return res.status(404).send({
          isSuccess: false,
          message: "Category not found!",
        });
      }
      return res.status(200).send({
        isSuccess: true,
        message: "Category deleted successfully!",
      });
    } catch (error) {
        return res.status(500).send({
          isSuccess: false,
          message: "Something went wrong",
          error: error.message,
        });
    }
}