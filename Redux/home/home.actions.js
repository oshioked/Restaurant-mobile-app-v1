export const homeTypes = {
    FETCH_HEADER: 'FETCH_HEADER'
}

export const fetchHeader = () => async (dispatch) =>{
    try {
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/home/header');
        const data = await response.json();
        dispatch({
            type: homeTypes.FETCH_HEADER,
            payload: data
        })
    } catch (error) {
        throw error;
    }
    
}   
