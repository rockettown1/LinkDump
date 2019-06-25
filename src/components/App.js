import React, { Component } from "react";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Login from "./Login";
import "../styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <div className="linkItems background-gray">
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
