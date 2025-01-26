import React, { useContext, useEffect, useState } from "react";
import "./RecipeCard.css";
import { Link, useNavigate } from "react-router-dom";
import { post, get } from "../../services/ApiEndpoint.js";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe, isLiked }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLiked);
  const { currentUser } = useContext(AuthContext);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0); // Track total ratings

  const handleLike = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Login first to save the recipe.");
      return navigate("/login");
    }

    try {
      const userId = currentUser._id;
      const recipeId = recipe._id;
      const response = await post("/api/recipeLike/like", { userId, recipeId });
      if (response.status === 200) {
        setLiked(response.data.isSaved);
        toast.success(response.data.message);
      }
    } catch (err) {
      console.error("Error liking/disliking recipe:", err);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await get(`/api/rating/averageRating/${recipe._id}`);
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalRatings);

      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };
  
    fetchAverageRating();
  }, [recipe._id]);
  
  // Function to render stars based on average rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= Math.round(rating) ? "gold-star" : "gray-star"}
        >
          ★
        </span>
      );
    }
    return stars;
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
        <div>
          <p className="recipe-category">{recipe.category || "Uncategorized"}</p>
          
        </div>

        <Link to={`/singlepage/${recipe._id}`}>
          <h2 className="recipe-title">{recipe.title || "Untitled Recipe"}</h2>
        </Link>

        <div className="card-rating">
          <div className="stars">{renderStars(averageRating)}</div>
          <span className="ratings-count">
            {totalRatings} {totalRatings === 1 ? "rating" : "ratings"}
          </span>
          <span className="ratings-count">{recipe.likedBy.length} likes</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
