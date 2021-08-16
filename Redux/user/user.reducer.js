import { userTypes, authTypes } from "./user.actions";
import User from "../../models/user";
import Order from "../../models/order";

const initialState = {
    id: '',
    name: '',
    email: '',
    profileImage: '',
    phoneNo: '',
    bonusPercentage: 0,
    address: '',
    cityState: '',
    favoriteMeals: [],
    orders: []
}


const getOrders = (orderResult) =>{
    return(
        orderResult.map(order => (
            new Order(
                order.id,
                order.items.map(item => ({meal: {id:item.itemId, title: item.itemTitle}, quantity: item.itemQty, amount: item.amount})),
                order.status,
                order.ordered_date,
                order.amount
            )            
        ))
    )
}

const userReducer = (state = initialState, action) =>{
    console.log(state, action)
    switch (action.type) { 

        case authTypes.LOGIN_USER:
            const userData = action.payload;
            return({
                id: userData.userid,
                name: userData.fullname,
                email: userData.email,
                profileImage: userData.profileImage,
                phoneNo: userData.phonenumber,
                bonusPercentage: userData.bonusprogress,
                address: userData.address,
                favoriteMeals: userData.favoritemeals,
                orders: getOrders(userData.orders)
            })

        
        case authTypes.REGISTER_USER:
            const newUserData = action.payload;
            return({
                id: newUserData.userid,
                name: newUserData.fullname,
                email: newUserData.email,
                profileImage: newUserData.profileImage,
                phoneNo: newUserData.phonenumber,
                bonusPercentage: newUserData.bonusprogress,
                address: newUserData.address,
                favoriteMeals: newUserData.favoritemeals,
                orders: getOrders(newUserData.orders)
            })
        
        case authTypes.LOGOUT_USER:
            return(null)

        case userTypes.SAVE_ADDRESS:
            const address = action.payload;
            return({
                ...state,
                address
            })

        case userTypes.SAVE_IMAGE:
            const imageUrl = action.payload;
            return({
                ...state,
                profileImage: imageUrl
            })
        case userTypes.FETCH_USER_DATA:
            const data = action.payload;
            return({
                ...state,
                id: data.userid,
                name: data.fullname,
                email: data.email,
                profileImage: data.profileImage,
                phoneNo: data.phonenumber,
                bonusPercentage: data.bonusprogress,
                address: data.address,
                favoriteMeals: data.favoritemeals,
                orders: getOrders(data.orders)
            })

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

        case userTypes.ADD_ORDER:
            const {items, amount}= action.payload;
            const order = new Order(
                new Date().toISOString(),
                items,
                'pending',
                new Date().toISOString(),
                amount
            )
            const additionBonusProgress = amount/10000;
            const newBonusProgress = parseFloat(state.bonusPercentage) + additionBonusProgress;
            return({
                ...state,
                bonusPercentage: parseFloat(state.bonusPercentage) >= 1 ? 0 : (newBonusProgress > 1 ? 1 : newBonusProgress),
                orders: [order].concat(state.orders)
            })


        default:
            return state;
    }
}

export default userReducer;