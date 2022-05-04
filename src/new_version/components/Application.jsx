import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PandumbsMinterPage from "./pandumbs/PandumbsMinterPage";


const Application = () => {
     return(
        <Router>
            <Switch>
                <Route exact path="/pandumbs">
                    <PandumbsMinterPage/>
                </Route>
            </Switch>
        </Router>
     )
}

export default Application