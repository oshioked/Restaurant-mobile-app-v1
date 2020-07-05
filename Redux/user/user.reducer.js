import { userTypes } from "./user.actions";
import User from "../../models/user";

const initialState = {
    id: 'u1',
    name: 'Iyogwoya Daniel Oshioke',
    email: 'Danieloshos3@gmail.com',
    phoneNo: '08056055305',
    bonusPercentage: 0.5,
    address: 'No 16 origbo drive, off kotokoto layout, Udu',
    cityState: 'Warri/Delta',
    favoriteMeals: ['m1', 'm5', 'm10', 'm3', 'm2'],
    orders: ['o1', 'o2', 'o3', 'o4', 'o5']
}

const userReducer = (state = initialState, action) =>{
    switch (action.type) {
        case userTypes.REMOVE_FAV_MEAL:
            const meal = action.payload;
            const mealId = meal.id;
            let newFavoriteMeals = state.favoriteMeals.filter(id => id != mealId);
            return({
                ...state,
                favoriteMeals: newFavoriteMeals
            })

        case userTypes.ADD_FAV_MEAL:
            const newMeal = action.payload;
            const newMealId = newMeal.id;
            let updatedFavMeals = [newMealId].concat(state.favoriteMeals);
            return({
                ...state,
                favoriteMeals: updatedFavMeals
            })
        default:
            return state;
    }
}

export default userReducer;