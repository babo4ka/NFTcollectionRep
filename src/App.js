import MinterPage  from './MinterPage';
import RebusesPage from './RebusesPage';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AdvertismentForm from './AdvertismentForm';


function App() {
  return (

    <Router>
      <div>
      <Switch>

        <Route exact path="/">
          <MinterPage></MinterPage>
        </Route>

        <Route exact path="/rebuses">
          <RebusesPage></RebusesPage>
        </Route>

        <Route exact path="/adsorder">
          <AdvertismentForm></AdvertismentForm>
        </Route>
        
      </Switch>
      </div>
    </Router>

  );
}

export default App;