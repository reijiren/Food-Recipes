import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser } from "../../redux/action/user";

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const user = useSelector((state) => {
        return state.user;
    })

    useEffect(() => {
        dispatch(getUser(id));
    }, [])

    const onDelete = () => {
        const handleSuccess = (data) => {
            if(data.data.status !== "success"){
                alert(data.data.message);
            }else{
                alert('User has been removed');
                return navigate('/user?name=&sort=date_created&page=1&asc=desc')
            }
        }

        dispatch(deleteUser(id, handleSuccess));
    }

    return(
        <>
        <div style={{padding: '20px'}}>
        <h1>Account Information</h1>
            {
                user.isLoading ? (
                    <p>Loading</p>
                ) : user.isError ? (
                    <p>Error</p>
                ) : (
                    user.data.map((item) => (
                        <>
                        <p>Name          : {item.name}</p>
                        <p>E-mail        : {item.email}</p>
                        <p>Phone         : {item.phone}</p>
                        <p>Role          : {item.level === 0 ? 'Admin' : 'Customer'}</p>
                        <p>Image         :</p>
                        <img src={`${item.image.split('|&&|')[0]}`} alt={`pic of ${item.name}`} width='100px' height='100px'/>
                        <p>Date Created  : {item.date_created}</p>
                        </>
                    ))
                )
            }
            <button type="submit" className="btn btn-success" onClick={() => onDelete()}>Delete Account</button>
        </div>
        </>
    )
}

export default User;