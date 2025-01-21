import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { get, post } from '../services/ApiEndpoint.js';  // Assuming this is your service for making API calls
import '../styles/Singlepage.css';

export default function Singlepage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratings, setRatings] = useState([]); // Store ratings data
  const [userRating, setUserRating] = useState(1); // Track user's rating input
  const [reviewText, setReviewText] = useState(''); // Track review text

  useEffect(() => {
    // Fetch recipe by ID
    const fetchRecipe = async () => {
      try {
        const response = await get(`/api/recipe/getSingleRecipe/${id}`); // Adjust endpoint if necessary
        setRecipe(response.data.recipe); // Update state with fetched recipe
        setCreatedBy(response.data.user); // Update state with fetched recipe
        setLoading(false);  // Set loading to false after recipe is fetched
      } catch (err) {
        setError('Failed to load recipe');
        setLoading(false);
      }
    };

    const fetchRatings = async () => {
        try {
          const response = await get(`/api/rating/getRatings/${id}`); 
          console.log('All retings',response.data.ratings)
          setRatings(response.data.ratings);
        } catch (err) {
          console.log('Error fetching ratings', err);
        }
      };
  
      fetchRecipe();
      fetchRatings();
  

  }, [id,ratings]);  // Dependency array only includes 'id'

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { rating: userRating, review: reviewText };
      const response = await post(`/api/rating/addRating/${id}`, data); // Adjust endpoint as needed
      if (response.status === 200) {
        toast.success(response.message || 'Rating sent successfully');
        setUserRating(1);
        setReviewText('');
      }
    } catch (err) {
      console.error('Error adding rating', err);
    }
  };

  return (
    <div className="single-page">
      <div className="recipe-card">
        <div className="name-of-recipe">
          <div className="left-side">
            <h1>{recipe.title || 'Untitled Recipe'}</h1>
            <p>{recipe.subtitle || 'Delicious and easy to make!'}</p>
            <div className="submitted-by">
              <div className="user-photo">
                <img src={createdBy.avatar || 'images/user.png'} alt="User" />
              </div>
              <div className="user-info">
                <h4>{createdBy.username || 'Anonymous'}</h4>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="rating">★★★★☆</div>
          </div>
        </div>
        <div className="image-container">
          <img
            src={recipe.photo || 'images/no-img-available.png'}
            alt={recipe.title || 'Recipe Image'}
          />
        </div>
        <div className="content">
          <div className="ingredients">
            <div className="info">
                
              <p>🍴 {recipe.servings || '2'} servings</p>
              <p>⏱ {recipe.prepTime+recipe.cookTime || 'Not Provided'}</p>
            </div>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="directions">
            <h2>Directions</h2>
            <ol>
              {recipe.directions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
        {/* Rating Section */}
      <div className="rating-section">
        <h3>Rate This Recipe</h3>
        <form onSubmit={handleRatingSubmit}>
          <div className="rating-input">
          <div className="rating-input">
            <label>Rating: </label>
            <div className="stars-big">
                {[1, 2, 3, 4, 5].map((num) => (
                <span
                    key={num}
                    className={`star ${num <= userRating ? 'selected' : ''}`}
                    onClick={() => setUserRating(num)}
                >
                    ★
                </span>
                ))}
            </div>
            </div>

          </div>
          <div className="review-input">
            <label>Review: </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Add your review here"
            />
          </div>
          <button type="submit">Submit Rating</button>
        </form>
      </div>

      {/* All Ratings Section */}
      <div className="ratings-list">
        <h3>All Ratings</h3>
        {ratings.length > 0 ? (
            ratings.map((rating, index) => (
            <div key={index} className="rating-item">
                <div className="user-photo">
                <img src={rating.user?.avatar || 'images/user.png'} alt={rating.user?.username || 'User'} />
                </div>
                <div className="user-info">
                <h5>{rating.user?.username || 'Anonymous'}</h5>
                <div className="user-rating">
                    <div className="stars">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                        key={num}
                        className={`star ${num <= rating.rating ? 'gold' : 'white'}`}
                        >
                        ★
                        </span>
                    ))}
                    </div>
                </div>
                <p className="review-text">{rating.review || 'No review provided.'}</p>
                </div>
            </div>
            ))
        ) : (
            <p>No ratings yet.</p>
        )}
        </div>


    </div>

    </div>
    
  );
}
