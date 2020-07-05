export const homeTypes = {
    FETCH_HEADER: 'FETCH_HEADER'
}

export const fetchHeader = () => async (dispatch) =>{
    try {
        const response = await fetch('http://localhost:5000/home/header');
        const data = await response.json();
        dispatch({
            type: homeTypes.FETCH_HEADER,
            payload: data
        })
    } catch (error) {
        throw error;
    }
    
}   
