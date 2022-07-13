import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokeDetail from "./components/PokeDetail";
import CreatePoke from "./components/CreatePoke";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/pokemons/:id/" component={PokeDetail} />
          <Route path="/createpoke" component={CreatePoke} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
