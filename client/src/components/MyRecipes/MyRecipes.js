import React, { useContext, useEffect, useState } from "react";
import "./MyRecipes.css"; // Add styling as needed
import { get } from "../../services/ApiEndpoint.js";
import RecipeCard from "../RecipeCard/RecipeCard.js";
import { AuthContext } from "../../context/AuthContext.js";

const MyRecipes = () => {

  const [myRecipes, setMyRecipes] = useState([]); // State to store user's created recipes
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);
   const { currentUser } = useContext(AuthContext);
 

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await get("api/recipe/getMyRecipes"); // API endpoint to get user's recipes
        if (response.status === 200) {
          const data = response.data.recipes;
          setMyRecipes(data);
        } else {
          setError("Failed to fetch your recipes.");
        }
      } catch (err) {
        setError("An error occurred while fetching your recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [currentUser,myRecipes]);

  return (
    <div className="favorite-container">
      <h1>My Created Recipes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : myRecipes.length === 0 ? (
        <p>You haven't created any recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {myRecipes.map((recipe) => (
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

export default MyRecipes;
