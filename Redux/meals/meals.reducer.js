import { mealTypes } from "./meals.action";
import { userTypes } from "../user/user.actions";
import Meal from "../../models/Meal";


const initialState = {
    mostOrderedMeals: [],
    categoryMeals: {},
    userFavMeals: []
}


// MEALS RESULTS FROM SERVER HAVE DIFFERENT OBJECT STRUCTURE. SO THIS CONVERTS THEM TO THE STRUCTURE ACCEPTED IN THIS NEIGHBORHOOD
export const getMeals = (mealsResult) =>(
    mealsResult.map(meal => (
        new Meal(
            meal.id,
            meal.title,
            meal.imageurl,
            meal.price,
            meal.description,
            meal.categories,
            meal.readytime
        )
    ))
)


const mealsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case mealTypes.FETCH_TODAYS_MOST_ORDERED:
            return({
                ...state,

                mostOrderedMeals: getMeals(action.payload)
            })
        case mealTypes.FETCH_CAT_MEALS:
            const {categoryMeals, categoryId} = action.payload;
            console.log(getMeals(categoryMeals))
            state.categoryMeals[categoryId] = getMeals(categoryMeals);
            return({
                ...state,
            })
        case mealTypes.FETCH_USER_FAV_MEALS:
            const meals = getMeals(action.payload);
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