import React from "react";
import Recipe from "./recipe.jsx";
import { motion } from "framer-motion";
import Loading from "../loadingIcon/loading.jsx";
import { useDatabase } from "../../context/dbContext.js";
import Error from "../error/error.jsx";

const RecipeList = ({ recipes, isLoadingRecipes }) => {
  const { errorGettingRecipes } = useDatabase();

  let emptyCells = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];

  return (
    <div className="recipeList-container">
      {errorGettingRecipes ? (
        <Error errMsg={"Daily search limit for recipes has been reached"} />
      ) : !isLoadingRecipes && recipes ? (
        recipes.results.map((recipe, i) => (
          <Recipe recipeInfo={recipe} key={i} animatedDelay={i} />
        ))
      ) : (
        emptyCells.map((i) => (
          <motion.div
            className="empty-recipe-container recipe-container"
            animate={{
              transform: "scale(1)",
              transition: {
                type: "spring",
                stiffness: 50,
                delay: i * 0.1,
              },
            }}
            key={i}
          >
            <Loading />
          </motion.div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
