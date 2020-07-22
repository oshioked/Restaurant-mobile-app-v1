export const mealTypes = {
    FETCH_TODAYS_MOST_ORDERED: 'FETCH_MOST_ORDERED',
    FETCH_CAT_MEALS: 'FETCH_CAT_MEALS',
    FETCH_USER_FAV_MEALS: 'FETCH_FAV_MEALS'
}

export const fetchMostOrdered = () => async (dispatch) =>{
    try {
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/meals/topOrdered');
        const data = await response.json();

        dispatch({
            type: mealTypes.FETCH_TODAYS_MOST_ORDERED,
            payload: data
        })
    } catch (error) {
        throw error
    }
}

export const fetchCategoryMeals = (catId, searchQuery) => async (dispatch) =>{
    const url = Boolean(searchQuery) ? `https://first-food-delivery-rn-app.herokuapp.com/meals/category/${catId}?searchQuery=${searchQuery}` : `https://first-food-delivery-rn-app.herokuapp.com/meals/category/${catId}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({
            type: mealTypes.FETCH_CAT_MEALS,
            payload: {
                categoryMeals: data,
                categoryId: catId
            }
        })
    } catch (error) {
        throw error;
    }
}

export const fetchUsersFavMeals = () => async (dispatch, getState) =>{
    const state = getState();
    const favMealsIds = state.user.favoriteMeals;
    const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/meals/favMeals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favMealsIds)
    })

    const data = await response.json();

    dispatch({
        type: mealTypes.FETCH_USER_FAV_MEALS,
        payload: data
    })
}