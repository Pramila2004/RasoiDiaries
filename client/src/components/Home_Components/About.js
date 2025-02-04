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
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        A Journey of Taste and Togetherness
        </h1>
        <p className="primary-text">
        A space for food enthusiasts to connect, share, and celebrate diverse flavors from around the world.
        Together, we inspire creativity and bring people closer through the joy of cooking and sharing.
        </p>
        <div className="about-buttons-container">
          <a href="/about">
            <button className="secondary-button">About Us</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
