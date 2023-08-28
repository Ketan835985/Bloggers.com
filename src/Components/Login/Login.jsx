import { useState } from 'react';
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/Loader';



export default function Login() {
    const [loader, setLoader] = useState(true)
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    function userLogin() {
        setLoader(false)
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === true) {
                    toast.success('Login Successful')
                    localStorage.setItem('token', data.data.token)
                    setLoader(true)
                    setUserData({
                        email: '',
                        password: '',
                    })
                    window.location.href = '/blogList'
                } else {
                    toast.error(data.message)
                    setLoader(true)
                }
            })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        userLogin()
    }

    return (
        <div>{loader ? <div className='login-container'>
            < h1 className='login-title' > Login Here</h1 >
            <form className='login-form' onSubmit={handelSubmit}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label htmlFor="login-email" className='email'>Email ID : </label>
                    <input
                        className='login-email'
                        type="email"
                        id='login-email"'
                        placeholder="Enter your email"
                        name="email"
                        value={userData.email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div style={{ display: "flex", marginRight: "15px", justifyContent: "space-between" }}>
                    <label htmlFor="login-password" className='pwd'> Password :</label>
                    <input
                        className='login-password'
                        type="password"
                        id='login-password'
                        placeholder="Enter your password"
                        name="password"
                        value={userData.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <button className='login-btn' type='submit'>Login</button>
            </form>
            <span className='login-link-container'>
                <a href='#' className='login-link'>Forgot Password?</a>
                <a href='/register' className='sign-link' >SIGN UP</a>
            </span>
            <ToastContainer />
        </div > : <Loader />}
        </div>)
}
