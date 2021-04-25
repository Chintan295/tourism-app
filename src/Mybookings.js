import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios';
import { getCookie, showAlert } from './utils'
import Icons from './img/icons.svg'
import './style.css'
import Header from './Header';

class Mybookings extends React.Component {
    constructor() {
        super();
        this.state = { tours: [] ,params:window.location.href.split('?')[1]};
        axios.get('http://localhost:5000/api/view/?' + window.location.href.split('?')[1],
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                showAlert('success', 'Booked Successfully')
                window.location.href = window.location.href.split('?')[0]
            })
            .catch(function (error) {
            });

        axios.get('http://localhost:5000/api/view/my-tours',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('jwt')
                }
            })
            .then(res => {
                this.setState({tours:res.data.tours});
            })
            .catch(function (error) {
            });
    }
    render() {
        return <div>
            <Header></Header>
            <main class="main">
                <div class="card-container">
                    {
                        this.state.tours.map((item, i) =>
                            <div class="card">
                                <div class="card__header">
                                    <div class="card__picture">
                                        <div class="card__picture-overlay">&nbsp;</div>
                                        <img class="card__picture-img" src={require("./newimages/" + item.imageCover)} alt="The Sea Explorer" />
                                    </div>
                                    <h3 class="heading-tertirary">
                                        <span>{item.name}</span>
                                    </h3>
                                </div>
                                <div class="card__details">
                                    <h4 class="card__sub-heading">{item.difficulty} {item.duration}-day tour</h4>
                                    <p class="card__text">{item.summary}</p>
                                    <div class="card__data">
                                        <svg class="card__icon">
                                            <use xlinkHref={`${Icons}#icon-map-pin`}></use>
                                        </svg>
                                        <span>{item.startLocation.description}</span>
                                    </div>
                                    <div class="card__data">
                                        <svg class="card__icon">
                                            <use xlinkHref={`${Icons}#icon-calendar`}></use>
                                        </svg>
                                        <span>{new Date(item.startDates[0]).toLocaleString('en-us', { month: 'long' })}  {new Date(item.startDates[0]).getFullYear()}</span>
                                    </div>
                                    <div class="card__data">
                                        <svg class="card__icon">
                                            <use xlinkHref={`${Icons}#icon-flag`}></use>
                                        </svg>
                                        <span>{item.locations.length} stops</span>
                                    </div>
                                    <div class="card__data">
                                        <svg class="card__icon">
                                            <use xlinkHref={`${Icons}#icon-user`}></use>
                                        </svg>
                                        <span>{item.maxGroupSize} people</span>
                                    </div>
                                </div>
                                <div class="card__footer">
                                    <p>
                                        <span class="card__footer-value">&#8377; {item.price}</span>
                                        <span class="card__footer-text"> per person</span>
                                    </p>
                                    <p class="card__ratings">
                                        <span class="card__footer-value">{item.ratingsAverage} </span>
                                        <span class="card__footer-text">rating ({item.ratingsQuantity})</span>
                                    </p>
                                    <a class="btn btn--green btn--small" href={`/tour/review/${item.slug}?tourId=${item._id}`}>Give reviews</a>
                                </div>
                            </div>
                        )}
                </div>
            </main >
            <Footer></Footer>
        </div >
    }
}
export default Mybookings;