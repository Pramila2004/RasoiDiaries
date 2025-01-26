import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";


const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <div className="primary-heading">
            Share The Secret, Spread The Flavor
          </div>
          <p className="primary-text">
          A community where food lovers connect to explore diverse flavors, spark creativity, and savor dishes from around the world.
          </p>
          <a href="/search"className="explore-link">
          <button className="secondary-button">
            Explore 
          </button>
          
          </a>
          
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
