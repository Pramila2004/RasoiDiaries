import React, { useState } from "react";
import "./AddRecipe.css";
import UploadRecipe from "../uploadWidget/uploadReipe.js";
import { post } from "../../services/ApiEndpoint.js";
import { toast } from "react-hot-toast";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    photo: "images/recipe_upload.jpg",
    videoUrl: "",
    ingredients: [],
    directions: [],
    servings: 0,
    cookTime: 0,
    prepTime: 0,
    category: "",
    country: "",
    additionalNote: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting recipe:", recipe);
      const response = await post("/api/recipe/createRecipe", recipe);
      if (response.status === 200) {
        toast.success(response.data.message || "Recipe Published successfully!");
        setRecipe({
          title: "",
          description: "",
          photo: "images/recipe_upload.jpg",
          videoUrl: "",
          ingredients: [],
          directions: [],
          servings: 0,
          cookTime: 0,
          prepTime: 0,
          category: "",
          country: "",
          additionalNote: "",
        });
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error(error.response?.data?.message || "An error occurred while publishing your recipe.");
    }
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleAddDirection = () => {
    setRecipe({ ...recipe, directions: [...recipe.directions, ""] });
  };

  const setPhoto = (newPhoto) => {
    setRecipe({ ...recipe, photo: newPhoto });
  };

  return (
    <div className="recipe-form">
      <h2>New Recipe</h2>
      <div className="cover-photo-banner">
        <div className="img-upload">
          <label htmlFor="coverPhoto" className="upload-label"></label>
          <div className="avatar-section">
            <img src={recipe.photo} alt="Recipe" className="banner-image" />
          </div>
        </div>

        <UploadRecipe
          uwConfig={{
            cloudName: 'dpqnyim8p',
            uploadPreset: 'rasoi-diaries',
            folder: 'recipes',
          }}
          setPhoto={setPhoto}
        />
      </div>

      <div className="form-section">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={(e) =>
            setRecipe({ ...recipe, title: e.target.value })
          }
          placeholder="Add title"
        />
      </div>

      <div className="form-section">
        <label>Description</label>
        <textarea
          value={recipe.description}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
          placeholder="Add a description"
        />
      </div>

      <div className="form-section">
        <label>Video</label>
        <input
          type="url"
          value={recipe.videoUrl}
          onChange={(e) => setRecipe({ ...recipe, videoUrl: e.target.value })}
          placeholder="Add video URL"
        />
      </div>

      <div className="form-section">
        <label>Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index] = e.target.value;
                setRecipe({ ...recipe, ingredients: newIngredients });
              }}
              placeholder={`Ingredient ${index + 1}`}
            />
            <button
              type="button"
              className="remove-button"
              onClick={() => {
                const newIngredients = [...recipe.ingredients];
                newIngredients.splice(index, 1);
                setRecipe({ ...recipe, ingredients: newIngredients });
              }}
            >
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>

      <div className="form-section">
        <label>Directions</label>
        {recipe.directions.map((direction, index) => (
          <div key={index} className="direction-item">
            <textarea
              value={direction}
              onChange={(e) => {
                const newDirections = [...recipe.directions];
                newDirections[index] = e.target.value;
                setRecipe({ ...recipe, directions: newDirections });
              }}
              placeholder={`Step ${index + 1}`}
            />
            <button
              className="remove-button"
              onClick={() => {
                const newDirections = [...recipe.directions];
                newDirections.splice(index, 1);
                setRecipe({ ...recipe, directions: newDirections });
              }}
            >
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDirection}>
          Add Direction
        </button>
      </div>

      <div className="form-section">
        <label>Servings</label>
        <input
          type="number"
          value={recipe.servings}
          onChange={(e) =>
            setRecipe({ ...recipe, servings: e.target.value })
          }
        />
      </div>

      <div className="form-section">
        <label>Cooking Time</label>
        <div className="time-inputs">
          <input
            type="number"
            value={recipe.cookTime}
            placeholder="0"
            onChange={(e) =>
              setRecipe({
                ...recipe,
                cookTime: e.target.value, // Save total minutes instead of object
              })
            }
          />
          <span>Minutes</span>
        </div>
      </div>

      <div className="form-section">
        <label>Prep Time</label>
        <div className="time-inputs">
          <input
            type="number"
            value={recipe.prepTime}
            placeholder="0"
            onChange={(e) =>
              setRecipe({
                ...recipe,
                prepTime: e.target.value, // Save total minutes instead of object
              })
            }
          />
          <span>Minutes</span>
        </div>
      </div>

      <div className="form-section">
        <label>Category</label>
        <select
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
        >
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Salad">Salad</option>
        </select>
      </div>

      <div className="form-section">
        <label>Country</label>
        <select
          value={recipe.country}
          onChange={(e) => setRecipe({ ...recipe, country: e.target.value })}
        >
          <option value="India">India</option>
          <option value="Mexico">Mexico</option>
          <option value="UK">UK</option>
        </select>
      </div>

      <div className="form-section">
        <label>Note</label>
        <input
          onChange={(e) =>
            setRecipe({ ...recipe, additionalNote: e.target.value })
          }
          type="text"
          name="note"
          placeholder="Add additional note"
        />
      </div>

      <div className="form-section">
        <button onClick={handleSubmit} type="button">
          Publish
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;
