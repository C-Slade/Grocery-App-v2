import { React } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../home/home.jsx";
import Login from "../login/login.jsx";
import ForgotPass from "../login/forgot-pass.jsx";
import Register from "../login/register.jsx";
import Recipes from "../recipes/recipe-home.jsx";
import Groceries from "../groceries/grocery-home.jsx";
import RecipeRoute from "../recipes/recipeRoute.jsx";
import { AnimatePresence } from "framer-motion";
import SavedRecipes from "../saved-recipes/saved-recipes.jsx";

const AnimatedRoutes = () => {
  const location = useLocation();

  // used to position the phones view to the top of the page when the user has unfocused an input to prevent screen cut-off

  const scrollIntoView = () => {
    const body = document.querySelector("#root");
    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  };

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            exact
            path="/"
            element={<Home scrollIntoView={scrollIntoView} />}
          />
          <Route
            exact
            path="/login"
            element={<Login scrollIntoView={scrollIntoView} />}
          />
          <Route
            exact
            path="/forgotPass"
            element={<ForgotPass scrollIntoView={scrollIntoView} />}
          />
          <Route
            exact
            path="/register"
            element={<Register scrollIntoView={scrollIntoView} />}
          />
          <Route
            path="/recipes/:id"
            element={<RecipeRoute scrollIntoView={scrollIntoView} />}
          />
          <Route
            exact
            path="/recipes"
            element={<Recipes scrollIntoView={scrollIntoView} />}
          />
          <Route
            exact
            path="/saved-recipes"
            element={<SavedRecipes scrollIntoView={scrollIntoView} />}
          />
          <Route
            exact
            path="/grocery"
            element={<Groceries scrollIntoView={scrollIntoView} />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
