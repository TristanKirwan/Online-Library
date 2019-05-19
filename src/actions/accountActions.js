import React from 'react'
import axios from 'axios'
import { LOGIN, LOGOUT, CHANGETHROUGHLOGOUT, CHANGEUSERNAME } from './types'
import history from '../history'

// export function Login(username, password){
//     console.log(`In accountActions Login function zijn de parameters username:${username} en password:${password}`)
//     return function(dispatch){
//         axios.get(`http://localhost:3000/users?username=${username}`)
//         .then(result => {
//             if (result.data.length === 0){
//                 return alert("Incorrect username or password")
//             }
//             console.log(`authenticate fuction in Login function returns: ${authenticate(username, password)}`)
//             let isauthenticated =  authenticate(username, password)
//             if(isauthenticated){
//                 let email = result.data[0].email
//                 let avatar = result.data[0].avatar
//                 let isAdmin = result.data[0].isAdmin
//                 dispatch({
//                     type: LOGIN,
//                     payload: {
//                         username: username,
//                         email: email,
//                         avatar: avatar,
//                         isAdmin: isAdmin,
//                         isLoggedIn: true
//                     }
//                 })
//             }
//             else{
//                 alert("Incorrect username or password.")
//             }
//         })
//         .catch(err => {
//             alert(err)
//         })
//     }
// }


// export function authenticate(username, password){
//     let isauthenticated = axios.get(`http://localhost:3000/users?username=${username}`)
//     .then(res => {
//         if(res.data.length != 1){
//             return false
//         }
//         let actualpassword = res.data[0].password
//         console.log("Let actualpassword just executed")
//         if(actualpassword != password){
//             console.log("actualpassword != password")
//             return false
//         }
//         console.log("Return true")
//         return true
//     })
//     return isauthenticated
// }
export function Login(username, password){
    return function(dispatch){
        authenticate(username, password)
        .then(result => {
            if(result === true){
                console.log("Login accepted")
                axios.get(`http://localhost:3000/users?username=${username}`)
                .then(result => {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            username: result.data[0].username,
                            email: result.data[0].email,
                            avatar: result.data[0].avatar,
                            isAdmin: result.data[0].isAdmin,
                            isLoggedIn: true
                        }
                    })
                })
            }
            if(result === false){
                console.log("Does this solve uncaught in Promise?")
            }
            else{
                console.log("Login rejected")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export function authenticate(username, password){
    return new Promise(function(resolve, reject){
        axios.get(`http://localhost:3000/users?username=${username}`)
        .then(result => {
            if(result.data.length != 1){
                reject(false)
            }
            else{
                let actualpassword = result.data[0].password
                if(actualpassword != password){
                    reject(false)
                }
                else{
                    resolve(true)
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
}


export function Logout(){
    return function(dispatch){
         dispatch({
            type: LOGOUT,
            payload: false
         })
         history.push("/logout")
    }
}

export function ChangeThroughLogout(){
    console.log("changethroughlogout called in accountActions")
    return function(dispatch){
        dispatch({
            type: CHANGETHROUGHLOGOUT,
            payload: false
        })
    }
}

export function ChangeUsername(newusername, givenpassword, currentusername){
    console.log(`ChangeUsername has been called, currentusername: ${currentusername}`)
    return function(dispatch){
        if(authenticate(currentusername, givenpassword)){
            console.log(authenticate(currentusername, givenpassword))
            axios.patch(`http://localhost:3000/users?username=Tristan`, {username: newusername})
            .then(
                dispatch({
                    type: CHANGEUSERNAME,
                    payload: newusername
                })
            )
            .then(console.log("username changed."))
            .catch(err => console.log(err))
        }
    }
}