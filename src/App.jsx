import MinterPage  from './components/MinterPage.jsx';
import RebusesPage from './components/RebusesPage.jsx';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { store } from './store/store.js';
import AdvertismentForm from './components/AdvertismentForm.jsx';
import { Provider } from 'react-redux';


function App() {
  return (

    <Provider store={store}>
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
    </Provider>

  );
}

export default App;