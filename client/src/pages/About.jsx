import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-us">
      <div className="about-hero">
        <h1>About Us</h1>
        <p>
          Welcome to our recipe-sharing community, where every dish tells a
          story!
        </p>
      </div>

      {/* About Content Section */}
      <section className="about-content">
        <h2>Our Story</h2>
        <p>
        Our journey began with a simple yet powerful vision: to unite people through their shared passion for cooking and recipe sharing.
        Whether you’re a seasoned professional chef or a passionate home cook, we believe that every individual has a unique recipe worth sharing with the world
        </p>

        <h2>Join Us</h2>
        <p>
          Become a part of our growing community of food enthusiasts. Share
          your recipes, explore new cuisines, and connect with others who
          share your passion for food.
        </p>
      </section>

      
    </div>
  );
}
