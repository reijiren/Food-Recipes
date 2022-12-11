import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import LoginLogo from "../../component/LoginLogo";
import { login } from "../../redux/action/user";

const Login = () =>{
    const dispatch = useDispatch();

    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        localStorage.clear();
    }, [])

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(form.email == "" || form.password == ""){
            alert("All input field must be filled!");
        }else{
            const handleSuccess = (data) => {
                if(data.data.status !== "success"){
                    alert(data.data.message);
                }else{
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("level", data.data.data.level);
                    alert("Login success")
                    return navigate("/");
                }
            }

            dispatch(login(form, handleSuccess));
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <LoginLogo />
                    <div className="input-container col-lg-6 col-md-6">
                        <div className="col-md-9 col-sm-12 form-box">
                            <div className="heading mb-3">Welcome (2)</div>
                            <div className="heading-2 mb-4">Log in into your existing account</div>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className=" row gap-2">
                                    <div>
                                        <label htmlFor="email">E-mail</label>
                                    </div>
                                    <div className="form-input input-form">
                                        <input type="text" placeholder="examplexxx@gmail.com" onChange={handleChange} name="email" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-input input-form">
                                        <input type="password" placeholder="Password" onChange={handleChange} name="password" required />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="d-flex">
                                        <div className="d-flex custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="cb1" required />
                                            <label className="custom-control-label" htmlFor="cb1">I agree to terms & conditions</label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <button type="submit" className="btn btn-primary w100">{user.isLoading ? 'Loading...' : 'Log In'}</button>
                                    </div>
                                </div>
                            </form>
                            <div className="text-right mb-2">
                                <Link to="/forgotpassword" className="forgotpw">Forgot Password ?</Link>
                            </div>
                            <div className="text-center signup-label">
                                Don't have an account?&nbsp;&nbsp;
                                <Link to="/register" className="register">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;