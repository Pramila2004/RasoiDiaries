import User from '../models/user.js'; // Assuming User model exists
import Recipe from '../models/recipe.js';

export const getMyLikedRecipes = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipeIds = user.likedRecipes;
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });
    res.status(200).json({
      message: "Saved recipes retrieved successfully",
      recipes: recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve saved recipes",
      error: error.message,
    });
  }
};


  export const likeRecipe = async (req, res) => {
    const { userId, recipeId } = req.body;
  
    try {
      
      if (!userId || !recipeId) {
        return res.status(400).json({ message: "User ID and Recipe ID are required." });
      }
  
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found." });
      }
  
      const alreadyLiked = recipe.likedBy.includes(userId);
      if (alreadyLiked) {
        await Promise.all([
          User.updateOne({ _id: userId }, { $pull: { likedRecipes: recipeId } }),
          recipe.updateOne({ $pull: { likedBy: userId } }),
        ]);
        return res.status(200).json({ message: "Recipe disliked successfully.", isSaved: false });
      }
  
      await Promise.all([
        User.updateOne({ _id: userId }, { $push: { likedRecipes: recipeId } }),
        recipe.updateOne({ $push: { likedBy: userId } }),
      ]);
      res.status(200).json({ message: "Recipe liked successfully.", isSaved: true });
    } catch (error) {
      console.error("Error liking/disliking recipe:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  