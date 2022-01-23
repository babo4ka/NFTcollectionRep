import MinterPage  from './MinterPage';
import Rebuses from './components/Rebuses';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (

    <Router>
      <div>
      <Switch>

        <Route exact path="/">
          <MinterPage></MinterPage>
        </Route>

        <Route exact path="/rebuses">
          <Rebuses></Rebuses>
        </Route>
        
      </Switch>
      </div>
    </Router>

  );
}

export default App;