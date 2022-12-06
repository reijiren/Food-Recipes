import { combineReducers } from 'redux';

import recipeReducer from './recipe'
import userReducer from './user';

const rootReducer = combineReducers({
    user: userReducer,
    recipe: recipeReducer,
})

export default rootReducer;