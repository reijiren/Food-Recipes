const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

const recipeReducer = (state=initialState, action) => {
    switch(action.type){
        case "GET_LIST_RECIPE_PENDING":
            return {...state, isLoading: true, isError: false};
        case "GET_LIST_RECIPE_FULFILLED":
            return {...state, isLoading: false, isError: false, data: action.payload.data.data}
        case "GET_LIST_RECIPE_REJECTED":
            return {...state, isLoading: false, isError: true}
        default:
            return state;
    }
}

export default recipeReducer;