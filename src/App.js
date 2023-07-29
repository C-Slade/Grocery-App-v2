import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foodLinks from "./links.js";
import FoodIcon from "./components/food-icons/foodIcon.jsx";
import { useAuth } from "./context/authContext.js";
import Menu from "./components/menu/menu.jsx";
import "./main-css/main.css";
import AnimatedRoutes from "./components/animated-routes/animatedRoutes.jsx";

const App = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Menu />
      {foodLinks.food.map((food, i) => (
        <FoodIcon foodLink={food} key={i} />
      ))}
      <AnimatedRoutes />
    </>
  );
};

export default App;
