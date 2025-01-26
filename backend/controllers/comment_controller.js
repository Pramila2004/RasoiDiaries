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


export const getAverageRating = async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Validate if recipeId exists
    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required." });
    }

    const recipe=await Recipe.findById(recipeId)
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }
    const ratings = await Rating.find({ "recipe._id": recipe._id });

    console.log(ratings)
    // Calculate the average rating
    const totalRatings = ratings.length;
    const totalScore = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = totalRatings > 0 ? totalScore / totalRatings : 0;

    console.log('Average Rating: ', averageRating);
    console.log('Total Score: ', totalScore);
    console.log('Total Ratings: ', totalRatings);

    // Respond with the calculated average rating and total ratings
    res.status(200).json({
      averageRating: Number(averageRating.toFixed(1)), // Send numeric value rounded to 1 decimal place
      totalRatings,
    });
  } catch (error) {
    console.error("Error calculating average rating:", error);
    res.status(500).json({ message: "Error fetching ratings." });
  }
};

