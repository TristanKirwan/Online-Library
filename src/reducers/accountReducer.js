import {LOGIN, LOGOUT, CHANGETHROUGHLOGOUT, CHANGEUSERNAME} from '../actions/types'

const initialstate = {
    isLoggedIn: false,
    accountdetails: {
        // userName: "Tristan",
        // email:  "test@test.com",
        // avatar: "https://image.flaticon.com/icons/svg/149/149452.svg",
        userName: "",
        email:  "",
        avatar: "",
        isAdmin: false
    },
    throughlogout: false
}

export default function(state = initialstate, action){
    switch(action.type){
        case LOGIN:
            console.log("Dit is in de accountReducer onder action.type === LOGIN")
            return{
                ...state,
                accountdetails:{
                    userName:action.payload.username,
                    email: action.payload.email,
                    avatar: action.payload.avatar,
                    isAdmin: action.payload.isAdmin
                }, 
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
        case CHANGEUSERNAME:
            return{
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}