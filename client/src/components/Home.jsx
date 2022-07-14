import React from "react";
import { useState, useEffect } from "react";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  filterPokemonsByType,
  filterCreated,
  orderByName,
  orderByAttack,
  clearState,
} from "../actions";
import { Link } from "react-router-dom";
import { CardPoke } from "./CardPoke";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getAllPokemons());
    return () => {
      dispatch(clearState());
    };
  }, []);

  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(e.target.innerHTML - 1);
  }
  console.log(allPokemons);

  function handleClickear(e) {
    dispatch(getAllPokemons());
  }

  function handleClick2(e) {
    e.preventDefault();
    if (
      e.target.innerHTML === "Next" &&
      currentPage < [...Array(Math.ceil(allPokemons.length / 12))].length - 1
    ) {
      setCurrentPage(currentPage + 1);
    } else if (e.target.innerHTML === "Previous" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "A-Z" || e.target.value === "Z-A") {
      dispatch(orderByName(e.target.value));
    } else {
      dispatch(orderByAttack(e.target.value));
    }
    setCurrentPage(0);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div className="imagenhome">
      {allPokemons.length > 0 ? (
        <div>
          <div className="nav">
            <Link style={{ textDecoration: "none" }} to="/createpoke">
              <button className="buttonhome">Create Pokemon!!</button>
            </Link>
            <SearchBar />
            <button
              className="buttonhome2"
              onClick={(e) => {
                handleClickear(e);
              }}
            >
              Reload Pokemons!!
            </button>
          </div>
          <div className="select">
            <select className="stylehome" onChange={(e) => handleSort(e)}>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
            <select
              className="stylehome"
              onChange={(e) => handleSort(e)}
              defaultValue="Filter By Attack"
            >
              <option>Filter by Attack</option>
              <option value="Asc">Less attack</option>
              <option value="Desc">More attack</option>
            </select>
            <select className="stylehome" onChange={(e) => handleFilterType(e)}>
              <option value="All">Sort by Type</option>
              <option value="fighting">Fighting</option>
              <option value="water">Water</option>
              <option value="ice">Ice</option>
              <option value="normal">Normal</option>
              <option value="poison">Poison</option>
              <option value="bug">Bug</option>
              <option value="fire">Fire</option>
              <option value="grass">Grass</option>
              <option value="dragon">Dragon</option>
              <option value="flying">Flying</option>
              <option value="ghost">Ghost</option>
              <option value="electric">Electric</option>
              <option value="ground">Ground</option>
              <option value="steel">Steel</option>
              <option value="psychic">Psychic</option>
              <option value="dark">Dark</option>
              <option value="rock">Rock</option>
            </select>
            <select
              className="stylehome"
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="All">All</option>
              <option value="created">Created</option>
              <option value="api">From Api</option>
            </select>
          </div>

          <ul>
            <button onClick={handleClick2}>Previous</button>
            {allPokemons.length
              ? [...Array(Math.ceil(allPokemons.length / 12))].map((e, i) => (
                  <button onClick={handleClick}>{i + 1}</button>
                ))
              : console.log("no hay pokemones")}
            <button onClick={handleClick2}>Next</button>
          </ul>
          <div className="cards">
            {allPokemons?.map((e, i) => {
              if (i >= 12 * currentPage && i <= 12 * currentPage + 11) {
                return (
                  <fragment>
                    <Link to={"/home/" + e.id}>
                      <CardPoke
                        name={e.name}
                        img={e.img}
                        type={e.type}
                        id={e.id}
                      />
                    </Link>
                  </fragment>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
          <img
            className="imgloading"
            src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif"
          />
        </div>
      )}
    </div>
  );
}
