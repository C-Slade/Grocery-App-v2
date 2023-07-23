import { React } from "react";
import { Link } from "react-router-dom";
import groceryList from "../../images/shopping.png";
import recipes from "../../images/recipe.png";
import { motion } from "framer-motion";
import "./css/home.css";

const varientItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Home = () => {
  return (
    <>
      <motion.div
        className="home-links-container"
        initial={{
          opacity: 0,
          x: -window.innerWidth,
          position: "absolute",
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: window.innerWidth,
          position: "absolute",
          top: "30%",
        }}
        transition={{
          type: "spring",
          ease: "linear",
          duration: 3,
          x: { duration: 1 },
        }}
      >
        <motion.div className="animated-link-container" variants={varientItem}>
          <Link to="/grocery">
            <div className="home-img-container">
              <img src={groceryList} alt="" />
              <h1>Grocery List</h1>
            </div>
          </Link>
        </motion.div>
        <motion.div className="animated-link-container" variants={varientItem}>
          <Link to="/recipes">
            <div className="home-img-container">
              <img src={recipes} alt="" />
              <h1>Recipes</h1>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
