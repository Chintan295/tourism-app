import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './style.css';
import Footer from './Footer';
import axios from 'axios';
import { showAlert, getCookie, setCookie } from './utils';
import Header from './Header';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn:(getCookie('jwt')!='')
        }
        this.setemail = this.setemail.bind(this);
        this.setpassword = this.setpassword.bind(this);
    }
    setpassword = (e) => {
        e.persist();
        this.setState({ password: e.target.value });
    }
    setemail = (e) => {
        e.persist();
        this.setState({ email: e.target.value });
    }
    login = () =>{
        const data = {
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`http://localhost:5000/api/user/login`,
                    data,
                    {headers:{'Content-Type': 'application/json',
                              'Accept': 'application/json'}
        })
        .then(res => {
            setCookie('jwt',res.data.token,10*24*3600);
            this.setState({loggedIn:true});
        })
        .catch(function (error) {
            showAlert('error',error.message);
        });
    }
    render() {
        if(this.state.loggedIn)
            return <Redirect to='/home'></Redirect>
        return (<div>
            <Header></Header>
            <main class="main">
                <div class="login-form">
                    <h2 class="heading-secondary ma-bt-lg">Log into your account</h2>
                    <div class="form form--login">
                        <div class="form__group">
                            <label class="form__label" for="email">Email address</label>
                            <input class="form__input" id="email" type="email" onChange={this.setemail} placeholder="you@example.com" required />
                        </div>
                        <div class="form__group ma-bt-md">
                            <label class="form__label" for="password">Password</label>
                            <input class="form__input" id="password" type="password" onChange={this.setpassword} placeholder="••••••••" required minlength="8" />
                        </div>
                        <div class="form__group">
                            <button class="btn btn--green" onClick={this.login}>Login</button>
                        </div>
                        <a class="password_reset" href="/forgetPassword">Forget Password?</a>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>);
    }
}
export default Login;