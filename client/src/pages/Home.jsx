import React from "react";
import "../styles/Home.css";
import Home from "../components/Home_Components/Home";
import About from "../components/Home_Components/About";
import Work from "../components/Home_Components/Work";
import Testimonial from "../components/Home_Components/Testimonial";
import Contact from "../components/Home_Components/Contact";
import Footer from "../components/Home_Components/Footer";


const Home1 = () => {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home1;
