import React from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

class Home extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div>
            <h1>Logged In successfully</h1>
        </div>
    }
}

export default Home;