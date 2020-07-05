export const orderTypes = {
    ADD_ORDER: 'ADD_ORDER'
}

export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
    const userId = getState().user.id;
    try {
        const response = await fetch('http://localhost:5000/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: new Date().toString(),
                items: cartItems.map(item => ({
                    itemId: item.meal.id,
                    itemQty: item.quantity,
                    amount: item.meal.price * item.quantity
                })),
                userId,
                date: new Date(),
                totalAmount
            })
        })
        const data = await response.json();
        console.log(data);

        dispatch({
            type: orderTypes.ADD_ORDER,
            payload: {
                items: cartItems,
                amount: totalAmount
            }
        })
    } catch (error) {
        throw error;
    }
}
