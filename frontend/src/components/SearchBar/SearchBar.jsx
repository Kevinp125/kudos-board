import React from "react";
import "./searchbar.css";
import { useState } from "react";

export default function SearchBar({handleSearch, handleClear}) {
  const [searchInput, setSearchInput] = useState("");

  //function updates input field everytime user types something
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  //when user hits enter key or clicks the submit button this function will fire which executes the search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchInput);
    }
  }

  //handle the submitBtnClick by calling the same handle Search function and passing it same input
  const handleSubmitClick = () => {
    handleSearch(searchInput);
  }

  const handleClearClick = () => {
    setSearchInput(''); //just make this blank so visually it clears for user
    handleClear('');//call handleClear function which executes in App.jsx where all the MovieList data is
  }

  return (
    <div className="search-and-btns-container">
      <input
        className="search-bar"
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown = {handleKeyDown}
        placeholder="Search..."
      />
      <button onClick = {handleSubmitClick}>Submit</button>
      <button onClick = {handleClearClick}>Clear</button>
    </div>
  );
}
