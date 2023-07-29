import { React, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useDatabase } from "../../context/dbContext";

const Search = ({ toggleLoadingRecipes }) => {
  const { searchRecipes } = useDatabase();
  const searchRef = useRef();

  const searchForRecipes = (e) => {
    e.preventDefault();
    toggleLoadingRecipes(true);
    searchRecipes(searchRef.current.value);
  };

  return (
    <div className="search-container">
      <form onSubmit={(e) => searchForRecipes(e)}>
        <input type="text" ref={searchRef} />
        <CiSearch onClick={(e) => searchForRecipes(e)} />
      </form>
    </div>
  );
};

export default Search;
