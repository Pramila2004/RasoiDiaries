import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      

      <main className="main-content">
        <div className="text-content">
          <h1>
            Enjoy Your <span className="highlight">Special</span> Delicious Meal <span>🔥</span>
          </h1>
          <p className="description">
            We make it easy for you to give your guests the same experience online that they expect within your doors.
          </p>
          <div className="buttons">
            <button className="order-btn">Order Now</button>
            <button className="video-btn">Watch Video</button>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">4.8</span>
              <p>15K Reviews</p>
            </div>
            <div className="stat-item">
              <span className="stat-number">400+</span>
              <p>Restaurants</p>
            </div>
            <div className="stat-item">
              <span className="stat-number">7000+</span>
              <p>Food Items</p>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Home;
