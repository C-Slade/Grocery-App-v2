import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useDatabase } from "../../context/dbContext";

const AddGroceryItem = ({ modal, isModalOpen, scrollIntoView }) => {
  const groceryItemRef = useRef();

  const { addGroceryItem } = useDatabase();

  async function addGroceryItemToDatabase() {
    try {
      await addGroceryItem({ name: groceryItemRef.current.value });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          addGroceryItemToDatabase();
          modal(false);
          groceryItemRef.current.value = "";
        }}
        animate={
          isModalOpen
            ? { opacity: 1, transform: "scale(1)" }
            : { opacity: 0, transform: "scale(0)", position: "absolute" }
        }
        transition={{
          type: "spring",
          ease: "linear",
        }}
        className="add-grocery-modal"
      >
        <input type="text" ref={groceryItemRef} onBlur={scrollIntoView} />
        <div className="add-cancel-container">
          <button
            type="submit"
            className="add"
            onClick={(e) => {
              e.preventDefault();
              modal(false);
              addGroceryItemToDatabase();
              groceryItemRef.current.value = "";
            }}
          >
            Add
          </button>
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              modal(false);
              groceryItemRef.current.value = "";
            }}
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </>
  );
};

export default AddGroceryItem;
