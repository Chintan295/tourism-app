import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './style.css';
import Footer from './Footer';
import axios from 'axios';
import { showAlert, getCookie, setCookie } from './utils';
import Icons from './img/icons.svg'
import Header from './Header';

class Review extends Component {
    constructor(props) {
        super(props);
        var url = window.location.href.split('?')[0].split('/');
        this.state = {
            active: 0,
            review: '',
            slug: url[url.length - 1]
        }
    }
    setStar = (e) => {
        e.persist();
        this.setState({ active: parseInt(e.target.id) })
    }
    handleReview = (e) => {
        e.persist();
        this.setState({ review: e.target.value });
    }
    submit = () => {
        const data = {
            review: this.state.review,
            rating: this.state.active
        }
        axios.post(`http://localhost:5000/api/review/${window.location.href.split('?')[1].split('=')[1]}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                showAlert('success', 'Thank you for feedback');
                window.location.href='/MyBookings';
            })
            .catch(function (error) {
                showAlert('error', error.message);
            });
    }
    render() {
        return (<div>
            <Header></Header>
            <main class="main">
                <div class="login-form">
                    <h2 class="heading-secondary ma-bt-lg">Give Feedback of {this.state.slug} tour</h2>
                    <div class="form form--login" style={{ textAlign: "center" }}>
                        <svg class={`reviews__star reviews__star--${this.state.active >= 1 ? 'active' : 'inactive'}`} style={{ width: 4 + "em", height: 4 + 'em' }} id='1' onClick={this.setStar}>
                            <use xlinkHref={`${Icons}#icon-star`}></use>
                        </svg>
                        <svg class={`reviews__star reviews__star--${this.state.active >= 2 ? 'active' : 'inactive'}`} style={{ width: 4 + "em", height: 4 + 'em' }} id='2' onClick={this.setStar}>
                            <use xlinkHref={`${Icons}#icon-star`}></use>
                        </svg>
                        <svg class={`reviews__star reviews__star--${this.state.active >= 3 ? 'active' : 'inactive'}`} style={{ width: 4 + "em", height: 4 + 'em' }} id='3' onClick={this.setStar}>
                            <use xlinkHref={`${Icons}#icon-star`}></use>
                        </svg>
                        <svg class={`reviews__star reviews__star--${this.state.active >= 4 ? 'active' : 'inactive'}`} style={{ width: 4 + "em", height: 4 + 'em' }} id='4' onClick={this.setStar}>
                            <use xlinkHref={`${Icons}#icon-star`}></use>
                        </svg>
                        <svg class={`reviews__star reviews__star--${this.state.active >= 5 ? 'active' : 'inactive'}`} style={{ width: 4 + "em", height: 4 + 'em' }} id='5' onClick={this.setStar}>
                            <use xlinkHref={`${Icons}#icon-star`}></use>
                        </svg>
                        <div class="form__group" style={{ padding: 10 }}>
                            <input class="form__input" id="email" type="text" onChange={this.handleReview} value={this.state.value} placeholder="Write comment about tour" required />
                        </div>
                        <div class="form__group">
                            <button class="btn btn--green" onClick={this.submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>);
    }
}
export default Review;