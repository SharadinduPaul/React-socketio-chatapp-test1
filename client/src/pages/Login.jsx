import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login({ setUsername }) {
  return (
    <div className='loginMain'>
      <div>
        <h1>LogIn</h1>
        <input
          type='text'
          placeholder='Your Name'
          onChange={(e) => setUsername(e.target.value)}
        />
        <Link to='/chat' className='loginBTN'>
          Login
        </Link>
      </div>
    </div>
  );
}
