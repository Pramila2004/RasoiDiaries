import React, { useState } from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
  {
    image: ProfilePic,
    text: "Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.",
    name: "John Doe",
  },
  {
    image: ProfilePic,
    text: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    name: "Jane Smith",
  },
  {
    image: ProfilePic,
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    name: "Alex Johnson",
  },
  {
    image: ProfilePic,
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    name: "Emma Brown",
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
        <p className="primary-testsubheading">Testimonial</p>
        <h1 className="primary-testheading">What They Are Saying</h1>
        <p className="primary-testtext">
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
            <img src={testimonials[currentIndex].image} alt="profile" />
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
