import { CLEAN_STATE, GET_POKEMONS } from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "A-Z"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };

    case "ORDER_BY_ATTACK":
      let sortedAtt =
        action.payload === "Asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        pokemons: sortedAtt,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "CLEAR_STATE":
      return {
        ...state,
        detail: [],
        pokemons: [],
      };

    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.type === action.payload);
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "POST_TYPES":
      return {
        ...state,
      };
    case "FILTER_CREATED":
      const allPokemon = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemon.filter((el) => el.createdInDb)
          : allPokemon.filter((el) => !el.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };
    case "GET_DETAILS":
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
