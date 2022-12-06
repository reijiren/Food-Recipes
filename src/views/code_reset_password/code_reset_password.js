import React from "react";

import {Link} from 'react-router-dom';
import LoginLogo from "../../component/LoginLogo";

const codeReset = () => {
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <LoginLogo />
                <div className="input-container col-lg-6 col-md-6">
                    <div className="col-md-9 col-sm-12 form-box">
                        <form>
                            <div className=" row gap-2">
                                <div>
                                    <label htmlFor="code">Code 6 Digit</label>
                                </div>
                                <div className="form-input input-form">
                                    <input type="text" placeholder="" required/>
                                </div>
                                <div>
                                    <Link to="/resetpassword" className="btn btn-primary w100" type="submit">Reset Password</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default codeReset;