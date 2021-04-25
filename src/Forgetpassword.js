import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './style.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';  
import { showAlert } from './utils';


class Forgetpassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.setemail = this.setemail.bind(this);
    }
    setemail = (e) => {
        this.setState({ email: e.target.value });
    }
    sendPass = () => {
        const data = {
            email:this.state.email
        }
        axios.post(`http://localhost:5000/api/user/forgetPassword`,
                    data,
                    {headers:{'Content-Type': 'application/json',
                              'Accept': 'application/json'}
        })
        .then(res => {
            showAlert('success',res.data.message);
            window.location.href='/login'
        })
        .catch(function (error) {
            showAlert('error',error.message);
        });
    }
    render() {
        return (<div>
            <Header></Header>
            <main class="main">
                <div class="login-form">
                    <h2 class="heading-secondary ma-bt-lg">Forget Password</h2>
                    <div class="form form--login">
                        <div class="form__group">
                            <label class="form__label" for="email">Email address</label>
                            <input class="form__input" id="email" type="email" onChange={this.setemail} placeholder="you@example.com" required />
                        </div>
                        <div class="form__group">
                            <button class="btn btn--green" id="sendForegtPasswordLink" onClick={this.sendPass}>Send Reset Password Link To Mail</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>);
    }
}
export default Forgetpassword;