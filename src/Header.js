import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import './style.css'
import axios from 'axios'
import { getCookie, setCookie } from './utils'

class Header extends React.Component {
    constructor() {
        super();
        this.state = { user: null };
        axios.get(`http://localhost:5000/api/user/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                this.setState({user:res.data.data.data});
            })
            .catch(function (error) {
            });
    }
    logout=()=>{
        setCookie('jwt','',1);
        this.setState({user:null})
    }
    render() {
        return <header class="header">
            <nav class="nav nav--tours">
                <a class="nav__el" href="/home">home</a>
                <a class="nav__el" href="/tour">All tours</a>
            </nav>
            {this.state.user ?
                <nav class="nav nav--users">
                    <a class="nav__el nav__el--logout" onClick={this.logout}>Log out</a>
                    <a class="nav__el" href="/me">
                        <img class="nav__user-img" src={require(`./img/users/${this.state.user.photo}`)} alt="User photo" />
                        <span>{this.state.user.name}</span>
                    </a>
                </nav> :
                <nav class="nav nav--users">
                    <a class="nav__el" href="/login">Log in</a>
                    <a class="nav__el nav__el--cta" href="/signup">Sign up</a>
                </nav>
            }
        </header>
    }
}

export default Header;