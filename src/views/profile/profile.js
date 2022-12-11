import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import Footer from "../../component/Footer";
import { changeImg } from "../../redux/action/user";
import { useSelector, useDispatch } from "react-redux";
import { getLiked, getOwned, getSaved } from "../../redux/action/recipe";

const Profile = () => {
    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);

    const user = useSelector((state) => {
        return state.user.thisUser;
    })

    const [image, setImage] = useState(null);
    const [owned, setOwned] = useState([]);
    const [liked, setLiked] = useState([]);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const handleOwned = (res) => {
            setOwned(res.data.data);
        }
        getOwned(user.id, handleOwned);

        const handleLiked = (res) => {
            setLiked(res.data.data);
        }
        getLiked(user.id, handleLiked);

        const handleSaved = (res) => {
            setSaved(res.data.data);
        }
        getSaved(user.id, handleSaved);
    }, [])

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let dataForm = new FormData();
        dataForm.append('image', image);

        const handleSuccess = (data) => {
            console.log(data.data);
            if(data.data.status === 'success'){
                alert('Image updated successfully');
                window.location.reload();
            }else{
                alert(data.data.message);
            }
        }

        dispatch(changeImg(dataForm, user.id, handleSuccess));
    }

    return(
        <>
        <div className="container-fluid h100">
            <nav className="navbar">
                <div className="main-menu full">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/addrecipe">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="#" className="currentPage">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="profile-container">
            <div className="profile-picture rounded-circle" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/profile/${user.image.split('|&&|')[0]}')`}}>
                <button className="pencil-btn btn-primary" type="button" data-toggle="collapse" data-target="#edit-profile" aria-expanded="false" aria-controls="collapseExample"></button>
            </div>
            <div className="profile-name">
                {user.name}
            </div>
            <div className="collapse" id="edit-profile">
                <input onChange={(e) => setImage(e.target.files[0])} type="file" ref={hiddenFileInput} id="formFile" style={{ display: 'none' }} />
                <button className="btn btn-primary prof-btn cpp" id="img" onClick={handleClick}>Change Photo Profile</button>
                <button type="button" className="btn btn-primary prof-btn cp" onClick={(e) => onSubmit(e)} hidden={!image ? true : false}>OK</button>
                <Link to="/resetpassword" className="btn btn-primary prof-btn cp" hidden={image ? true : false}>Change Password</Link>
            </div>
        </div>
        <div className="recipe-container">
            <div className="recipe-panel-group" id="accordion">
                <div className="head-panel">
                    <a data-toggle="collapse" data-parent="#accordion" href="#my-collapse">My Recipe</a>
                    <a data-toggle="collapse" data-parent="#accordion" href="#s-collapse">Saved Recipe</a>
                    <a data-toggle="collapse" data-parent="#accordion" href="#l-collapse">Liked Recipe</a>
                </div>
                <div className="content-panel collapse in" id="my-collapse">
                    {
                        owned.length === 0 ? (
                            <div>No owned recipes!</div>
                        ) : owned.map((e) => (
                            <Link to={`/detailrecipe?id=${e.id}`} key={e.id} className="profile-recipe-img rounded-2" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${e.image.split('|&&|')[0]}')`}}>
                                <p><b>{e.title}</b></p>
                            </Link>
                        ))
                    }
                </div>
                <div className="content-panel collapse" id="s-collapse">
                    {
                        saved.length === 0 ? (
                            <div>No saved recipes!</div>
                        ) : saved.map((e) => (
                            <Link to={`/detailrecipe?id=${e.id}`} key={e.id} className="profile-recipe-img rounded-2" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${e.image.split('|&&|')[0]}')`}}>
                                <p><b>{e.title}</b></p>
                            </Link>
                        ))
                    }
                </div>
                <div className="content-panel collapse" id="l-collapse">
                    {
                        liked.length === 0 ? (
                            <div>No liked recipes!</div>
                        ) : liked.map((e) => (
                            <Link to={`/detailrecipe?id=${e.id}`} key={e.id} className="profile-recipe-img rounded-2" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${e.image.split('|&&|')[0]}')`}}>
                                <p><b>{e.title}</b></p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Profile;