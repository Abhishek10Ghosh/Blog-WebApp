import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {

  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
  })

  const [err,setError] = useState(null);
  const naivgate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({...prev,[e.target.name] : e.target.value }))

  }

  const handleSubmit = async e => {
    // console.log(inputs)
    e.preventDefault() // to avoid refresh on submit
    try {
      // http://localhost:8800/api/auth/register
      // try proxy in package.json to give relative path instead of direct path
      // set up proxy to save cookies in local storage

      await axios.post("/auth/register",inputs)
      naivgate("/login")

      // const res = await axios.post("http://localhost:8800/api/auth/register",inputs)
      // console.log(res);
    } catch (err) {
      // console.log(err);
      setError(err.response.data)
    }


  }


  return (
    <div className='auth'>
    <h1> Register</h1>
    <form>
      <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
      <input required type='email' placeholder='email' name='email' onChange={handleChange} />
      <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
      <button onClick={handleSubmit}> Register</button>
      {err && <p>{err}</p> }
      <span>Do you have an account? <Link to="/login">Login</Link></span>
    </form>
  </div>
  )
}

export default Register
