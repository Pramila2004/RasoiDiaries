import User from '../models/user.js'; // Assuming User model exists
import Recipe from '../models/recipe.js';

export const getMyLikedRecipes = async (req, res) => {
    try {
      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Saved recipes retrieved successfully', recipes: user.likedRecipes });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve saved recipes', error: error.message });
    }
  };


  export const likeRecipe = async (req, res) => {
    const  recipeId  = req.params.id; // Recipe ID is provided in the request body
  
    try {
      // Find the user and the recipe
      const user = await User.findById(req.userId);
      const recipe = await Recipe.findById(recipeId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Check if the recipe is already liked by the user
      const isLiked = user.likedRecipes.includes(recipeId);
  
      if (isLiked) {
        // Dislike the recipe
        user.likedRecipes = user.likedRecipes.filter(id => id.toString() !== recipeId);
        recipe.likedBy = recipe.likedBy.filter(id => id.toString() !== req.userId);
        await user.save();
        await recipe.save();
        return res.status(200).json({ message: 'Recipe disliked successfully', recipe });
      }
  
      // Like the recipe
      user.likedRecipes.push(recipeId);
      recipe.likedBy.push(req.userId);
      await user.save();
      await recipe.save();
  
      res.status(200).json({ message: 'Recipe liked successfully', recipe });
    } catch (error) {
      res.status(500).json({ message: 'Failed to like/dislike the recipe', error: error.message });
    }
  };