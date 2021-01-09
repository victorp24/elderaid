import logo from './logo.svg';
import './App.css';
//import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./index";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
