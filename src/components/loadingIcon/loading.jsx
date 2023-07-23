import { React } from "react";
import { motion } from "framer-motion";
import links from "../../links";
import "./css/loading.css";

const Loading = () => {
  const getRandomFoodIcon = () => {
    return links.food[Math.floor(Math.random() * links.food.length)];
  };
  return (
    <motion.div
      className="loading"
      animate={{ rotate: 360 }}
      transition={{
        ease: "linear",
        repeat: Infinity,
        duration: 1,
      }}
    >
      <img src={getRandomFoodIcon()} alt="" />
    </motion.div>
  );
};
export default Loading;
