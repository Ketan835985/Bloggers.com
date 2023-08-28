import { useState } from 'react'
import './UserReg.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserReg() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
    })


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    function createUser(){
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                if(data.status === false){
                    toast.error(data.message)
                }else{
                    toast.success("Successfully")
                }
            })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        if (formData.fname === "" || formData.lname === "" || formData.email === "" || formData.password === "" || formData.phone === "" || formData.title === "" ) {
            toast.error("All fields are required")
        }
        else{
            createUser();
        }
    }
    return (
        <div className="container-res">
            <h2 className='heading'> Registration  Page</h2>
            <form className='form' onSubmit={handelSubmit}>
                <div className='res-container'>
                    <div className='separate'>
                        <label htmlFor="title">Title :</label>
                        <select name="title" id="title" onChange={handleChange}>
                            <option >....</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                        </select>
                    </div>
                    <div className='separate'>
                        <label htmlFor="fname">First Name :</label>
                        <input type="text"
                            id='fname'
                            className='fname'
                            name='fname'
                            autoComplete='auto'
                            placeholder='Enter your First name'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='separate'>
                        <label htmlFor="lname">Last Name :</label>
                        <input type="text"
                            id='lname'
                            className='lname'
                            name='lname'
                            autoComplete='auto'
                            placeholder="Enter Your Last name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='separate'>
                        <label htmlFor="email">Email ID :</label>
                        <input
                            id='email'
                            type="email"
                            className='email-res'
                            name='email'
                            autoComplete='email'
                            placeholder="Enter Your Email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='separate'>
                        <label htmlFor="phone">Mobile Num :</label>
                        <input
                            type="text"
                            id='phone'
                            className='phone'
                            name='phone'
                            autoComplete='phone'
                            placeholder="Enter Your Phone Number"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='separate'>
                        <label htmlFor="password">Password :</label>
                        <input
                            type="password"
                            id='password'
                            className='password'
                            name='password'
                            placeholder="Enter Your Password"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className='btn'>Submit</button>
                </div>
            </form>
            <a href='/login' className='login-link'><h4>Already have an account?</h4></a>
            <ToastContainer />
        </div>
    )
}
