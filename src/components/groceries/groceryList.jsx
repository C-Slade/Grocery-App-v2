import { React, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GroceryItem from "./groceryItem";
import { useDatabase } from "../../context/dbContext.js";
import { ref, onValue } from "firebase/database";
import { snapshotData } from "../../firebase.js";
import AddGroceryItem from "./addGroceryItem.jsx";
import { v4 as uuidv4 } from "uuid";
import Loading from "../loadingIcon/loading";

const GroceryList = ({ scrollIntoView }) => {
  const [usersSnapshotData, setSnapData] = useState();
  const { currentUser } = useDatabase();
  const [addGroceryItemModal, setGroceryModal] = useState();
  const ulRef = useRef();

  function startRealTimeData(userData) {
    if (userData) {
      const groceryListRef = ref(
        snapshotData,
        "users/" + userData.uid + "/groceryList"
      );
      onValue(groceryListRef, (snapshot) => {
        const data = snapshot.val();
        const arrayOfData = [];

        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const groceryItem = data[key];
            groceryItem.key = key;
            arrayOfData.push(groceryItem);
          }
        }
        setSnapData(arrayOfData);
      });
    }
  }

  useEffect(() => {
    if (currentUser) startRealTimeData(currentUser);
  }, []);

  return (
    <>
      <motion.ul
        className="groceryList"
        initial={{ opacity: 0, transform: "scale(0)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{
          type: "spring",
          ease: "linear",
        }}
        ref={ulRef}
      >
        {usersSnapshotData ? (
          usersSnapshotData.map((item, i) => (
            <GroceryItem dbKey={item.key} name={item.name} key={uuidv4()} />
          ))
        ) : (
          <div className="loading-groceries-icon-container">
            <Loading />
          </div>
        )}
        {usersSnapshotData ? (
          <div className="grocery-options-container">
            <AddGroceryItem
              modal={setGroceryModal}
              isModalOpen={addGroceryItemModal}
              scrollIntoView={scrollIntoView}
            />
            <motion.button
              transition={{
                type: "spring",
                ease: "linear",
              }}
              animate={
                addGroceryItemModal
                  ? { opacity: 0, transform: "scale(0)", position: "absolute" }
                  : { opacity: 1, transform: "scale(1)" }
              }
              className="add-grocery-item"
              onClick={() => setGroceryModal(true)}
            >
              Add Item
            </motion.button>
          </div>
        ) : null}
      </motion.ul>
    </>
  );
};

export default GroceryList;
