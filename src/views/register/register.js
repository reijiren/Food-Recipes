import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import LoginLogo from "../../component/LoginLogo";
import { register } from "../../redux/action/user";

const Register = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        pwconfirm: '',
        level: 1,
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(form.name === "" || form.email === "" || form.phone === "" || form.password === "" || form.pwconfirm === ""){
            alert("All input field must be filled!");
        }else if(form.password !== form.pwconfirm){
            alert("Password is not match!")
        }else{
            const handleSuccess = (data) => {
                if(data.data.status !== "success"){
                    alert(data.data.message);
                }else{
                    alert('Register success!');
                    return navigate("/login")
                }
            }
            dispatch(register(form, handleSuccess))
        }
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <LoginLogo />
                <div className="input-container col-lg-6 col-md-6">
                    <div className="col-md-9 col-sm-12 form-box">
                        <div className="heading mb-3">Let's Get Started !</div>
                        <div className="heading-2 mb-4">Create new account to access all features</div>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className=" row gap-2">
                                <div>
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="text" placeholder="Name" onChange={handleChange} name="name" required/>
                                </div>
                                <div>
                                    <label htmlFor="email">Email Address</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="text" placeholder="Enter email address" onChange={handleChange} name="email" required/>
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="text" placeholder="08xxxxxxxxxx" onChange={handleChange} name="phone" required/>
                                </div>
                                <div>
                                    <label htmlFor="password">Create New Password</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="password" placeholder="Create New Password" onChange={handleChange} name="password" required/>
                                </div>
                                <div>
                                    <label htmlFor="password">Confirm New Password</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="password" placeholder="Confirm New Password" onChange={handleChange} name="pwconfirm" required/>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex">
                                    <div className="d-flex custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="cb1" required/>
                                        <label className="custom-control-label" htmlFor="cb1">I agree to terms & conditions</label>
                                    </div>
                                </div>
                                
                                <div>
                                    <button type="submit" className="btn btn-primary w100">Register Account</button>
                                </div>
                            </div>
                        </form>
                        <div className="text-center signup-label">
                            Already have account?&nbsp;&nbsp;
                            <Link to="/login" className="register">Log in Here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;