import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <div className="primary-subheading">About</div>
        <div className="primary-abheading">
        A Journey of Taste and Togetherness
        </div>
        <div className="primary-abtext">
        A space for food enthusiasts to connect, share, and celebrate diverse flavors from around the world.
        Together, we inspire creativity and bring people closer through the joy of cooking and sharing.
        </div>
        
        <div className="about-buttons-container">
          <a href="/about">
          <button className="secondary-button">Learn More</button>
          </a>
          
          
        </div>
      </div>
    </div>
  );
};

export default About;
