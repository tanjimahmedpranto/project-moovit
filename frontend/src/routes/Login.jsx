import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { default as logo } from '../assets/muuvitLogo.svg';

function Login() {
  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-light'>
     <div className='form_container p-5 rounded bg-white shadow px-10'>
     <img src={logo} width={100} height={100} className='rounded mx-auto d-block' />
     <br />
      <form action="">
        <h3>Sign In</h3>
        <div className='mb-2'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='abc@email.com' className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password' className='form-control'/>
        </div>
        <div className='mb-2'>
          <input type="checkbox" className='custom-control custom-checkbox' id='check' />
          <label htmlFor="check" className='custom-input-label ms-2'>
            Remember me
          </label>
        </div>
        <div className='d-grid'>
          <button className='btn btn-primary'>Sign In</button>
        </div>
        <p className='text-end mt-2'>
          Forgot <a href="">Password?</a> <Link to ="/signup" className='ms-2'>Sign up</Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default Login