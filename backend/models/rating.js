import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe', 
      required: true, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true, 
    },
    rating: {
      type: Number,
      required: true,
      min: 1, 
      max: 5, 
    },
    review: {
      type: String, 
      default: '', 
    },
  },
  { timestamps: true } 
);

// Define the model
const ratingModel = mongoose.model("Rating", ratingSchema);

// Export the model
export default ratingModel;
