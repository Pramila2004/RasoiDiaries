import React, { useContext, useState } from "react";
import "./RecipeCard.css";
import {Link, useNavigate } from "react-router-dom";
import { post } from "../../services/ApiEndpoint.js";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe, isLiked }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLiked);
  const { currentUser } = useContext(AuthContext);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Login first to save the recipe.");
      return navigate("/login");
    }

    try {
      const userId = currentUser._id;
      const recipeId = recipe._id;
      const request = await post("/api/recipeLike/like", { userId, recipeId });
      console.log('after liked : ',request)
      if (request.status === 200) {
        setLiked(request.data.isSaved);
        toast.success(request.data.message);
      }
    } catch (err) {
      console.error("Error liking/disliking recipe:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  

  return (
    <div className="card">
      <div className="card-image-container">
        <Link to={`/singlepage/${recipe._id}`}>
          <img
            src={recipe.photo || "images/no-img-available.png"}
            alt={recipe.title || "Recipe Image"}
            className="card-image"
          />
        </Link>
        
        <div
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <span>{liked ? "❤️" : "🤍"}</span>
        </div>
      </div>
      <div className="card-content">
        <p className="recipe-category">{recipe.category || "Uncategorized"}</p>
        <Link to={`/singlepage/${recipe._id}`}>
          <h2 className="recipe-title">{recipe.title || "Untitled Recipe"}</h2>
        </Link>

        <div className="card-rating">
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <span className="ratings-count">{recipe.likedBy?.length || 0} likes</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
