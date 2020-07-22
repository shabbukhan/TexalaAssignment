import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import ProductList from "./containers/ProductList/ProductList";
import AddProduct from "./containers/AddProduct/AddProduct";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/product/add" component={AddProduct} />
        <Route path="/" exact component={ProductList} />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

export default withRouter(App);
