import "./App.css";
import Signup from "./Components/SignUp";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import AddItems from "./Components/AddItems";
import Nav from "./Components/Nav";
import ItemList from "./Components/ItemList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/additems" component={AddItems} />
          <Route path='/list' component={ItemList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
