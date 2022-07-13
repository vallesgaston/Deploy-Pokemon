import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./CreatePoke.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is Required";
  }
  if (!input.hp) {
    errors.hp = "Your hp must be Completed";
  }
  if (input.attack < 1 || input.attack > 99) {
    errors.attack = "No puede ser menor a 1";
  }
  if (input.defense < 1 || input.defense > 99) {
    errors.defense = "No puede ser menor a 1";
  }
  if (input.speed < 1 || input.speed > 99) {
    errors.speed = "No puede ser menor a 1";
  }
  if (input.heigth < 1 || input.height > 99) {
    errors.height = "No puede ser menor a 1";
  }
  if (input.weight < 1 || input.weight > 99) {
    errors.weight = "No puede ser menor a 1";
  }
  if (input.img === "") {
    errors.img = "Debe cargar una imagen";
  }

  return errors;
}

export default function CreatePoke() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert("Pokemon Creado!!");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      type: [],
    });
    history.push("/home");
  }

  return (
    <div className="maincreate">
      <div className="right">
        <Link style={{ textDecoration: "none" }} to="/home">
          <button className="buttoncreate">Home</button>
        </Link>
        <h1 className="createtitulo">Create your Pokemon!!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div className="inputs">
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              {errors.name && <p className="error">{errors.name}</p>}
              <div>
                <label>Hp:</label>
                <input
                  type="number"
                  value={input.hp}
                  name="hp"
                  onChange={handleChange}
                />
                {errors.hp && <p className="error">{errors.hp}</p>}
              </div>
              <div>
                <label>Attack:</label>
                <input
                  type="number"
                  value={input.attack}
                  name="attack"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Defense:</label>
                <input
                  type="number"
                  value={input.defense}
                  name="defense"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Speed:</label>
                <input
                  type="number"
                  value={input.speed}
                  name="speed"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Height:</label>
                <input
                  type="number"
                  value={input.height}
                  name="height"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Weight:</label>
                <input
                  type="number"
                  value={input.weight}
                  name="weight"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Image:</label>
                <input
                  type="text"
                  value={input.img}
                  name="img"
                  onChange={handleChange}
                />
              </div>
            </div>
            <select onChange={(e) => handleSelect(e)}>
              {types.map((occ) => (
                <option value={occ.name}>{occ.name}</option>
              ))}
            </select>
            <button
              disabled={
                Object.values(errors).length > 0 || input.type.length === 0
              }
              onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              Create Pokemon!
            </button>
            {/* <button onChange={(e) => handleDelete(e)}>x</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
