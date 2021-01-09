import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Signup, Contact } from "./index";

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/signup" exact component={() => <Signup />} />
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
