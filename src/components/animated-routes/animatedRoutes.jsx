import { React } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../home/home.jsx";
import Login from "../login/login.jsx";
import ForgotPass from "../login/forgot-pass.jsx";
import Register from "../login/register.jsx";
import Recipe from "../recipes/recipe.jsx";
import { AnimatePresence } from "framer-motion";

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
            exact
            path="/recipe"
            element={<Recipe scrollIntoView={scrollIntoView} />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
