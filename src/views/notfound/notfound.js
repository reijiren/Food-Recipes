import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <>
        <div style={{textAlign: 'center'}} className="pt-2">
            <h1 style={{fontSize: '56px'}}>Halaman tidak ditemukan!</h1>
            <Link to="/" className="btn btn-primary">Kembali ke Home</Link>
        </div>        
        </>
    )
}

export default NotFound;