import Comment from '../models/comment.js';
import Recipe from '../models/recipe.js';

export const addComment = async (req, res) => {
  const recipeId=req.params.id;
  const {  commentText } = req.body;
  
  try {
    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Create a new comment
    const newComment = new Comment({
      recipeId,
      userId: req.userId,  // Assuming user ID is passed from the middleware
      commentText,
    });

    // Save the new comment to the database
    await newComment.save();

    // Add the comment ID to the recipe's comments array
    recipe.comments.push(newComment._id);
    await recipe.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

export const getComments = async (req, res) => {
  const  recipeId  = req.params.id;  // Recipe ID will be in the URL parameters
  
  try {
    // Fetch all comments for the given recipeId
    const comments = await Comment.find({ recipeId })
      .populate('userId', 'username avatar')  // Populate user details to send along with the comment
      .sort({ createdAt: -1 });  // Sort comments by most recent first
    
    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this recipe' });
    }

    res.status(200).json({
      message: 'Comments fetched successfully',
      comments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
