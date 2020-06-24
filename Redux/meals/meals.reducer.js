import CATEGORIES from "../../dummyData/categories";
import MEALS from "../../dummyData/meals";

const initialState = {
    categories: CATEGORIES,
    meals: MEALS
}

const mealsReducer = (state = initialState, action) =>{
    return state;
}

export default mealsReducer;