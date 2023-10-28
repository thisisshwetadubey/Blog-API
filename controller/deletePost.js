const Posts = require("../model/post");

const deletePost = async (req, res) => {
  try {
    const  id = req.params.id;

    const findPost = await Posts.findOne({_id: id});
    
    if (!findPost) throw "Post not found";

    const deletePost = await Posts.deleteOne({ _id: id });

    if (deletePost.deletedCount !== 1) throw "Failed to delete post";

    res.status(200).json({
      statusCode: 200,
      type: "Success",
      data: "Post deleted sucessfully",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      type: "Error",
      error: error.error || error,
    });
  }
};

module.exports = { deletePost };
