import React from "react";
import './header.css'

import SearchBar from "./SearchBar/SearchBar";
import FilterButtons from "./FilterButtons/FilterButtons";


export default function Header(){

  return(

    <header className = "header-container">
      <img className = "bonsai-img" src= "/bonsai.png" alt="bonsai logo" />
      <h1>KudoBoard</h1>
      <SearchBar/>
      <FilterButtons/>
    </header>


  )




}