const Posts = require("../model/post");
const Category = require("../model/category");

const createPost = async (req, res) => {
  try {
    const { title, content, category_id } = req.body;

    const checkCategory = await Category.findOne({ _id: category_id });

    if (!checkCategory)  throw "Category not found";

    const postData = await Posts.create({
      title,
      content,
      category_id,
    });

    if (!postData) throw "Invalid Post";
    
    res.status(201).json({
      statusCode: 201,
      type: 'Success',
      data: "Successfully created",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      type: 'Error',
      error: error.error || error,
    });
  }
};

module.exports = { createPost };
