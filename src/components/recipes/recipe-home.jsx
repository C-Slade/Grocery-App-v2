import React, { useEffect, useState } from "react";
import { useDatabase } from "../../context/dbContext";
import RecipeList from "./recipeList";
import SearchRecipe from "./searchRecipe.jsx";
import { motion } from "framer-motion";
import "./css/recipe.css";

const RecipeHome = () => {
  const { recipes } = useDatabase();
  const [isLoadingRecipes, toggleLoadingRecipes] = useState(false);

  useEffect(() => {
    if (!recipes) {
      toggleLoadingRecipes(true);
    } else {
      toggleLoadingRecipes(false);
    }
  }, [recipes]);

  return (
    <>
      <motion.div
        className="recipes-container"
        exit={{
          position: "absolute",
          x: window.innerWidth,
          opacity: 0,
          top: 0,
        }}
        // styles to remove display grid to a list of recipes that have a total amount under 5
        style={
          recipes && recipes.results.length < 5
            ? { display: "block", width: "100%" }
            : null
        }
      >
        <SearchRecipe toggleLoadingRecipes={toggleLoadingRecipes} />
        <RecipeList recipes={recipes} isLoadingRecipes={isLoadingRecipes} />
      </motion.div>
    </>
  );
};

export default RecipeHome;
