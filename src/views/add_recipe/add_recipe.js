import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import { addRecipe } from "../../redux/action/recipe";

const AddRecipe = () => {
    const hiddenFileInput = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.thisUser);

    const token = localStorage.getItem('token');

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const [form, setForm] = useState({
        title: '',
        ingredient: '',
        image: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        let dataForm = new FormData();
        dataForm.append('title', form.title);
        dataForm.append('ingredient', form.ingredient);
        dataForm.append('image', form.image);
        dataForm.append('owner', user.id);

        const handleSuccess = (data) => {
            console.log(data.data);
            
            if(data.data.status !== 'success'){
                alert(data.data.message);
            }else {
                alert('Recipe added successfully!');
                return navigate('/');
            }
        }

        dispatch(addRecipe(dataForm, token, handleSuccess));
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
                            <Link to="#" className="currentPage">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="add-recipe-container">
            <div className="add-recipe-form">
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="add-photo rounded-2">
                        <i id="img" htmlFor="image" name="image" className="fa fa-image"></i>
                        <input onChange={(e) => {setForm({...form, image: e.target.files[0]})}} type="file" ref={hiddenFileInput} id="formFile" style={{ display: 'none' }} />
                        <p name="image" htmlFor="image" onClick={handleClick} id="img">
                            {form.image == '' ? 'Add Photo' : form.image.name}
                        </p>
                    </div>
                    <div className="add-title rounded-2">
                        <input type="text" placeholder="Title" onChange={(e) => setForm({...form, title: e.target.value})} required/>
                    </div>
                    <div className="add-ingredient rounded-2">
                        <textarea placeholder="Ingredients" onChange={(e) => setForm({...form, ingredient: e.target.value})} required></textarea>
                    </div>
                    {/* <div className="add-title rounded-2">
                        <input type="text" placeholder="Video"/>
                    </div> */}
                    <div className="post-new-recipe">
                        <button type="submit" className="btn btn-primary">Post</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default AddRecipe;