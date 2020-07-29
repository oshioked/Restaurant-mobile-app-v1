export const cartTypes = {
    ADD_ITEM: 'ADD_ITEM',
    CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

export const addItem = (meal) =>({
    type: cartTypes.ADD_ITEM,
    payload: meal
})

export const clearItemFromCart = (meal) =>({
    type: cartTypes.CLEAR_ITEM_FROM_CART,
    payload: meal
})

export const clearCart = () =>({
    type: cartTypes.CLEAR_CART
})
