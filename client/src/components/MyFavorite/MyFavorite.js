import React, { useContext, useEffect, useState } from "react";
import "./MyFavorite.css"; // Add styling as needed
import { get } from "../../services/ApiEndpoint.js";
import {  useNavigate } from 'react-router-dom';
import RecipeCard from "../RecipeCard/RecipeCard.js";
import { AuthContext } from "../../context/AuthContext.js";

const MyFavorite = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

 
  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const response = await get("/api/recipeLike/getMyLikedRecipes");
        setLikedRecipes(response.data.recipes); // Update state with the liked recipes
      } catch (error) {
        console.log("Failed to fetch liked recipes.");
      }
    };

    fetchLikedRecipes();
  }, [currentUser,likedRecipes]); 

  return (
    <div className="favorite-container">
      <h1>My Liked Recipes</h1>
      {likedRecipes.length === 0 ? (
        <p>You have no liked recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {likedRecipes.map((recipe) => (
            <RecipeCard 
            key={recipe._id}
            recipe={recipe}
            isLiked={recipe.likedBy?.includes(currentUser?._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorite;
