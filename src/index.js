import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter ,Route,Redirect,Switch} from 'react-router-dom';
import Profile from './Profile'
import Tour from './Tour'
import TourDetails from './TourDetails';
import Signup from './Signup';
import Mybookings from './Mybookings';
import Home from './Home';
import Login from './Login';
import Forgetpassword from './Forgetpassword';
import Review from './Review';

ReactDOM.render(
<BrowserRouter>
  <Switch>
    <Route path='/me' exact component={Profile}></Route>
    <Route path='/tour' exact component={Tour}></Route> 
    <Route path='/tour/:slug' exact component={TourDetails}></Route>
    <Route path='/tour/review/:slug' exact component={Review}></Route>
    <Route path='/signup' exact component={Signup}></Route>
    <Route path='/login' exact component={Login}></Route>
    <Route path='/' exact component={Home}></Route>
    <Route path='/home' exact component={Home}></Route>
    <Route path='/MyBookings' exact component={Mybookings}></Route>
    <Route path='/forgetPassword' exact component={Forgetpassword}></Route>
  </Switch>
</BrowserRouter>,

document.getElementById('root')
);
