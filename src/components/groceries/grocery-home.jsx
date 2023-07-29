import { React } from "react";
import { motion } from "framer-motion";
import GroceryList from "./groceryList";
import "./css/grocery.css";

const Groceries = ({ scrollIntoView }) => {
  return (
    <>
      <motion.div
        className="card-container"
        id="grocery-container"
        initial={{ opacity: 0, x: -window.innerWidth, position: "relative" }}
        animate={{ opacity: 1, x: 0, position: "relative" }}
        exit={{
          position: "absolute",
          opacity: 0,
          x: window.innerWidth,
        }}
        transition={
          window.innerWidth > 1175
            ? {
                ease: "linear",
                type: "spring",
                duration: 1,
              }
            : { ease: "linear", duration: 0 }
        }
      >
        <GroceryList scrollIntoView={scrollIntoView} />
      </motion.div>
    </>
  );
};

export default Groceries;
