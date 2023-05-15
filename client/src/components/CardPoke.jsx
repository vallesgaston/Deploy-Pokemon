import React from "react";
import { Link } from "react-router-dom";
import "./CardPoke.css";

export function CardPoke({ img, name, type, id }) {
  const upperName = name.charAt(0).toUpperCase() + name.slice(1);
  let upperTypes = [];

  return (
    <div className="card">
      <h3>{upperName}</h3>
      <img src={img} alt="Img not found" className="card_img" />
      <h5>{type}</h5>
      <Link to={`/pokemons/${id}`}>
        <button className="card_button">Specific info</button>
      </Link>
    </div>
  );
}
