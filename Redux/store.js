import {createStore, combineReducers, applyMiddleware} from 'redux';
import mealsReducer from './meals/meals.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import orderReducer from './orders/orders.reducer';
import categoriesReducer from './categories/categories.reducer';
import Thunk from 'redux-thunk';
import homeReducer from './home/home.reducer';



const rootReducer = combineReducers({
    Meals: mealsReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    categories: categoriesReducer,
    home: homeReducer
})
const store = createStore(rootReducer, applyMiddleware(Thunk))

export default store;