import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getDetail } from "../actions";
import { useEffect } from "react";
import "./PokeDetail.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div className="conteiner">
      <div>
        <Link style={{ textDecoration: "none" }} to="/home">
          <button className="home">Home</button>
        </Link>
      </div>
      <div className="detail">
        {myPokemon.length ? (
          <div className="detail1">
            <h1>{myPokemon[0].name}</h1>
            <img
              className="imgdetail"
              src={myPokemon[0].img ? myPokemon[0].img : myPokemon[0].img}
            />
            <div className="stats_container">
              <div className="stats">
                <h4>Id: {myPokemon[0].id}</h4>
                <h4>Hp: {myPokemon[0].hp}</h4>
                <h4>Attack: {myPokemon[0].attack}</h4>
                <h4>Defense: {myPokemon[0].defense}</h4>
                <h4>
                  Tipo:{" "}
                  {myPokemon[0].createdInDb
                    ? myPokemon[0].types[0].name
                    : myPokemon[0].type}
                </h4>
              </div>
              <div className="stats">
                <h4>Speed: {myPokemon[0].speed}</h4>
                <h4>Height: {myPokemon[0].height}</h4>
                <h4>Weight: {myPokemon[0].weight}</h4>
              </div>
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
    </div>
  );
}
