import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import Posts from "../components/Posts";
import Photos from "../components/Photos";

import Header from "../components/Header";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/photos" component={Photos} />
      </Switch>
    </BrowserRouter>
  );
}
