import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import LoginLogo from "../../component/LoginLogo";
import { checkEmail } from "../../redux/action/user";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(email == ""){
            alert("Input field must be filled");
        }else{
            const handleSuccess = (data) => {
                if(data.data.status !== "success"){
                    alert(data.data.message);
                }else if(data.data.data == ""){
                    alert("Email is not registered");
                }else{
                    localStorage.setItem("id", data.data.data[0].id);
                    return navigate("/resetpassword")
                }
            }
            checkEmail(email, handleSuccess);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <LoginLogo />
                <div className="input-container col-lg-6 col-md-6">
                    <div className="col-md-9 col-sm-12 form-box">
                        <div className="heading mb-3">Forgot Password?</div>
                        <div className="heading-2 mb-5">We just need your registered e-mail address
                            to send your password resend</div>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className=" row gap-2">
                                <div>
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="email" placeholder="examplexxx@gmail.com" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary w100">Send E-mail</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;