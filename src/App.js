import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from './components/movies';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Customers from './components/customer';
class App extends Component {
  render() {
    return (
      <main role="main" className="container">
        <Switch>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to='/not-found' />
        </Switch>

      </main>
    );
  }
}

export default App;