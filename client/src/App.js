import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import classes from './App.module.scss';

import Login from "./components/Auth/Login"
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Layout from "./components/Layout/Layout";
import DragAndDrop from "./components/UI/DragNDrop";

function App() {
  return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path={"/dragndrop"} component={DragAndDrop}/>
            <Route path={"/register"} component={Register}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/"} component={Home}/>
          </Switch>
        </Layout>
      </div>
  );
}

export default App;
