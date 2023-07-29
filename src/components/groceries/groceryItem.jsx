import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import { useDatabase } from "../../context/dbContext";

const GroceryItem = ({ dbKey, name }) => {
  const [liEleState, setLiState] = useState("open");
  const { deleteGroceryItem } = useDatabase();

  const liRef = useRef();

  async function submitDelete() {
    try {
      await deleteGroceryItem(dbKey);
    } catch (error) {
      console.log(error);
    }
  }

  const variants = {
    open: {
      x: 0,
      opacity: 1,
    },
    delete: {
      x: "425px",
      opacity: 0,
      transition: {
        x: { stiffness: 2000, velocity: -100 },
      },
      position: "absolute",
      top: liRef.current ? `${liRef.current.offsetTop}px` : 0,
    },
    cancel: {
      x: "-200px",
      opacity: 0,
      transition: {
        x: { stiffness: 2000, velocity: -100 },
      },
    },
  };

  return (
    <>
      <motion.li
        variants={variants}
        animate={
          liEleState === "delete"
            ? "delete"
            : liEleState === "open"
            ? "open"
            : "cancel"
        }
        transition={{
          type: "spring",
          ease: "linear",
        }}
        ref={liRef}
      >
        <div className="grocery-name-conatiner">
          <GrFormClose
            onClick={() => {
              setLiState("cancel");
              setTimeout(() => submitDelete(), 200);
            }}
          />
          <h2>{name}</h2>
        </div>
        <button
          onClick={() => {
            setLiState("delete");
            setTimeout(() => submitDelete(), 200);
          }}
          className="purchase"
        >
          Purchase
        </button>
      </motion.li>
    </>
  );
};

export default GroceryItem;
