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
          We started with a simple idea: to bring people together through
          their love of cooking and sharing recipes. Whether you’re a
          professional chef or a home cook, we believe everyone has a recipe
          worth sharing.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>A platform to share your favorite recipes.</li>
          <li>A collection of delicious recipes from around the world.</li>
          <li>Tips and tricks to enhance your culinary skills.</li>
        </ul>

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
