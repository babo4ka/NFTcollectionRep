import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import PandumbsMinterPage from "./pandumbs/PandumbsMinterPage";
import './Application.scss'
import { Provider } from "react-redux";
import {store} from '../store/store'
import UebishaMinterPage from "./uebisha/UebishaMinterPage";
import MainPage from "./MainPage";
import GeeseMinterPage from "./geese/GeeseMinterPage";

const Application = () => {

    return(
         <Provider store={store}>
            <Router>
                <Switch>
                <Route exact path="/">
                        <MainPage/>
                    </Route>

                    <Route exact path="/pandumbs">
                        <PandumbsMinterPage/>
                    </Route>

                    <Route exact path="/uebisha">
                        <UebishaMinterPage/>
                    </Route>

                    <Route exact path="/geese">
                        <GeeseMinterPage/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
     )
}

export default Application