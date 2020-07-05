const { cartTypes } = require("./cart.actions");
const { default: CartItem } = require("../../models/cartItem");

const initialState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state = initialState, action) =>{
    switch (action.type) {
        case cartTypes.ADD_ITEM:
            const mealToAdd = action.payload;
            const mealExists = state.items.find(item => item.meal.id === mealToAdd.id)
            let newItem;
            let updatedCartItems;
            if(mealExists){
                updatedCartItems = state.items.map(item => 
                    item.meal.id != mealToAdd.id 
                    ? item
                    : {...item, quantity: item.quantity+1, amount: (item.amount + mealToAdd.price)} 
                )
            }else{
                newItem = new CartItem(
                    mealToAdd,
                    1,
                    mealToAdd.price
                )
                updatedCartItems = [...state.items, newItem]
            }
            return ({
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount + mealToAdd.price
            })
        case cartTypes.CLEAR_ITEM_FROM_CART:
            const mealToClear = action.payload;
            const quantityInCart = state.items.find(item => item.meal.id === mealToClear.id).quantity;
            
            return({
                ...state,
                items: state.items.filter(item => item.meal.id != mealToClear.id),
                totalAmount: state.totalAmount - (mealToClear.price * quantityInCart)
            })
        default:
            return state;
    }
}

export default cartReducer;