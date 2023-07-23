import { React } from "react";
import { motion } from "framer-motion";
import "./css/foodIcon.css";

const FoodIcon = ({ foodLink }) => {
  return (
    <div className="foodIcon-container">
      <motion.img drag src={foodLink} alt="" />
    </div>
  );
};
export default FoodIcon;
