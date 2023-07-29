import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Recipe = ({ recipeInfo, animatedDelay }) => {
  return (
    <motion.div
      className="recipe-container"
      animate={{
        transform: "scale(1)",
        transition: {
          type: "spring",
          stiffness: 50,
          delay: animatedDelay * 0.1,
        },
      }}
      style={{ backgroundImage: `url(${recipeInfo.image})` }}
    >
      <Link to={`/recipes/${recipeInfo.id}`} className="info-container">
        <h4>{recipeInfo.title}</h4>
      </Link>
    </motion.div>
  );
};

export default Recipe;
