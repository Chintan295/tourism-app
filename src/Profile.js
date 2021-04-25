import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Footer from './Footer'
import './style.css'
import Header from './Header';
import axios from 'axios'
import {getCookie, showAlert} from './utils'
import Icons from './img/icons.svg'

class Profile extends React.Component {
    constructor() {
        super();
        this.state = { 
            user: null,
            name:"",
            email:"",
            photo:null
        };
        axios.get(`http://localhost:5000/api/user/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                this.setState({
                    user:res.data.data.data,
                    name:res.data.data.data.name,
                    email:res.data.data.data.email,
                    curPass:"",
                    newPass:"",
                    newCnfPass:""
                });
            })
            .catch(function (error) {
            });
        axios.get(`http://localhost:5000/api/user/photo`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                this.setState({photo:res.data})
            })         
            .catch(function (error) {
            });
        
    }
    handleName = (e) =>{
        e.persist();
        this.setState({name:e.target.value});
    }
    handleEmail = (e)=>{
        e.persist();
        this.setState({email:e.target.value});
    }
    handlePhoto = (e)=>{
        e.persist();
        this.setState({photo:e.target.files[0]})
    }
    handleCurruentPassword = (e)=>{
        e.persist();
        this.setState({curPass:e.target.value});
    }
    handleNewPassword = (e)=>{
        e.persist();
        this.setState({newPass:e.target.value});
    }
    handleConfirmPassword = (e) => {
        e.persist();
        this.setState({newCnfPass:e.target.value});
    }
    saveSattings = ()=>{
        const data = new FormData() 
        data.append('name', this.state.name)
        data.append('email', this.state.email)
        data.append('photo', this.state.photo)
        axios.patch(`http://localhost:5000/api/user/updateMe`,
                    data,
                    {headers:{'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': 'Bearer '+ getCookie('jwt')}
        })
        .then(res => {
            showAlert('success','Updated Successfully')
        })
        .catch(function (error) {
            showAlert('error',error.message)
        });
    }
    resetPassword = ()=>{
        const data = {
            passwordCurrent:this.state.curPass,
            password:this.state.newPass,
            passwordConfirm:this.state.newCnfPass
        }
        axios.patch(`http://localhost:5000/api/user/updatePassword`,
                    data,
                    {headers:{'Content-Type': 'application/json',
                              'Accept': 'application/json',
                              'Authorization': 'Bearer '+ getCookie('jwt')}
        })
        .then(res => {
            showAlert('success','Password updated Successfully')
        })
        .catch(function (error) {
            showAlert('error',error.message)
        });
    }
    render() {
        return <div>
            <Header></Header>
            <div className="main">
                <div className="user-view">
                    <nav className="user-view__menu">
                        <ul className="side-nav">
                            <li className="true?side-nav--active"><a href=""><svg><use xlinkHref={`${Icons}#icon-settings`}></use></svg>Settings</a></li>
                            <li className="true?side-nav--active"><a href="/MyBookings"><svg><use xlinkHref={`${Icons}#icon-briefcase`}></use></svg>My Bookings</a></li>
                        </ul>
                    </nav>
                    <div className="user-view__content">
                        <div className="user-view__form-container">
                            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
                            <div class="form form-user-data">
                                <div class="form__group">
                                    <label class="form__label" for="name">Name</label>
                                    <input class="form__input" id="name" type="text" value={this.state.name} required=""  onChange={this.handleName}></input>
                                </div>
                                <div class="form__group ma-bt-md">
                                    <label class="form__label" for="email">Email address</label>
                                    <input class="form__input" id="email" type="email" value={this.state.email} required="" onChange={this.handleEmail} />
                                </div>
                                <div class="form__group form__photo-upload">
                                    <img class="form__user-photo" src={this.state.photo} alt="User photo" />
                                    <input class="form__upload" type="file" accept="image/*" name="photo" id="photo" onChange={this.handlePhoto}/>
                                    <label for="photo">Choose New Photo</label>
                                </div>
                                <div class="form__group right">
                                    <button class="btn btn--small btn--green save-setting" onClick={this.saveSattings}>Save settings</button>
                                </div>
                            </div>
                            <div class="line">&nbsp;</div>
                        </div>
                        <div class="user-view__form-container">
                            <h2 class="heading-secondary ma-bt-md">Password change</h2>
                            <div class="form form-user-settings">
                                <div class="form__group">
                                    <label class="form__label" for="password-current">Current password</label>
                                    <input class="form__input" id="password-current" type="password" placeholder="••••••••" required="" minlength="8" onChange={this.handleCurruentPassword}/>
                                </div>
                                <div class="form__group">
                                    <label class="form__label" for="password">New password</label>
                                    <input class="form__input" id="password" type="password" placeholder="••••••••" required="" minlength="8" onChange={this.handleNewPassword} />
                                </div>
                                <div class="form__group ma-bt-lg">
                                    <label class="form__label" for="password-confirm">Confirm password</label>
                                    <input class="form__input" id="password-confirm" type="password" placeholder="••••••••" required="" minlength="8" onChange={this.handleConfirmPassword}/>
                                </div>
                                <div class="form__group right">
                                    <button class="btn btn--small btn--green btn--password-save" onClick={this.resetPassword}>Save password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    }
}

export default Profile;