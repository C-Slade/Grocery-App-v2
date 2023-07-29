import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDatabase } from "../../context/dbContext";
import Loading from "../loadingIcon/loading";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import Error from "../error/error";

const RecipeRoute = () => {
  const { searchRecipe } = useDatabase();
  const { id } = useParams();
  const [favRecipe, setFavRecipe] = useState();

  const [recipeInfo, setRecipeInfo] = useState();
  const [error, setError] = useState();
  const [errMsg, setErrorMsg] = useState();

  const getRecipe = async () => {
    try {
      const data = await searchRecipe(id);
      if (data.status === "failure") {
        throw new Error(data);
      }
      setRecipeInfo(data);
      getStarStyles();
    } catch (error) {
      setError(true);
      setErrorMsg("You have reached your daily search limit for recipes");
    }
  };

  const getStarStyles = () => {
    if (localStorage.getItem("saved-recipes")) {
      const currentlySaved = localStorage.getItem("saved-recipes");
      const parsedData = JSON.parse(currentlySaved);

      for (let i = 0; i < parsedData.length; i++) {
        if (id === parsedData[i].id) setFavRecipe(true);
      }
    }
  };

  const saveRecipe = () => {
    setFavRecipe(true);
    if (localStorage.getItem("saved-recipes")) {
      const currentlySaved = localStorage.getItem("saved-recipes");
      const parsedData = JSON.parse(currentlySaved);
      const addedData = [...parsedData, { id: id, name: recipeInfo.title }];

      localStorage.setItem("saved-recipes", JSON.stringify(addedData));
    } else {
      localStorage.setItem(
        "saved-recipes",
        JSON.stringify([{ id: id, name: recipeInfo.title }])
      );
    }
  };

  const removeSavedRecipe = () => {
    const currentlySaved = localStorage.getItem("saved-recipes");
    const parsedData = JSON.parse(currentlySaved);
    const newData = parsedData.filter((recipe) => recipe.id !== id);

    setFavRecipe(false);
    localStorage.setItem("saved-recipes", JSON.stringify(newData));
  };

  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <motion.div
      className="recipe-route-container card-container"
      initial={{ opacity: 0, x: -window.innerWidth, position: "relative" }}
      animate={{ opacity: 1, x: 0, position: "relative" }}
      exit={{
        position: "absolute",
        opacity: 0,
        x: window.innerWidth,
      }}
      transition={{
        type: "spring",
        ease: "linear",
      }}
    >
      {recipeInfo ? (
        <>
          <div className="recipe-info-container">
            <section className="section-1-container">
              <div className="img-container">
                <img src={recipeInfo.image} alt="" />
              </div>
              <div className="ingredients-container">
                <h1>{recipeInfo.title}</h1>
                {favRecipe ? (
                  <AiFillStar
                    style={{ color: "#fac002" }}
                    onClick={() => removeSavedRecipe()}
                  />
                ) : (
                  <AiOutlineStar
                    className="save-recipe"
                    onClick={() => saveRecipe()}
                  />
                )}

                <h2>Ingredients:</h2>
                <ul>
                  {recipeInfo && recipeInfo.analyzedInstructions.length > 0 ? (
                    recipeInfo.extendedIngredients.map((ingred, i) => (
                      <li key={i}>{`${ingred.original}`}</li>
                    ))
                  ) : (
                    <Loading />
                  )}
                </ul>
              </div>
            </section>
            <section className="section-2-container">
              <h2>Instructions:</h2>
              <ul>
                {recipeInfo && recipeInfo.analyzedInstructions.length > 0 ? (
                  recipeInfo.analyzedInstructions[0].steps.map((step, i) => (
                    <li key={i}>{`${step.number}. ${step.step}`}</li>
                  ))
                ) : (
                  <Loading />
                )}
              </ul>
            </section>
          </div>
        </>
      ) : error ? (
        <Error errMsg={errMsg} />
      ) : (
        <Loading />
      )}
    </motion.div>
  );
};

export default RecipeRoute;
