import { orderTypes } from "./orders.actions";
import Order from "../../models/order";

const initialState = {
    orders: []
}

const orderReducer = (state = initialState, action) =>{
    switch (action.type) {
        case orderTypes.ADD_ORDER:
            const {items, amount}= action.payload;
            const order = new Order(
                new Date().toISOString(),
                items,
                'Pending',
                new Date().toISOString(),
                amount
            )
            return({
                ...state,
                orders: [order].concat(state.orders)
            })
        default:
            return state;
    }
}

export default orderReducer;