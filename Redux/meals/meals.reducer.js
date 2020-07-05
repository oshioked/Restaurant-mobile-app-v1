
import { mealTypes } from "./meals.action";
import { userTypes } from "../user/user.actions";


const initialState = {
    mostOrderedMeals: [],
    categoryMeals: {},
    userFavMeals: []
}

const mealsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case mealTypes.FETCH_TODAYS_MOST_ORDERED:
            return({
                ...state,
                mostOrderedMeals: action.payload
            })
        case mealTypes.FETCH_CAT_MEALS:
            const {categoryMeals, categoryId} = action.payload;
            state.categoryMeals[categoryId] = categoryMeals;
            return({
                ...state,
            })
        case mealTypes.FETCH_USER_FAV_MEALS:
            const meals = action.payload;
            return({
                ...state,
                userFavMeals: meals
            })
        case userTypes.ADD_FAV_MEAL:
            const meal = action.payload;
            return({
                ...state,
                userFavMeals: [meal].concat(state.userFavMeals)
            })
        case userTypes.REMOVE_FAV_MEAL:
            const mealToRemove = action.payload;
            return({
                ...state,
                userFavMeals: state.userFavMeals.filter(meal => meal.id != mealToRemove.id)
            })
        default:
            return state;
    }
}

export default mealsReducer;