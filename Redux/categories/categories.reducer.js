import {categoriesTypes} from './categories.actions';

const initialState = {
    allCategories: []
}

const categoriesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case categoriesTypes.FETCH_ALL:
            return({
                allCategories: action.payload
            })
        default:
            return state;
    }
}

export default categoriesReducer;