import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearState, getNamePokemons } from "../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(getNamePokemons(name));
      dispatch(clearState());
    }
    if (!name.length) {
      alert("Write Pokemon!");
    }
  }

  return (
    <div className="style">
      <input
        className="input1"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="buttonbuscar"
      >
        <img
          width="60px"
          height="60px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png"
          alt="pokeball"
        />
      </button>
    </div>
  );
}
