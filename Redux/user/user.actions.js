

export const userTypes = {
    REMOVE_FAV_MEAL: 'REMOVE_FAV_MEAL',
    ADD_FAV_MEAL: 'ADD_FAV_MEAL'
}

export const removeFavMeal = (meal) =>({
    type: userTypes.REMOVE_FAV_MEAL,
    payload: meal
})

export const addFavMeal = (meal) =>{
    return({
        type: userTypes.ADD_FAV_MEAL,
        payload: meal
    })

}
