import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './pages/Login';
import wallet from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter BrowserRouter basename={ process.env.PUBLIC_URL }>
          <Switch>
            <Route exact path="/" component={ login } />
            <Route exact path="/carteira" component={ wallet } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}
