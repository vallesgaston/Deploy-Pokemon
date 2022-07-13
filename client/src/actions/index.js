import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const CLEAN_STATE = "CLEAN_STATE";

export function getAllPokemons() {
  return async function (dispatch) {
    var json = await axios.get("/pokemons");
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons?name=" + name);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      alert("Pokemon no Econtrado");
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    var info = await axios("/types", {});
    return dispatch({ type: "GET_TYPES", payload: info.data });
  };
}

export function clearState() {
  return {
    type: "CLEAR_STATE",
  };
}
export function clearHome() {
  return {
    type: "CLEAR_HOME",
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post("/pokemons", payload);
    console.log(response);
    return response;
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function getDetail(id) {
  try {
    return async function (dispatch) {
      var json = await axios.get("/pokemons/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}
