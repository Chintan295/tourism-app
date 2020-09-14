import React from 'react';
import {Link} from 'react-router-dom'; 
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <Link to='/login'><button>Log in</button></Link>
      <Link to='/signup'><button>Sign up</button></Link>
    </div>
  );
}

export default App;
