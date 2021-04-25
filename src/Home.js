import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './style_front.css';
import axios from 'axios';
import Header from './Header';


class Home extends Component {
    constructor() {
        super();
        this.state = { tours: [] }
        axios.get(`http://localhost:5000/api/view/top-3-tour`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => {
                this.setState({ tours: res.data.tours });
            })
            .catch(function (error) {
            });
    }
    render() {
        return (<div>
            <Header></Header>
            <div class="header1">
                <div class="header1__logo-box">
                    <img class="header1__logo" src={require("./img/logo-white.png")} alt="Logo" />
                </div>
                <div class="header1__text-box">
                    <h1 class="heading-primary1">
                        <span class="heading-primary--main">Outdoors</span>
                        <span class="heading-primary--sub">is where life happens</span>
                    </h1>
                    <a class="btn btn--white btn--animated" href="/tour">Discover our tours</a>
                </div>
            </div>
            <main>
                <section class="section-about">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">Exciting tours for adventurous people</h2>
                    </div>
                    <div class="row">
                        <div class="col-1-of-2">
                            <h3 class="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
ducimus quam nisi exercitationem omnis earum qui.</p>
                            <h3 class="heading-tertiary u-margin-bottom-small">Live adventures like you never have before</h3>
                            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla deserunt voluptatum nam.</p>
                            <a class="btn-text" href="">Learn more →</a>
                        </div>
                        <div class="col-1-of-2">
                            <div class="composition">
                                <img class="composition__photo composition__photo--p1" src={require('./img/tours/nat-1.jpg')} alt="Photo 1" />
                                <img class="composition__photo composition__photo--p2" alt="Photo 2" src={require('./img/tours/nat-2.jpg')} />
                                <img class="composition__photo composition__photo--p3" alt="Photo 3" src={require('./img/tours/nat-3.jpg')} />
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-features">
                    <div class="row">
                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <i class="feature-box__icon icon-basic-world"></i>
                                <h3 class="heading-tertiary u-margin-bottom-small">Explore the world</h3>
                                <p class="feature-box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.</p>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <i class="feature-box__icon icon-basic-compass"></i>
                                <h3 class="heading-tertiary u-margin-bottom-small">Meet nature</h3>
                                <p class="feature-box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.</p>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <i class="feature-box__icon icon-basic-map"></i>
                                <h3 class="heading-tertiary u-margin-bottom-small">Find your way</h3>
                                <p class="feature-box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.</p>
                            </div>
                        </div>
                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <i class="feature-box__icon icon-basic-heart"></i>
                                <h3 class="heading-tertiary u-margin-bottom-small">Live a healthier life</h3>
                                <p class="feature-box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-tours" id="section-tours">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">Most popular tours</h2>
                    </div>
                    <div class="row">
                        {
                            this.state.tours.map((item,i) =>
                                <div class="col-1-of-3">
                                    <div class="card">
                                        <div class="card__side card__side--front">
                                            <div class={`card__picture card__picture--${i+1}`}></div>
                                            <h4 class="card__heading">
                                                <span class={`card__heading-span card__heading-span--${i+1}`}>{item.name}</span>
                                            </h4>
                                            <div class="card__details1">
                                                <ul>
                                                    <li>{item.duration} day tours</li>
                                                    <li>Up to {item.maxGroupSize} people</li>
                                                    <li>{item.guides.length} tour guides</li>
                                                    <li>Sleep in cozy hotels</li>
                                                    <li>Difficulty: {item.difficulty}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class={`card__side card__side--back card__side--back-${i+1}`}>
                                            <div class="card__cta">
                                                <div class="card__price-box">
                                                    <p class="card__price-only">Only</p>
                                                    <p class="card__price-value">&#8377; {item.price}</p>
                                                </div>
                                                <a class="btn btn--white" href={`/tour/${item.slug}`}>Book now!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                    <div class="u-center-text u-margin-top-huge">
                        <a class="btn btn--green" href="/tour">Discover all tours</a>
                    </div>
                </section>
                <section class="section-stories">
                    <div class="bg-video">
                        <video class="bg-video__content" autoplay="" muted="" loop="">
                            <source src="/img/tours/video.mp4" type="video/mp4" />
                            <source src="/img/tours/video.webm" type="video/webm" />Your browser is not supported!
                    </video>
                    </div>
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">We make people genuinely happy</h2>
                    </div>
                    <div class="row">
                        <div class="story">
                            <figure class="story__shape">
                                <img class="story__img" src={require("./img/tours/nat-8.jpg")} alt="Person on a tour" />
                                <figcaption class="story__caption">Mary Smith</figcaption>
                            </figure>
                            <div class="story__text">
                                <h3 class="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                                ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="story">
                            <figure class="story__shape">
                                <img class="story__img" src={require("./img/tours/nat-9.jpg")} alt="Person on a tour" />
                                <figcaption class="story__caption">Jack Wilson</figcaption>
                            </figure>
                            <div class="story__text">
                                <h3 class="heading-tertiary u-margin-bottom-small">WOW! My life is completely different now</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                                ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.</p>
                            </div>
                        </div>
                    </div>
                    <div class="u-center-text u-margin-top-huge">
                        <a class="btn-text" href="">Read all stories →</a>
                    </div>
                </section>
            </main>
            <div class="footer1">
                <div class="footer1__logo-box">
                    <img alt="Full logo" src={require("./img/logo-white.png")} />
                </div>
                <div class="row">
                    <div class="col-3-of-3">
                        <div class="footer1__navigation">
                            <ul class="footer1__list">
                                <li class="footer1__item">
                                    <a class="footer1__link" href="">Company</a>
                                </li>
                                <li class="footer1__item">
                                    <a class="footer1__link" href="">Contact us</a>
                                </li>
                                <li class="footer1__item">
                                    <a class="footer1__link" href="">Carrers</a>
                                </li>
                                <li class="footer1__item">
                                    <a class="footer1__link" href="">Privacy policy</a>
                                </li>
                                <li class="footer1__item">
                                    <a class="footer1__link" href="">Terms</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popup" id="popup">
                <div class="popup__content">
                    <div class="popup__left">
                        <img class="popup__img" src="/img/tours/nat-8.jpg" alt="Tour photo" />
                        <img class="popup__img" src="/img/tours/nat-9.jpg" alt="Tour photo" />
                    </div>
                    <div class="popup__right">
                        <a class="popup__close" href="#section-tours">×</a>
                        <h2 class="heading-secondary u-margin-bottom-small">Start booking now</h2>
                        <h3 class="heading-tertiary u-margin-bottom-small">Important – Please read these terms before booking</h3>
                        <p class="popup__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Sed sed risus pretium quam. Aliquam sem et tortor consequat id. Volutpat odio facilisis mauris sit
                        amet massa vitae. Mi bibendum neque egestas congue. Placerat orci nulla pellentesque dignissim enim
                        sit. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Malesuada pellentesque elit eget
                        gravida cum sociis natoque penatibus et. Proin fermentum leo vel orci porta non pulvinar neque laoreet.
                        Gravida neque convallis a cras semper. Molestie at elementum eu facilisis sed odio morbi quis. Faucibus
                        vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam libero justo laoreet sit. Amet massa
                        vitae tortor condimentum lacinia quis vel eros donec. Sit amet facilisis magna etiam. Imperdiet sed
euismod nisi porta.</p>
                        <a class="btn btn--green" href="/login">Book now</a>
                    </div>
                </div>
            </div>

        </div>
        );
    }
}
export default Home;