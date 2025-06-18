import React from "react";

import "./filterbuttons.css";

export default function FilterButtons({handleFilter}) {

  
  return (
    <aside className="filterbtn-aside">
      <button onClick = {() => {handleFilter('all')}}>All</button>
      <button onClick = {() => {handleFilter('recent')}}>Recent</button>
      <button onClick = {() => {handleFilter('celebration')}}>Celebration</button>
      <button onClick = {() => {handleFilter('thank you')}}>Thank You</button>
      <button onClick = {() => {handleFilter('inspiration')}}>Inspiration</button>
    </aside>
  );
}
