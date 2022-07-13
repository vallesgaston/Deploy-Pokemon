const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');'
const axios = require("axios");
const { Type, Pokemon } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getPokeApi = async () => {
  const apiURL = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
  );
  const totalReq = await apiURL.data.results.map(async (el) => {
    const PokeURL = (await axios.get(el.url)).data;
    return {
      img: PokeURL.sprites.other.dream_world.front_default,
      name: el.name,
      id: PokeURL.id,
      type: PokeURL.types[0].type.name,
      hp: PokeURL.stats[0].base_stat,
      attack: PokeURL.stats[1].base_stat,
      defense: PokeURL.stats[2].base_stat,
      speed: PokeURL.stats[5].base_stat,
      height: PokeURL.height,
      weight: PokeURL.weight,
    };
  });
  const MainInfoPoke = await Promise.all(totalReq);
  return MainInfoPoke;
};

const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllPokemons = async () => {
  const apiInfo = await getPokeApi();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;
  let pokemonsTotal = await getAllPokemons();
  if (name) {
    let pokemonName = await pokemonsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    pokemonName.length
      ? res.status(200).send(pokemonName)
      : res.status(404).send("No esta el personaje, Sorry");
  } else {
    res.status(200).send(pokemonsTotal);
  }
});

router.get("/types", async (req, res) => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  const types = typesApi.data.results.map((e) => e.name);
  types.forEach((e) => {
    Type.findOrCreate({
      where: { name: e },
    });
  });
  const allTypes = await Type.findAll();
  res.send(allTypes);
});

router.post("/pokemons", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, type, img } =
    req.body;

  let pokeCreate = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
  });

  let typeDB = await Type.findAll({
    where: { name: type },
  });
  pokeCreate.addType(typeDB);
  res.send("Personaje creado con exito");
});

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  let Poketotals = await getAllPokemons();

  if (id) {
    let pokeId = await Poketotals.filter((e) => e.id == id);
    console.log(Poketotals);
    pokeId
      ? res.status(200).json(pokeId)
      : res.status(404).send("No se encontró un pokémon con ese ID.");
  }
});

module.exports = router;
