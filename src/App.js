import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes"; 
import withTracker from "./withTracker";

import './App.css';

import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <Router>
      <div>
        <ScrollToTop>
          <Switch>
            {routes.map((route, index) => {
              return(
                <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker((props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
            })}
          </Switch>
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
