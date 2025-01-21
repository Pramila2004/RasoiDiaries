import Rating from '../models/rating.js';
import Recipe from '../models/recipe.js';
import User from '../models/user.js';

export const addRating = async (req, res) => {
  const recipeId = req.params.id;
  const { rating, review } = req.body; // Expect rating and review in the body

  try {
    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const user=await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newRating = new Rating({
      recipe,
      user, // Assuming user ID is passed from the middleware
      rating,
      review,
    });

    // Save the new rating to the database
    await newRating.save();

    // Add the rating to the recipe's ratings array (optional)
    recipe.ratings.push(newRating);
    await recipe.save();

    res.status(200).json({
      message: 'Rating added successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

export const getRatings = async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId).populate('ratings', 'rating review user'); // Populate ratings with relevant fields

    if (!recipe || recipe.ratings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for this recipe' });
    }

    res.status(200).json({
      message: 'Ratings fetched successfully',
      ratings: recipe.ratings, // Return only ratings field
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
