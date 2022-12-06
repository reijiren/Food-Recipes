import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import LoginLogo from "../../component/LoginLogo";
import { updateUser } from "../../redux/action/user";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        password: '',
        pwconfirm: '',
    })

    const [id, setId] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('id');

        if(!id){
            return navigate('/forgotpassword');
        }else{
            return setId(id);
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if(form.password == '' || form.pwconfirm == ''){
            alert('Input field must be filled');
        }else if(form.password !== form.pwconfirm){
            alert('Password is not matched');
        }else{
            const body = {
                password: form.password,
            }

            const handleSuccess = (data) => {
                if(data.data.status === "success"){
                    alert('Password changed successfully')
                    return navigate("/login");
                }else{
                    alert(data.data.message);
                }
            }

            dispatch(updateUser(id, body, handleSuccess));
        }
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <LoginLogo />
                <div className="input-container col-lg-6 col-md-6">
                    <div className="col-md-9 col-sm-12 form-box">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className=" row gap-2">
                                <div>
                                    <label htmlFor="password">New Password</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="password" placeholder="New Password" onChange={(e) => setForm({...form, password: e.target.value})} required/>
                                </div>
                                <div>
                                    <label htmlFor="password">Confirm New Password</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="password" placeholder="Confirm New Password" onChange={(e) => setForm({...form, pwconfirm: e.target.value})} required/>
                                </div>
                            </div>
                            <div className="my-2">
                                <div>
                                    <button type="submit" className="btn btn-primary w100">Reset Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;