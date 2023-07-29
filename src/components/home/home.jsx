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
          y: -window.innerHeight,
          position: "absolute",
        }}
        animate={{ opacity: 1, y: 0, zIndex: 5 }}
        exit={{
          opacity: 0,
          y: window.innerHeight,
          position: "absolute",
        }}
        transition={{
          type: "spring",
          ease: "linear",
        }}
      >
        <motion.div className="animated-link-container" variants={varientItem}>
          <Link to="/grocery">
            <div className="home-img-container">
              <img src={groceryList} alt="" />
              <h1>Groceries</h1>
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
