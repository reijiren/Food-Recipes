import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import { allRecipe, getRecipe, listRecipe } from "../../redux/action/recipe";

const Home = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const user = useSelector((state) => state.user.thisUser);

    const [form, setForm] = useState({
        title: '',
    })

    const [popular, setPopular] = useState([]);
    const [newRec, setNewRec] = useState({});
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const handleNew = (res) => {
            setNewRec(res.data.data[0] || {});
        }
        listRecipe('', 'id', 1, 'desc', handleNew);

        const handlePopular = (res) => {
            setPopular(res.data.data || []);
        }
        listRecipe('', 'id', 1, 'desc', handlePopular);

        const handleRecipes = (res) => {
            setRecipes(res.data.data || []);
        }
        listRecipe('', 'id', 1, 'asc', handleRecipes);
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if(form.title !== ""){
            return navigate(`/recipe?title=${form.title}&sort=title&page=1&asc=asc`)
        }
    }

    return (
        <div className="landing-body">
            <div className="container-fluid">
                <nav className="navbar">
                    <div className="main-menu">
                        <ul>
                            <li>
                                <Link to="#" className="currentPage">Home</Link>
                            </li>
                            <li>
                                <Link to="/addrecipe">Add Recipe</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="login-menu">
                        <ul>
                            <li>
                                <Link to="/login" className="login">
                                    {
                                        !token ? (
                                            <div className="icon"><i className="far fa-user"></i></div>
                                        ) : (
                                            <div className="icon">
                                                <img 
                                                    src={`${process.env.REACT_APP_BACKEND_URL}/profile/${user.image.split('|&&|')[0]}`}
                                                    alt={`${user.name}`}
                                                    height={30}
                                                    width={30}
                                                />
                                            </div>
                                        )
                                    }
                                    {!token ? (<div>Login</div>) : (<div>{user.name}</div>)}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <section className="hero">
                    <div className="content">
                        <div className="jumbroton">
                            <form onSubmit={(e) => onSubmit(e)}>
                                <h1>Discover Recipe & Delicious Food</h1>
                                <div className="form-group">
                                    <i className="fa fa-search"></i>   
                                    <input type="search" className="form-control rounded" placeholder="Search Recipe" width="400px" height="100px" onChange={(e) => setForm({...form, title: e.target.value})} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="food-image">
                        <img src={require(`../../assets/img/seledri.png`)} style={{top: '50px', right: '50px'}} />
                        <img src={require(`../../assets/img/—Pngtree—delicious food_568171 1.png`)} />
                    </div>
                </section>
            </div>
            <div className="container-fluid">
                <div className="popular">
                    <div className="yellow-line"></div>
                    <div className="title"><h2>Popular For You !</h2></div>
                </div>
                <div className="popular-content">
                    {
                        popular.length !== 0 ? popular.map((e) => (
                            <Link key={e.recipeid} to={`/detailrecipe?id=${e.recipeid}`} className="bg-image1 rounded mx-3" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${e.recipeimg.split('|&&|')[0]}')`}}>
                                <h4><b>{e.title}</b></h4>
                            </Link>
                        )) : (
                            <div>Loading...</div>
                        )
                    }
                </div>
            </div>
            <div className="container-fluid">
                <div className="new-recipe">
                    <div className="yellow-line"></div>
                    <div className="title"><h2>New Recipe</h2></div>
                </div>
                <div className="new-recipe-content">
                    <div className="yellow-bg"></div>
                    {
                        Object.keys(newRec).length !== 0 ? (
                            <>
                            <div className="nr-image rounded" style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${newRec.recipeimg.split('|&&|')[0]}')`}}></div>
                            <div className="new-rec-desc">
                                <div>
                                    <h3>Healthy {newRec.title} (Quick & Easy)</h3>
                                </div>
                                <div className="nr-line"></div>
                                <div>
                                    <p>Quick + Easy {newRec.title} - Healthy {newRec.title} in a hurry? That’s right!</p>
                                </div>
                                <div>
                                    <Link to={`/detailrecipe?id=${newRec.recipeid}`} className="btn btn-primary">Learn More</Link>
                                </div>
                            </div>
                            </>
                        ) : (
                            <div className="nr-image rounded">Loading...</div>        
                        )
                    }
                </div>
            </div>
            <div className="container-fluid">
                <div className="popular-rec">
                    <div className="yellow-line"></div>
                    <div className="title"><h2>Popular Recipe</h2></div>
                </div>
                <div className="popular-recipe-content">
                    {
                        recipes.length !== 0 ? recipes.map((e) => (
                            <Link key={e.recipeid} className="pr-image11 rounded" to={`/detailrecipe?id=${e.recipeid}`} style={{backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}/recipes/${e.recipeimg.split('|&&|')[0]}')`}}>
                                <h4><b>{e.title}</b></h4>
                            </Link>
                        )) : (
                            <div>Loading...</div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;