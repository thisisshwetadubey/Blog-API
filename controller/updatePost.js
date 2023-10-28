const Posts = require("../model/post");

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updatePost = req.body;

    const findPost = await Posts.findOne({_id: id});

    if (!findPost) throw "Post not found";

    const updatedPost = await Posts.updateOne({_id: id}, updatePost);

    if (!updatedPost) throw "Failed to update post";
    
    res.status(200).json({
      statusCode: 200,
      type: "Success",
      data: "Post Updated sucessfully",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      type: "Error",
      error: error || error.error,
    });
  }
};

module.exports = { updatePost };
