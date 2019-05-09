import {LOGIN, LOGOUT, CHANGETHROUGHLOGOUT} from '../actions/types'

const initialstate = {
    isLoggedIn: false,
    userName: "",
    throughlogout: false
}

export default function(state = initialstate, action){
    switch(action.type){
        case LOGIN:
            console.log("Dit is in de accountReducer onder action.type === LOGIN")
            return{
                ...state,
                userName: action.payload.user,
                isLoggedIn: action.payload.isLoggedIn
            }
        case CHANGETHROUGHLOGOUT:
            console.log("Changethroughlogout called in reducer")
            return{
                ...state,
                throughlogout: action.payload
            }
        case LOGOUT:
            return{
                ...state,
                username: "",
                isLoggedIn: action.payload,
                throughlogout: true
            }
        default:
            return state
    }
}