import React from 'react'
import '../styles/Singlepage.css'


export default function Singlepage() {
  return (
    <div className="single-page">
        <div className="recipe-card">
    <div className="header">
        <div className="left-side">
            <h1>Sweet Apple Squares</h1>
            <p>With cinnamon and thyme</p>
            <div className="submitted-by">
                <div className="user-photo">
                    <img src='images/user.png' alt='' />
                </div>
                <div className="user-info">
                    <h4>John Doe</h4>
                </div>
            </div>
        </div>
        <div className="right-side">
            <div className="rating">★★★★☆</div>
        </div>
      
      
    </div>
    <div className="image-container">
      <img
        src="images/recipe2.jpg" // Replace with actual image URL
        alt="Sweet Apple Squares"
      />
    </div>
    {/* <div className="details"> */}
      <div className="content">
            <div className="ingredients">
                <div className="info">
                    <p>🍴 2 servings</p>
                    <p>⏱ 15 minutes</p>
                </div>
                <h2>Ingredients</h2>
                <ul>
                    <li>100 ml milk</li>
                    <li>50 g butter</li>
                    <li>3 eggs</li>
                    <li>1 tbs cocoa</li>
                    <li>2 tsp baking soda</li>
                    <li>A pinch of salt</li>
                </ul>
            </div>

            <div className="directions">
                <h2>Directions</h2>
                <ol>
                    <li>Nunc nulla velit, feugiat vitae ex quis, lobortis porta leo.</li>
                    <li>
                    Donec dictum lectus in ex accumsan sodales. Pellentesque habitant
                    morbi tristique.
                    </li>
                    <li>
                    Habitual habitant morbi tristique nunc nulla velit, feugiat vitae
                    ex quis.
                    </li>
                    <li>
                    Donec dictum lectus in ex accumsan sodales. Pellentesque habitant
                    morbi tristique.
                    </li>
                    <li>
                    Nunc nulla velit, feugiat vitae ex quis, lobortis porta leo.
                    </li>
                </ol>
            </div>
        </div>
    </div>
  </div>

    // </div>
    
  )
}
