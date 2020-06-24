import {createStore, combineReducers} from 'redux';
import mealsReducer from './meals/meals.reducer';

const rootReducer = combineReducers({
    Meals: mealsReducer
})
const store = createStore(rootReducer)

export default store;