import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter ,Route,Redirect,Switch} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

ReactDOM.render(
<BrowserRouter>
  <Switch>
    <Route path="/" exact component={App} />
    <Route path='/login' exact component={Login}></Route> 
    <Route path='/signup' exact component={Signup}></Route> 
    <Route path='/home' exact component={Home}></Route>
  </Switch>
</BrowserRouter>,

document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();