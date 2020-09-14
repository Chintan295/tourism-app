import React from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

class Signup extends React.Component{
    constructor(){
        super();
        this.state = {
            name : null,
            email : null,
            pass : null,
            cnfpass : null
        }
    }
    handle = (event)=>{
        event.persist();
        const field = event.target.name;
        if(field==='name')
            this.setState({ name:event._targetInst.stateNode.innerText })
        else if(field==='email')
            this.setState({ email:event._targetInst.stateNode.innerText })
        else if(field==='pass')
            this.setState({ pass:event._targetInst.stateNode.innerText })
        else if(field==='cnfpass')
            this.setState({ cnfpass:event._targetInst.stateNode.innerText })
    }
    render(){
        return <div>
            Name : <input type='text' name='name' onChange={this.handle}></input><br/>
            Email : <input type='text' name='email' onChange={this.handle}></input><br/>
            Password : <input type='password' name='pass' onChange={this.handle}></input><br/>
            Confirm Password : <input type='password' name='cnfpass' onChange={this.handle}></input>
        </div>
    }
}

export default Signup;