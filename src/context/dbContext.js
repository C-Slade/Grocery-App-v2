import React, { useContext, useState, useEffect } from "react";
import { ref, set, push, remove } from "firebase/database";
import { snapshotData, auth } from "../firebase.js";

const DBcontext = React.createContext();

export const useDatabase = () => {
  return useContext(DBcontext);
};

export const DataBaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [recipes, setRecipes] = useState();
  const [errorGettingRecipes, setErrorRecipes] = useState(false);

  const getTodaysRecipes = async () => {
    const recipes = {};
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=20`
      );

      if (api.ok === false) {
        throw new Error("Daily recipe search limit has been reached");
      }
      const data = await api.json();

      // reformat data to be consistent throughout app
      recipes.results = data.recipes;
      setRecipes(recipes);
    } catch (error) {
      setErrorRecipes(error);
      console.log(error);
    }
  };

  const searchRecipe = async (id) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`
      );
      return await api.json();
    } catch (error) {
      return error;
    }
  };

  const searchRecipes = async (meal) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=20&query=${meal}`
      );
      const data = await api.json();
      setRecipes(data);
    } catch (error) {
      return error;
    }
  };

  const deleteGroceryItem = (groceryItemId) => {
    const docRef = ref(
      snapshotData,
      "users/" + currentUser.uid + "/groceryList/" + groceryItemId
    );
    return remove(docRef);
  };

  const addGroceryItem = (groceryItem) => {
    const groceryListRef = ref(
      snapshotData,
      "users/" + currentUser.uid + "/groceryList"
    );
    const newGroceryListRef = push(groceryListRef);
    return set(newGroceryListRef, groceryItem);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getTodaysRecipes();
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    deleteGroceryItem,
    addGroceryItem,
    currentUser,
    recipes,
    searchRecipe,
    searchRecipes,
    errorGettingRecipes,
  };

  return <DBcontext.Provider value={value}>{children}</DBcontext.Provider>;
};
