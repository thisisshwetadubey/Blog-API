const Category = require("../model/category");

const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const checkCategory = await Category.findOne({ category });
    if (checkCategory) throw "Category already exists";

    const postCategory = await Category.create({
      category,
    });

    if (!postCategory) throw "Invalid category";

    res.status(200).json({
      statusCode: 200,
      type: "Success",
      data: "Category created successfully",
    });
  } catch (error) {
    res.json({
      statusCode: 400,
      type: "Error",
      error: error.error || error,
    });
  }
};

module.exports = { createCategory };
