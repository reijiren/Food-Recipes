import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../component/Footer";
import { getList } from "../../redux/action/user";

const ListUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [queryParam] = useSearchParams();
    const name = queryParam.get('name') || "";
    const page = queryParam.get('page') || 1;
    const sort = queryParam.get('sort') || "name";
    const asc = queryParam.get('asc') || "asc";
 
    const pagination = parseInt(page);

    const [search, setSearch] = useState(name);

    const user = useSelector((state) => {
        return state.user;
    })

    console.log(user)
    const token = localStorage.getItem('token');

    const onButton = (type) => {
        switch(type){
            case 'next':
                return navigate(`/user?name=${name}&sort=${sort}&page=${pagination + 1}&asc=${asc}`);
            case 'prev':
                return navigate(`/user?name=${name}&sort=${sort}&page=${pagination - 1}&asc=${asc}`);
            case 'sort': {
                let thisSort;
                if(sort == 'date_created') thisSort = 'name'; else thisSort = 'date_created';
                return navigate(`/user?name=${name}&sort=${thisSort}&page=${pagination}&asc=${asc}`);
            }
            case 'asc': {
                let thisAsc;
                if(asc == 'desc') thisAsc = 'asc'; else thisAsc = 'desc';
                return navigate(`/user?name=${name}&sort=${sort}&page=${pagination}&asc=${thisAsc}`);
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        return navigate(`/user?name=${search}&sort=${sort}&page=${pagination}&asc=${asc}`);
    }

    useEffect(() => {
        console.log(name + sort + page + asc)
        dispatch(getList(name, sort, page, asc))
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
                                                src={`${process.env.REACT_APP_BACKEND_URL}/profile/${user.thisUser.image.split('|&&|')[0]}`}
                                                alt={`${user.thisUser.name}`}
                                                height={30}
                                                width={30}
                                            />
                                        </div>
                                    )
                                }
                                {!token ? (<div>Login</div>) : (<div style={{color: 'black'}}>{user.thisUser.name}</div>)}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="d-flex flex-column gap-2 text-center pt-4" width='100%'>
            <h1 style={{textAlign: 'center', fontSize: '56px'}}>LIST USER</h1>
            <div className="d-flex flex-row justify-content-center">
                <h4>search: </h4>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input type="text" placeholder="search user" onChange={(e) => setSearch(e.target.value)} defaultValue={name} />
                </form>
            </div>
        </div>
        {
            user.isLoading ? (
                <h1>Loading</h1>
            ) : user.isError ? (
                <h1>Error</h1>
            ) : user.data !== null && user.data == '' ? (
                <p>Data tidak ditemukan</p>
            ) : (
                user.data.map((item, index) => (
                    <div key={index}>
                        <Link to={`/user/${item.id}`} key={index} className="p-2">{item.name} || {item.email}</Link>
                        <hr />
                    </div>
                ))
            )
        }
        <div className="d-flex gap-1 p-2 mb-4">
            <button onClick={() => onButton('prev')} disabled={pagination === 1}>prev</button>
            <button onClick={() => onButton('next')} disabled={user.data == ''}>next</button>
            <button onClick={() => onButton('sort')}>sortby: {sort}</button>
            <button onClick={() => onButton('asc')}>{asc}</button>
        </div>
        <Footer/>
        </>
    )
}

export default ListUser;