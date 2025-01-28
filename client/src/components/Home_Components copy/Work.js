import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Share Recipes",
      text: "Users can upload and share their unique recipes, complete with step-by-step instructions and tips",
    },
    {
      image: ChooseMeals,
      title: "Engage",
      text: "Members can comment, rate, and save recipes, fostering a community of shared culinary passion",
    },
    {
      image: DeliveryMeals,
      title: "Discover",
      text: "Discover recipes based on ingredients, cuisine, or dietary preferences, making it easy to find the perfect dish",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-wksubheading">Work</p>
        <div className="primary-wkheading">How It Works</div>
        <div className="primary-wktext">
        Upload, share, and explore a wide variety of recipes from diverse cuisines.
        Connect with fellow food enthusiasts, exchange ideas, and inspire creativity.
        Find recipes tailored to your preferences and discover new flavors to try.
        </div>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
