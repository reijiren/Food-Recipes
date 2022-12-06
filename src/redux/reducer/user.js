const initialState = {
    data: [],
    thisUser: {},
    isLoading: false,
    isError: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_LIST_USER_PENDING":
            return {...state, isLoading: true, isError: false};
        case "GET_LIST_USER_FULFILLED":
            return {...state, isLoading: false, isError: false, data: action.payload.data.data};
        case "GET_LIST_USER_REJECTED":
            return {...state, isLoading: false, isError: true};
        case "LOGIN_PENDING":
            return {...state, isLoading: true, isError: false};
        case "LOGIN_FULFILLED":
            return {...state, isLoading: false, isError: false, thisUser: action.payload.data.data};
        case "LOGIN_REJECTED":
            return {...state, isLoading: false, isError: true};
        case "UPDATE_PENDING":
            return {...state, isLoading: true, isError: false};
        case "UPDATE_FULFILLED":
            return {...state, isLoading: false, isError: false, thisUser: action.payload.data.data[0]};
        case "UPDATE_REJECTED":
            return {...state, isLoading: false, isError: true};
        case "UPDATE_IMG_PENDING":
            return {...state, isLoading: true, isError: false};
        case "UPDATE_IMG_FULFILLED":
            return {...state, isLoading: false, isError: false, thisUser: action.payload.data.data[0]};
        case "UPDATE_IMG_REJECTED":
            return {...state, isLoading: false, isError: true};
        default:
            return state;
    }
}

export default userReducer;