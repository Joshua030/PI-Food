import "./App.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Nav } from "./components/Nav";
import { CreateRecipe } from "./Pages/CreateRecipe";
import { Recipe } from "./Pages/Recipe";
import { SearchRecipe } from "./Pages/SearchRecipe";
import { DetailRecipe } from "./Pages/DetailRecipe";


const App = () => {
  let location = useLocation();
  console.log(location)
  return (
    <>
      {location.pathname ==='/search' && <Nav />}
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchRecipe} />
          <Route exact path="/recipes" component={Recipe} />
          <Route exact path="/recipes/:recipeId" component={DetailRecipe} />
          <Route exact path="/recipe/create" component={CreateRecipe} />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};

export default App;
