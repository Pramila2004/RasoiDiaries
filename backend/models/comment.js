import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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
    comment: {
      type: String, 
      required: true, 
    },
  },
  { timestamps: true } 
);

// Define the model
const commentModel = mongoose.model("Comment", commentSchema);

// Export the model
export default commentModel;
