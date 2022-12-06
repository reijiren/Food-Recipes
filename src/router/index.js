import React from "react";

import { BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";

import Home from "../views/home/home";
import Login from "../views/login/login";
import AddRecipe from "../views/add_recipe/add_recipe";
import CodeResetPassword from "../views/code_reset_password/code_reset_password";
import DetailRecipe from "../views/detail_recipe/detail_recipe";
import DetailVideoRecipe from "../views/detail_vid_recipe/detail_vid_recipe";
import ForgotPassword from "../views/forgot_password/forgot_password";
import Profile from "../views/profile/profile";
import Register from "../views/register/register";
import ResetPassword from "../views/reset_password/reset_password";
import User from "../views/user/user";
import ListUser from "../views/listuser/listuser";
import ListRecipe from "../views/listrecipe/listrecipe";
import NotFound from "../views/notfound/notfound";
import UpdateRecipe from "../views/update_recipe/update_recipe";

import ScrollToTop from "../component/ScrollToTop";

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if(token){
        return <Outlet />
    }else{
        alert('Please log in');
        return <Navigate to='/login' />
    }
}

const AdminRoute = () => {
	const level = localStorage.getItem("level");

	if (level == 0) {
		return <Outlet />;
	} else {
		alert("You have no access to this site");
		return <Navigate to="/" />;
	}
};

const Router = () => {
    return(
        <BrowserRouter>
            <ScrollToTop/>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="codereset" element={<CodeResetPassword />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                    <Route path="register" element={<Register />} />
                    <Route path="resetpassword" element={<ResetPassword />} />
                    <Route path="addrecipe" element={<PrivateRoute />}>
						<Route index element={<AddRecipe />} />
					</Route>
                    <Route path="detailrecipe" element={<PrivateRoute />}>
						<Route index element={<DetailRecipe />} />
					</Route>
                    <Route path="detailrecipe/:id" element={<PrivateRoute />}>
						<Route index element={<UpdateRecipe />} />
					</Route>
                    <Route path="detailvideo" element={<PrivateRoute />}>
						<Route index element={<DetailVideoRecipe />} />
					</Route>
                    <Route path="profile" element={<PrivateRoute />}>
						<Route index element={<Profile />} />
					</Route>
                    <Route path="recipe" element={<PrivateRoute />}>
						<Route index element={<ListRecipe />} />
					</Route>
                    <Route path="user" element={<AdminRoute />}>
						<Route index element={<ListUser />} />
					</Route>
                    <Route path="user/:id" element={<AdminRoute />}>
						<Route index element={<User />} />
					</Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;