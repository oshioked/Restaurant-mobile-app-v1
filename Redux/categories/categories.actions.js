export const categoriesTypes = {
    FETCH_ALL: 'FETCH_ALL'
}

export const fetchAllCategories = ()=> async (dispatch)=>{
    try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();

        dispatch({
            type: categoriesTypes.FETCH_ALL,
            payload: data
        })
        
    } catch (error) {
        throw error;
    }
}