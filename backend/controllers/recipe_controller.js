import Recipe from '../models/recipe.js'; // Assuming Recipe model exists

// Create a Recipe
export const createRecipe = async (req, res) => {
  const { title, description, ingredients, directions, category, country, prepTime, cookTime, servings, additionalNote } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      photo,
      ingredients,
      directions,
      category,
      country,
      prepTime,
      cookTime,
      servings,
      additionalNote,
      userId: req.userId
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe: savedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recipe', error: error.message });
  }
};

// Get All Recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(200).json({ message: 'Recipes retrieved successfully', recipes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve recipes', error: error.message });
  }
};

// Get Single Recipe by ID
export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe retrieved successfully', recipe });
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


