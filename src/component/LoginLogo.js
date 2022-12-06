import React from "react";

const LoginLogo = () => {
    return(
        <>
        <div className=" col-sm-6 col-md-6  align-item-center login-container">
            <div className="d-flex flex-column logo">
                <div><img src={require(`../assets/img/barbecue 1.png`)} alt="" /></div>
                <div><p>Mama Recipe.</p></div>
            </div>
            
        </div>
        </>
    )
}

export default LoginLogo;