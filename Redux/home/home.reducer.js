import {homeTypes} from './home.actions';

const initialState = {
    header: {}
}

const homeReducer = (state = initialState, action) =>{
    switch (action.type) {
        case homeTypes.FETCH_HEADER:
            return({
                header: action.payload
            })
            break;
    
        default:
            return state;
    }
}

export default homeReducer;