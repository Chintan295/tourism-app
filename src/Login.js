import React from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import {setCookie, getCookie} from './utils'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email : null,
            pass : null,
            token : getCookie('jwt')
        }
    }
    handle = (event)=>{
        event.persist();
        const field = event.target.name;
        if(field==='email')
            this.setState({ email:event.target.value })
        else if(field==='pass')
            this.setState({ pass:event.target.value })
    }
    login = ()=>{
        const data = {
            'email' :this.state.email,
            'password' : this.state.pass
        }
        axios.post(`http://localhost:5000/api/user/login`,
            data,
            {headers:{'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(res =>{
            setCookie('jwt',res.data.token,10*24*60*60);
            this.setState({token: res.data.token});
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    render(){
        if(this.state.token!=='')
            return <Redirect to='/home'/>
        return <div>
            Email :<input type='text' name='email' onChange={this.handle}></input><br/>
            Password : <input type='password' name='pass' onChange={this.handle}></input><br/>
            <button onClick={this.login}>Log in</button>
        </div>
    }
}

export default Login;