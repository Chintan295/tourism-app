import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import './style.css'
import logo from './img/logo-green-round.png'

class Footer extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div className="footer">
            <div className="footer__logo">
                <img src={logo} alt="Natours logo" />
            </div>
            <ul className="footer__nav">
                <li>
                    <a href="">About us</a>
                </li>
                <li>
                    <a href="">Download apps</a>
                </li>
                <li>
                    <a href="">Become a guide</a>
                </li>
                <li>
                    <a href="">Careers</a>
                </li>
                <li>
                    <a href="">Contact</a>
                </li>
            </ul>
        </div>
    }
}

export default Footer;