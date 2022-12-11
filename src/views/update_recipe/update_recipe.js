import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../component/Footer";
import { getRecipe, updateImage, updateRecipe } from "../../redux/action/recipe";

const UpdateRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const [form, setForm] = useState({
        title: '',
        ingredient: '',
        image: '',
        changeImg: false,
    })

    const upImage = (e) => {
        e.preventDefault();

        let dataForm = new FormData();
        dataForm.append('image', form.image);

        const handleSuccess = (data) =>{
            console.log(data);
        }

        dispatch(updateImage(id, dataForm, handleSuccess));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(form.title == '' || form.ingredient == ''){
            alert('Data must be filled');
        }else{
            const body = {
                title: form.title,
                ingredient: form.ingredient,
            }

            const handleSuccess = (data) =>{
                alert('Recipe updated successfully');
                return navigate(`/detailrecipe?id=${id}`);
            }

            dispatch(updateRecipe(id, body, handleSuccess));

            if(form.changeImg){
                upImage(e);
            }
        }
    }

    useEffect(() => {
        const handleSuccess = (data) => {
            setForm({
                ...form, 
                title: data.data.data[0].title, 
                ingredient: data.data.data[0].ingredient,
                image: data.data.data[0].recipeimg.split('|&&|')[0],
            });
        }

        dispatch(getRecipe(id, handleSuccess));
    }, [])

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
                    <div className="add-photo rounded-2 bg-transparent">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/recipes/${form.image.split('|&&|')[0]}`} alt={`pic of ${form.title}`} width='200px' height='200px'/>
                        <input onChange={(e) => {setForm({...form, image: e.target.files[0], changeImg: true})}} type="file" id="formFile" style={{fontSize: '16px', height: '40px', width: '250px'}} />
                    </div>
                    <div className="add-title rounded-2">
                        <input type="text" placeholder="Title" onChange={(e) => setForm({...form, title: e.target.value})} defaultValue={form.title} required/>
                    </div>
                    <div className="add-ingredient rounded-2">
                        <textarea placeholder="Ingredients" onChange={(e) => setForm({...form, ingredient: e.target.value})} defaultValue={form.ingredient} required></textarea>
                    </div>
                    <div className="post-new-recipe">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default UpdateRecipe;