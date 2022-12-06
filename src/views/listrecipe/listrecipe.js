import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../component/Footer";
import { getListRecipe } from "../../redux/action/recipe";

const ListRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.thisUser);

    const [queryParam] = useSearchParams();
    const title = queryParam.get('title');
    const page = queryParam.get('page');
    const sort = queryParam.get('sort');
    const asc = queryParam.get('asc');
    
    const pagination = parseInt(page);

    const [search, setSearch] = useState(title);

    const recipe = useSelector((state) => {
        return state.recipe;
    })

    console.log(recipe.data)

    const token = localStorage.getItem('token');

    const onButton = (type) => {
        switch(type){
            case 'next':
                return navigate(`/recipe?title=${title}&sort=${sort}&page=${pagination + 1}&asc=${asc}`);
            case 'prev':
                return navigate(`/recipe?title=${title}&sort=${sort}&page=${pagination - 1}&asc=${asc}`);
            case 'sort': {
                let thisSort;
                if(sort == 'id') thisSort = 'name'; else thisSort = 'id';
                return navigate(`/recipe?title=${title}&sort=${thisSort}&page=${pagination}&asc=${asc}`);
            }
            case 'asc': {
                let thisAsc;
                if(asc == 'desc') thisAsc = 'asc'; else thisAsc = 'desc';
                return navigate(`/recipe?title=${title}&sort=${sort}&page=${pagination}&asc=${thisAsc}`);
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        return navigate(`/recipe?title=${search}&sort=${sort}&page=${pagination}&asc=${asc}`);
    }

    useEffect(() => {
        dispatch(getListRecipe(title, sort, page, asc))
    }, [queryParam])
    
    return(
        <>
        <div className="container-fluid">
            <nav className="navbar">
                <div className="main-menu" style={{backgroundColor: 'white'}}>
                    <ul>
                        <li>
                            <Link to="/" className="currentPage">Home</Link>
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
                                                src={`${process.env.REACT_APP_BACKEND_URL}/profile/${user.image}`}
                                                alt={`${user.name}`}
                                                height={30}
                                                width={30}
                                            />
                                        </div>
                                    )
                                }
                                {!token ? (<div>Login</div>) : (<div style={{color: 'black'}}>{user.name}</div>)}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="d-flex flex-column gap-2 text-center pt-4" width='100%'>
            <h1>SEARCH RESULT</h1>
            <div className="d-flex flex-row justify-content-center">
                <h4>search: </h4>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input type="text" placeholder="search recipe" onChange={(e) => setSearch(e.target.value)} defaultValue={title} />
                </form>
            </div>
        </div>
        {
            recipe.isLoading ? (
                <h1>Loading</h1>
            ) : recipe.isError ? (
                <h1>Error</h1>
            ) : recipe.data == '' ? (
                <p>Data not found</p>
            ) : (
                recipe.data.map((item, index) => (
                    <div key={index}>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/recipes/${item.recipeimg}`} alt={`pic of ${item.title}`} width='100px' height='100px'/>
                        <Link to={`/detailrecipe?id=${item.recipeid}`} key={index} className="p-2">{item.title}</Link>
                        <hr />
                    </div>
                ))
            )
        }
        <div className="d-flex gap-1 p-2 mb-4">
            <button onClick={() => onButton('prev')} disabled={pagination === 1}>prev</button>
            <button onClick={() => onButton('next')} disabled={recipe.data == ''}>next</button>
            <button onClick={() => onButton('sort')}>sortby: {sort === 'id' ? 'Date Created' : 'Title'}</button>
            <button onClick={() => onButton('asc')}>{asc.toUpperCase()}</button>
        </div>
        <Footer/>
        </>
    )
}

export default ListRecipe;