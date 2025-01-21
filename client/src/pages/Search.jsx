import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "../styles/search.css";
import { get } from "../services/ApiEndpoint";
import { AuthContext } from "../context/AuthContext";

const categories = ["All Recipes", "Appetizer", "Beverages", "Salads", "Lunch", "Dinner", "Desserts", "Snacks"];

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Recipes");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await get("api/recipe/getAllRecipes");
        if (response?.status === 200) {
          setRecipes(response.data.recipes || []);
        }
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [currentUser,recipes]);

  return (
    <div className="recipes-page">
      <header className="recipes-header">
        <h1>Recipes</h1>
        <nav className="category-nav">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </nav>
      </header>
      <div className="recipe-grid">
        {loading ? (
          <p>Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes
            .filter(
              (recipe) =>
                selectedCategory === "All Recipes" || recipe.category === selectedCategory
            )
            .map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                isLiked={recipe.likedBy?.includes(currentUser?._id)}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Search;
