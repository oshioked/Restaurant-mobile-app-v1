import { AsyncStorage } from "react-native"

// AUTHENTICATIONS
export const authTypes = {
    LOGIN_USER: 'LOGIN_USER',
    REGISTER_USER: 'REGISTER_USER',
    LOGOUT_USER: 'LOGOUT_USER'
}

// function to save user data on auth to device storage for auto login
const saveUserToStorage = async (data) =>{
    await AsyncStorage.setItem("userInfo", JSON.stringify(data));
};

const removeUserFromStorage = async () =>{
    await AsyncStorage.removeItem('userInfo');
}


// LOG IN ACTION
export const logIn = ({email, password}) => async (dispatch) =>{
    try {
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })  
        const data = await response.json(); 
        
        if(!response.ok){
            throw new Error(data)
        }

        dispatch({
            type: authTypes.LOGIN_USER,
            payload: data
        })        
        await saveUserToStorage(data);
        
    } catch (error) {
        throw error;
    }
}

// REGISTER ACTION
export const registerUser = ({fullName, email, phoneNumber, password}) => async (dispatch) =>{
    try {
        const response = await fetch('https://first-food-delivery-rn-app.herokuapp.com/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName, email, phoneNumber, password})
        })  
        const data = await response.json(); 
        
        if(!response.ok){
            throw new Error(data)
        }

        dispatch({
            type: authTypes.REGISTER_USER,
            payload: data
        })        
        await saveUserToStorage(data);
        
    } catch (error) {
        throw error;
    }
}

export const logOut = () => async (dispatch) =>{
    await removeUserFromStorage();
    dispatch({
        type: authTypes.LOGOUT_USER
    })
    
}


// OTHER USER ACTIONS
export const userTypes = {
    FETCH_USER_DATA: 'FETCH_USER_DATA',
    REMOVE_FAV_MEAL: 'REMOVE_FAV_MEAL',
    ADD_FAV_MEAL: 'ADD_FAV_MEAL',
    ADD_ORDER: 'ADD_ORDER',
    SAVE_ADDRESS: 'SAVE_ADDRESS',
    SAVE_IMAGE: 'SAVE_IMAGE'
}


// SAVE ADDRESS 
export const saveUserAddress = (address) => async (dispatch, getState) =>{
    const userId = getState().user.id;
    try {
        const response = await fetch(`https://first-food-delivery-rn-app.herokuapp.com/user/${userId}/address`, {
            method: 'POST', 
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({address})
            
        })
        const data = await response.json();
        dispatch({
            type: userTypes.SAVE_ADDRESS,
            payload: data
        })
        if(!response.ok){
            throw new Error(data);
            return;
        }
    } catch (error) {
        throw error;
    }
}


// SAVE PROFILE IMAGE
export const saveUserImage = (imageUrl) => async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
        const response = await fetch(`https://first-food-delivery-rn-app.herokuapp.com/user/${userId}/image`, {
            method: 'POST', 
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({imageUrl})
        })

        const data = await response.json();
        if(!response.ok){
            throw new Error(data);
            return;
        }
        dispatch({
            type: userTypes.SAVE_IMAGE,
            payload: data //the address is returned back from the server.
        })
    } catch (error) {
        throw error;
    }
}

// GET USER DATA
export const fetchUserData = () => async (dispatch, getState) =>{
    const userId = getState().user.id;
    try {
        const response = await fetch(`https://first-food-delivery-rn-app.herokuapp.com/user/${userId}`); 
        const data = await response.json();
        if(!response.ok){
            throw new Error(data)
        }       
        dispatch({
            type: userTypes.FETCH_USER_DATA,
            payload: data
        })
        await saveUserToStorage(data)
    } catch (error) {
        throw error(error);
    }
}

// REMOVE FAVORITE MEAL ACTION
export const removeFavMeal = (meal) => async (dispatch, getState) =>{
    const userId = getState().user.id;
    try {
        dispatch({
            type: userTypes.REMOVE_FAV_MEAL,
            payload: meal
        })
        const response = await fetch(`https://first-food-delivery-rn-app.herokuapp.com/user/${userId}/favMeals`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mealId: meal.id})
        });
        const data = response.json();
        if(!response.ok){
            throw new Error(data)
        }

    } catch (error) {
        throw error;
    }

}


// ADD FAVORITE MEAL ACTION
export const addFavMeal = (meal) => async (dispatch, getState) =>{
    const userId = getState().user.id;

    try {
        dispatch({
            type: userTypes.ADD_FAV_MEAL,
            payload: meal
        })
        const response = await fetch(`https://first-food-delivery-rn-app.herokuapp.com/user/${userId}/favMeals`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mealId: meal.id})
        });
        const data = response.json();
        if(!response.ok){
            throw new Error(data)
        }
    } catch (error) {
        throw error;
    }

}



// PLACE ORDER ACTION
export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
        const response = await fetch(`https://first-food-delivery-rn-app.herokuapp.com/user/${userId}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems.map(item => ({
                    itemId: item.meal.id,
                    itemQty: item.quantity,
                    amount: item.meal.price * item.quantity
                })),
                totalAmount
            })
        })
        const data = await response.json();

        dispatch({
            type: userTypes.ADD_ORDER,
            payload: {
                items: cartItems,
                amount: totalAmount
            }
        })
    } catch (error) {
        throw error;
    }
}





