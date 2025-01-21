import Recipe from '../models/recipe.js'; // Assuming Recipe model exists
import User from '../models/user.js'; // Assuming Recipe model exists

// Create a Recipe
export const createRecipe = async (req, res) => {
  const {
    title,
    description,
    photo,
    videoUrl,
    ingredients,
    directions,
    category,
    country,
    prepTime,
    cookTime,
    servings,
    additionalNote,
  } = req.body;

  try {
    // Check if required fields are present
    if (!title || !description || !ingredients || !directions || !category || !servings || !prepTime || !cookTime) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const newRecipe = new Recipe({
      title,
      description,
      photo: photo || 'images/no-img-available.png',  // Default photo if not provided
      videoUrl,
      ingredients,
      directions,
      category,
      country: country || '',  // Default to empty string if not provided
      prepTime,
      cookTime,
      servings,
      additionalNote,
      userId: req.userId,  // Assuming userId comes from authentication middleware
    });

    // Save the recipe
    const savedRecipe = await newRecipe.save();

    // Send response with the saved recipe details
    res.status(200).json({ message: "Recipe created successfully", recipe: savedRecipe });
  } catch (error) {
    // Handle errors
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Failed to create recipe", error: error.message });
  }
};




// Get All Recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes
    console.log("Recipes from DB:", recipes); // Debug database recipes
    res.status(200).json({ message: "Recipes retrieved successfully", recipes });
  } catch (error) {
    console.error("Database Error:", error.message); // Debug errors
    res.status(500).json({ message: "Failed to retrieve recipes", error: error.message });
  }
};



// Get Single Recipe by ID
export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id)
    const user=await User.findById(recipe.userId)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe retrieved successfully', recipe,user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve recipe', error: error.message });
  }
};

// Get My Recipes
export const getMyRecipes = async (req, res) => {
  try {
    const myRecipes = await Recipe.find({ userId: req.userId });
    res.status(200).json({ message: 'My recipes retrieved successfully', recipes: myRecipes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve my recipes', error: error.message });
  }
};


