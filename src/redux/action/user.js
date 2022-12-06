import axios from "axios";

export const register = (form, handleSuccess) => ({
    type: 'REGISTER',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, form)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const login = (form, handleSuccess) => ({
    type: 'LOGIN',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, form)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const updateUser = (id, form, handleSuccess) => ({
    type: 'UPDATE',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, form)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const changeImg = (form, id, handleSuccess) => ({
    type: 'UPDATE_IMG',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/changeimg/${id}`, form)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const deleteUser = (id, handleSuccess) => ({
    type: 'DELETE_USER',
    payload: new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const checkEmail = (email, handleSuccess) => ({
    type: 'CHECK_EMAIL',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/email/${email}`)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getList = (name, sort, page, asc) => ({
    type: 'GET_LIST_USER',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${page}?name=${name}&sort=${sort}&asc=${asc}`)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getUser = (id) => {
    return{
        type: 'GET_LIST_USER',
        payload: axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/user/detail/${id}`,
            method: 'GET',
        }),
    }
}

export const like = (form) => ({
    type: 'LIKE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/like`, form)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const save = (form) => ({
    type: 'SAVE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/save`, form)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})