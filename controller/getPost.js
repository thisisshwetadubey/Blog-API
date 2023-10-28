const Posts = require("../model/post");

const getPost = async (req, res) => {
  try {
    const posts = await Posts.find();

    if (!posts) throw "No posts found";

    res.status(200).json({
      statusCode: 200,
      type: "Success",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      type: "Error",
      error: error.error || error,
    });
  }
};

const singlePost = async (req, res) => {
  try {
    const singlePost = await Posts.findOne({ _id: req.params.id });

    if (!singlePost) throw "No post found";
    
    res.status(200).json({
      statusCode: 200,
      type: "Success",
      data: singlePost,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      type: "Error",
      error: error.error || error,
    });
  }
};

const latestPost = async (req, res) => {
  try {
    const result = await Posts.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $sort: {
          "category.category": 1,
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: "$category.category",
          latestPost: { $first: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: "$latestPost._id",
          title: "$latestPost.title",
          content: "$latestPost.content",
          createdAt: "$latestPost.createdAt",
          updatedAt: "$latestPost.updatedAt",
          category: "$_id",
        },
      },
    ]);

    if (!result) throw "Latest post not found";
    
    res.status(200).json({
      statusCode: 200,
      type: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      type: "Error",
      error: error.error || error,
    });
  }
};

module.exports = { getPost, singlePost, latestPost };
