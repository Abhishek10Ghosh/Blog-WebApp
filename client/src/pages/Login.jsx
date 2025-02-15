import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext'

const Login = () => {

  const [inputs,setInputs] = useState({
    username:"",
    password:"",
  })

  const [err,setError] = useState(null);
  const naivgate = useNavigate()

  const {currentUser, login} = useContext(AuthContext);
  // console.log(currentUser);



  const handleChange = e => {
    setInputs(prev => ({...prev,[e.target.name] : e.target.value }))

  }

  const handleSubmit = async e => {
    // console.log(inputs)
    e.preventDefault() // to avoid refresh on submit
    try {
      await login(inputs);
      // console.log(currentUser)
      // http://localhost:8800/api/auth/register

      // await axios.post("http://localhost:8800/api/auth/login",inputs)
      naivgate("/")

      // const res = await axios.post("http://localhost:8800/api/auth/register",inputs)
      // console.log(res);
    } catch (err) {
      // console.log(err);
      setError(err.response.data)
    }


  }



  return (
    <div className='auth'>
      <h1> Login</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handleChange} />
        <input required type='password' placeholder='password' name='password' onChange={handleChange} />
        <button onClick={handleSubmit}> Login</button>
        {err && <p>{err}</p> }
        <span>Don't have an account <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login
