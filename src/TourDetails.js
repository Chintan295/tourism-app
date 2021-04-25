import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios';
import { getCookie } from './utils'
import './style.css'
import Icons from './img/icons.svg'
import Header from './Header';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51HqUpuFB9dJUDyrAoGNg1J6qn2it99IhC9a1y5i9lCKNOMObLG7KtTZMcY1Id4iD1mKNZyfRJfZJfgjWUaPOJgW300yAh6L4ap');


class TourDetails extends React.Component {
    constructor() {
        super();
        this.state = { tour: null };
        var url = window.location.href.split('/');
        axios.get(`http://localhost:5000/api/tour/${url[url.length - 1]}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                console.log(res.data.tour)
                this.setState({ tour: res.data.tour });
            })
            .catch(function (error) {
                window.alert(error.message);
            });
    }

    book = async (event) => {
        const stripe = await stripePromise;
        let session;
        axios.get(`http://localhost:5000/api/booking/checkout-session/` + this.state.tour._id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(async (res) => {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.session.id,
                });
                console.log(result)
            })
            .catch(function (error) {
            });
    };

    render() {
        if (!this.state.tour)
            return <div></div>
        return <div>
            <Header></Header>
            <section class="section-header">
                <div class="header__hero">
                    <div class="header__hero-overlay">&nbsp;</div>
                    <img class="header__hero-img" src={require("./newimages/" + this.state.tour.imageCover)} alt="The Sea Explorer" />
                </div>
                <div class="heading-box">
                    <h1 class="heading-primary">
                        <span>{this.state.tour.name}</span>
                    </h1>
                    <div class="heading-box__group">
                        <div class="heading-box__detail">
                            <svg class="heading-box__icon">
                                <use xlinkHref={`${Icons}#icon-clock`}></use>
                            </svg>
                            <span class="heading-box__text">{this.state.tour.duration} days</span>
                        </div>
                        <div class="heading-box__detail">
                            <svg class="heading-box__icon">
                                <use xlinkHref={`${Icons}#icon-map-pin`}></use>
                            </svg>
                            <span class="heading-box__text">{this.state.tour.startLocation.description}</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section-description">
                <div class="overview-box">
                    <div>
                        <div class="overview-box__group">
                            <h2 class="heading-secondary ma-bt-lg">Quick facts</h2>
                            <div class="overview-box__detail">
                                <svg class="overview-box__icon">
                                    <use xlinkHref={`${Icons}#icon-calendar`}></use>
                                </svg>
                                <span class="overview-box__label">Next date</span>
                                <span class="overview-box__text">{new Date(this.state.tour.startDates[0]).toLocaleString('en-us', { month: 'long' })}  {new Date(this.state.tour.startDates[0]).getFullYear()}</span>
                            </div>
                            <div class="overview-box__detail">
                                <svg class="overview-box__icon">
                                    <use xlinkHref={`${Icons}#icon-trending-up`}></use>
                                </svg>
                                <span class="overview-box__label">Difficulty</span>
                                <span class="overview-box__text">{this.state.tour.difficulty}</span>
                            </div>
                            <div class="overview-box__detail">
                                <svg class="overview-box__icon">
                                    <use xlinkHref={`${Icons}#icon-star`}></use>
                                </svg>
                                <span class="overview-box__label">Participants</span>
                                <span class="overview-box__text">{this.state.tour.maxGroupSize} people</span>
                            </div>
                            <div class="overview-box__detail">
                                <svg class="overview-box__icon">
                                    <use xlinkHref={`${Icons}#icon-calendar`}></use>
                                </svg>
                                <span class="overview-box__label">Rating</span>
                                <span class="overview-box__text">{this.state.tour.ratingsAverage} / 5</span>
                            </div>
                        </div>
                        <div class="overview-box__group">
                            <h2 class="heading-secondary ma-bt-lg">Your tour guides</h2>
                            {
                                this.state.tour.guides.map(item =>
                                    <div class="overview-box__detail">
                                        <img class="overview-box__img" src={require('./img/users/' + item.photo)} alt="Miyah Myles" />
                                        <span class="overview-box__label">{item.roles}</span>
                                        <span class="overview-box__text">{item.name}</span>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div class="description-box">
                    <h2 class="heading-secondary ma-bt-lg">About {this.state.tour.name}</h2>
                    <p class="description__text">{this.state.tour.description}</p>
                </div>
            </section>
            <section class="section-pictures">
                <div class="picture-box">
                    <img class="picture-box__img picture-box__img--1" src={require("./newimages/" + this.state.tour.images[0])} alt="The Sea Explorer 1" />
                </div>
                <div class="picture-box">
                    <img class="picture-box__img picture-box__img--2" src={require("./newimages/" + this.state.tour.images[1])} alt="The Sea Explorer 2" />
                </div>
                <div class="picture-box">
                    <img class="picture-box__img picture-box__img--3" src={require("./newimages/" + this.state.tour.images[2])} alt="The Sea Explorer 3" />
                </div>
            </section>
            <section class="section-reviews">
                <div class="reviews">
                    {
                        this.state.tour.reviews.map((item, i) =>
                            <div class="reviews__card">
                                <div class="reviews__avatar">
                                    <img class="reviews__avatar-img" src={require('./img/users/' + item.user.photo)} alt={item.user.name} />
                                    <h6 class="reviews__user">{item.user.name}</h6>
                                </div>
                                <p class="reviews__text">{item.review}</p>
                                <div class="reviews__rating">
                                    {
                                        Array(Math.floor(item.rating)).fill(1).map(item =>
                                            <svg class="reviews__star reviews__star--active">
                                                <use xlinkHref={`${Icons}#icon-star`}></use>
                                            </svg>
                                        )
                                    }
                                    {
                                        Array(5-Math.floor(item.rating)).fill(1).map(item =>
                                            <svg class="reviews__star reviews__star--inactive">
                                                <use xlinkHref={`${Icons}#icon-star`}></use>
                                            </svg>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                </div>
            </section>
            <section class="section-cta">
                <div class="cta">
                    <div class="cta__img cta__img--logo">
                        <img src={require("./img/logo-white.png")} alt="Natours logo" />
                    </div>
                    <img class="cta__img cta__img--1" src={require("./newimages/tour-2-2.jpg")} alt="Tour Picture" />
                    <img class="cta__img cta__img--2" src={require("./newimages/tour-2-1.jpg")} alt="Tour Picture" />
                    <div class="cta__content">
                        <h2 class="heading-secondary">What are you waiting for?</h2>
                        <p class="cta__text">{this.state.tour.duration} days. 1 adventure. Infinite memories. Make it yours today!</p>
                        <button class="btn btn--green span-all-rows" id="book-tour" data-tour-id="5c88fa8cf4afda39709c2955" onClick={this.book}>Book tour now!</button>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    }
}

export default TourDetails;