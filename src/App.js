import React, { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Symptoms from "./pages/Symptoms";
import Graph from "./pages/Graph";
import Map from "./pages/Map";
import Nav from "./Nav";
import ScrollTopArrow from "./ScrollTopArrow";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleDarkThemeChange = () => {
    setDarkTheme(!darkTheme);
    console.log(darkTheme);
  };
  // passing both variable and function to home.js component so we can know the theme value "day night" and we can change the value from home.js
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact
            path="/"
            render={() => (
              <Home darkTheme={darkTheme} themeChange={handleDarkThemeChange} />
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/symptoms" component={Symptoms} />
          <Route path="/graph" component={Graph} />
          <Route path="/map" render={() => (
              <Map darkTheme={darkTheme} themeChange={handleDarkThemeChange} />
            )}  />
        </Switch>
        <ScrollTopArrow darkTheme={darkTheme} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
