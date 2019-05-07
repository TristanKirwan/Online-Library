import {LOGIN, LOGOUT} from '../actions/types'

const initialstate = {
    isLoggedIn: false,
    userName: "",
    test2: "test"
}

export default function(state = initialstate, action){
    switch(action.type){
        case LOGIN:
            console.log("Dit is in de accountReducer onder action.type === LOGIN")
            return{
                ...state,
                userName: action.payload.userName,
                isLoggedIn: action.payload.isLoggedIn
            }
        case LOGOUT:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state
    }
}