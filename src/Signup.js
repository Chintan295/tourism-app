import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './style.css';
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';
import {showAlert} from './utils'


class Signup extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={
          name:'',
          email:'',
          password:'',
          passwordConfirm:''        
        }
    }
    setname = (e)=>
    {
        e.persist()
        this.setState({ name: e.target.value});
    }
    setpassword = (e)=>
    {
        e.persist()
        this.setState({password:e.target.value});
    }
    setemail = (e)=>
    {
        e.persist()
        this.setState({email:e.target.value});
    }
    setconfirmPassword = (e)=>
    {
        e.persist()
        this.setState({passwordConfirm:e.target.value});
    }
    signUp = ()=>{
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }
        axios.post(`http://localhost:5000/api/user/signup`,
                    data,
                    {headers:{'Content-Type': 'application/json',
                              'Accept': 'application/json'}
        })
        .then(res => {
            showAlert('success','You are registered successfully')
        })
        .catch(function (error) {
            showAlert('error',error.message);
        });
    }
    render(){
        return(<div>
            <Header></Header>
            <main class="main">
                <div class="login-form">
                    <h2 class="heading-secondary ma-bt-lg">Sign UP</h2>
                    <div class="form form--login">
                        <div class="form__group">
                            <label class="form__label" for="name">Name</label>
                            <input class="form__input" onChange={this.setname} id="name" placeholder="Name" required />
                        </div>
                        <div class="form__group">
                            <label class="form__label" for="email">Email address</label>
                            <input class="form__input" onChange={this.setemail} id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div class="form__group ma-bt-md">
                            <label class="form__label" for="password">Password</label>
                            <input class="form__input" onChange={this.setpassword} id="password" type="password" placeholder="••••••••" required minlength="8" />
                        </div>
                        <div class="form__group ma-bt-md">
                            <label class="form__label" for="password">ConfirmPassword</label>
                            <input class="form__input" onChange={this.setconfirmPassword} id="confirmPassword" type="password" placeholder="••••••••" required minlength="8" />
                        </div>
                        <div class="form__group">
                            <button class="btn btn--green" id="signUp" onClick={this.signUp}>Signup</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>);
  }
}
export default Signup;