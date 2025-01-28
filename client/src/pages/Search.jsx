import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import RecipeCard from "../components/RecipeCard/RecipeCard";
import "../styles/search.css";
import { get } from "../services/ApiEndpoint";
import { AuthContext } from "../context/AuthContext";

const categories = ["All", "Vegetarian", "Chicken", "Salad", "Lunch", "Dinner", "Desserts", "Snacks"];

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // state for search term
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
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
  }, [currentUser]);

  // Filter recipes based on the selected category and search term
  const filteredRecipes = recipes.filter((recipe) => {
    // Match by selected category
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
  
    // Match by search term (title and ingredients)
    const matchesSearchTerm =
      (recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) || // Match by title
      recipe.ingredients?.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()) // Match by ingredient
      );
  
    return matchesCategory && matchesSearchTerm;
  });
  
  

  // Handle search term input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="recipes-page">
      <header className="recipes-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for recipes, ingredients..."
            value={searchTerm}
            onChange={handleSearchChange} // trigger on change
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="category-nav">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="recipe-grid">
        {loading ? (
          <p>Loading recipes...</p>
        ) : filteredRecipes.length === 0 ? (
          <p>No recipes found for "{searchTerm}" in "{selectedCategory}".</p>
        ) : (
          filteredRecipes.map((recipe) => (
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
