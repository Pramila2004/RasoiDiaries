import React, { useState } from "react";
import "./AddRecipe.css";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    description: "",
    videoUrl: "",
    ingredients: [],
    directions: [],
    finishingSteps: [],
    servings: 5,
    cookingTime: { hours: 1, minutes: 30 },
    prepTime: { hours: 0, minutes: 0 },
    category: "",
    country: "",
    note:""
  });


  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target.result); // Convert the file into a base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleAddDirection = () => {
    setRecipe({ ...recipe, directions: [...recipe.directions, ""] });
  };



  return (
    <div className="recipe-form">
      <h2>New Recipe</h2>

      <div className="cover-photo-banner">
        <div className="img-upload">
            <label htmlFor="coverPhoto" className="upload-label">
            <img
                src={
                coverPhoto ||
                "images/recipe_upload.jpg"
                }
                alt="Cover"
                className="banner-image"
                onChange={handleCoverPhotoChange}
            />
            </label>
        </div>
        

        <div className="upload-button">
            <button>Upload</button>
        </div>
        
      </div>
      


      <div className="form-section">
        <label>Title</label>
        <input type="text" name="title" placeholder="Add title"/>
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
  {recipe.ingredients.map((_, index) => (
    <div key={index} className="ingredient-item">
      <input
        type="text"
        value={recipe.ingredients[index]}
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
  {recipe.directions.map((_, index) => (
    <div key={index} className="direction-item">
      <textarea
        value={recipe.directions[index]}
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
      value={recipe.cookingTime.hours}
      placeholder="0"
      onChange={(e) =>
        setRecipe({
          ...recipe,
          cookingTime: { ...recipe.cookingTime, hours: e.target.value },
        })
      }
    />
    <span>Hours</span>
    <input
      type="number"
      value={recipe.cookingTime.minutes}
      placeholder="0"
      onChange={(e) =>
        setRecipe({
          ...recipe,
          cookingTime: { ...recipe.cookingTime, minutes: e.target.value },
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
      value={recipe.prepTime.hours}
      placeholder="0"
      onChange={(e) =>
        setRecipe({
          ...recipe,
          prepTime: { ...recipe.prepTime, hours: e.target.value },
        })
      }
    />
    <span>Hours</span>
    <input
      type="number"
      value={recipe.prepTime.minutes}
      placeholder="0"
      onChange={(e) =>
        setRecipe({
          ...recipe,
          prepTime: { ...recipe.prepTime, minutes: e.target.value },
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
        </select>
      </div>

      <div className="form-section">
        <label>Country</label>
        <select
          value={recipe.country}
          onChange={(e) => setRecipe({ ...recipe, country: e.target.value })}
        >
          <option value="India">India</option>
          <option value="Maxican">Maxican</option>
          <option value="UK">UK</option>
        </select>
      </div>

      <div className="form-section">
        <label>Note</label>
        <input type="text" name="note" placeholder="Add additional note"/>
      </div>

      <div className="form-section">
        <button type="button">Publish</button>
      </div>
    </div>
  );
};

export default RecipeForm;
