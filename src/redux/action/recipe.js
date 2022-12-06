import axios from "axios";

export const allRecipe = (handleSuccess) => ({
    type: 'GET_ALL_RECIPES',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getRecipe = (id, handleSuccess) => ({
    type: 'GET_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/${id}`)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const addRecipe = (form, token, handleSuccess) => ({
    type: 'ADD_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipe/insert`, form)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const updateRecipe = (id, form, handleSuccess) => ({
    type: 'UPDATE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/recipe/${id}`, form)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const updateImage = (id, form, handleSuccess) => ({
    type: 'UPDATE_IMG_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/recipe/changeimg/${id}`, form)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const deleteRecipe = (id, handleSuccess) => ({
    type: 'DELETE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipe/${id}`)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getOwned = (id, handleSuccess) => ({
    type: 'GET_OWNED',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/owned/${id}`)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getLiked = (id, handleSuccess) => ({
    type: 'GET_LIKED',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/liked/${id}`)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getSaved = (id, handleSuccess) => ({
    type: 'GET_SAVED',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/saved/${id}`)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const listRecipe = (title, sort, page, asc, handleSuccess) => ({
    type: 'LIST_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${page}?title=${title}&sort=${sort}&asc=${asc}`)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getListRecipe = (title, sort, page, asc) => {
    return{
        type: 'GET_LIST_RECIPE',
        payload: axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/recipes/${page}?title=${title}&sort=${sort}&asc=${asc}`,
            method: 'GET',
        }),
    }
}