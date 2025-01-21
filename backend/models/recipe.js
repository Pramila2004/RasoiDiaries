import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Recipe title is mandatory
    },
    description: {
      type: String,
      required: true, // Recipe description is mandatory
    },
    videoUrl: {
      type: String,
    },
    photo: {
      type: String,
      default: 'images/no-img-available.png', // Default photo for recipes
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References the User model
      required: true, // The user who created the recipe is mandatory
    },
    ingredients: {
      type: [String], // Array of strings for ingredients
      required: true, // Ingredients are mandatory
    },
    directions: {
      type: [String], // Array of strings for directions
      required: true, // Directions are mandatory
    },
    servings: {
      type: Number, // Number of servings
      required: true, // Servings are mandatory
    },
    prepTime: {
      type: Number, // Preparation time in minutes
      required: true, // Prep time is mandatory
    },
    cookTime: {
      type: Number, // Cooking time in minutes
      required: true, // Cook time is mandatory
    },
    additionalNote: {
      type: String, // Any additional notes for the recipe
      default: '',
    },
    category: {
      type: String, // Category for the recipe (e.g., Dessert, Main Course)
      required: true, // Category is mandatory
    },
    country: {
      type: String, // Recipe's country of origin
      default: '', // Optional field
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References users who liked the recipe
      },
    ],
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating', // Reference to Rating model
      }
    ]    
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Define the model
const Recipe = mongoose.model("Recipe", recipeSchema);

// Export the model
export default Recipe;
