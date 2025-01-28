import React, { useState } from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";


const testimonials = [
  {
    image: 'images/khushi.jpg',
    text: "I have always loved cooking but never knew where to start with new recipes. This platform changed everything! The step-by-step guides are easy to follow, and now my family thinks I am a professional chef. I even uploaded my own recipe last week, and seeing the likes and comments was so rewarding!",
    name: "Khushi Bairagi",
  },
  {
    image: 'images/sakshi.jpg',
    text: "Time is always tight, and meal planning feels overwhelming. This platform has been a lifesaver. The quick and healthy recipes section is my go-to, and I love the option to filter by name and cuisine.A total game changer!",
    name: "Sakshi Chavan",
  },
  {
    image: 'images/aditi.jpeg',
    text: "I love exploring different cuisines, and this platform has introduced me to recipes I would have never tried otherwise. From authentic Thai curries to French pastries, every recipe is detailed and foolproof. Plus, the community feedback helps tweak recipes to perfection!",
    name: "Aditi Patil",
  },
  {
    image: 'images/pramila.jpg',
    text: "Finding delicious recipes that align with my dietary goals used to be a challenge, but not anymore! This platform has a treasure trove of healthy options, and the calorie/nutrition breakdowns are a huge bonus. It feels amazing to enjoy guilt-free meals without compromising on taste!",
    name: "Pramila Kolhe",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    };

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Here are some testimonials of our website. These can help convey a
          sense of trust, community, and satisfaction among your users.
        </p>
      </div>
      <div className="test">
              <button onClick={handlePrev} className="testimonial-arrow">
                <FiArrowLeft />
              </button>
              <div className="testimonial-section-bottom">
                <div className="testimonial-content">
                  <img className="pic" src={testimonials[currentIndex].image} alt="profile" />
                  <p>{testimonials[currentIndex].text}</p>
                  <div className="testimonials-stars-container">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </div>
                  <h2>{testimonials[currentIndex].name}</h2>
                </div>
              </div>
              <button onClick={handleNext} className="testimonial-arrow">
                <FiArrowRight />
              </button>
            </div>
    </div>
  );
};

export default Testimonial;
