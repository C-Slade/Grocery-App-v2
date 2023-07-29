import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PiSmileySadLight } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./css/savedRecipes.css";

const SavedRecipes = () => {
  const [localRecipes, setLocalRecipes] = useState([]);
  const getSavedRecipes = () => {
    if (localStorage.getItem("saved-recipes")) {
      const data = localStorage.getItem("saved-recipes");
      const parsedData = JSON.parse(data);
      setLocalRecipes(parsedData);
    }
  };

  useEffect(() => {
    getSavedRecipes();
  }, []);
  return (
    <>
      <motion.div
        className="card-container saved-recipes-container"
        initial={{ opacity: 0, x: -window.innerWidth, position: "relative" }}
        animate={{ opacity: 1, x: 0, position: "relative" }}
        exit={{
          position: "absolute",
          opacity: 0,
          x: window.innerWidth,
        }}
        transition={{
          type: "spring",
        }}
      >
        {localRecipes.length > 0 ? <h1>Saved Recipes</h1> : null}
        {localRecipes.length > 0 ? (
          localRecipes.map((recipe, i) => (
            <div className="saved-recipes-link-container" key={i}>
              <h2>{recipe.name}</h2>
              <Link to={`/recipes/${recipe.id}`}>
                see recipe <AiOutlineArrowRight />
              </Link>
            </div>
          ))
        ) : (
          <div className="saved-recipes-info-container">
            <PiSmileySadLight />
            <h3>Looks like you have no saved recipes</h3>
            <Link to="/recipes">
              Search for delicious recipes
              <AiOutlineArrowRight />
            </Link>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default SavedRecipes;
