import React from "react";
import "./searchbar.css";
import { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  //function updates input field everytime user types something
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="search-and-btns-container">
      <input
        className="search-bar"
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button>Submit</button>
      <button>Clear</button>
    </div>
  );
}
