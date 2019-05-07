import React from 'react'
import axios from 'axios'
import { LOGIN, LOGOUT } from './types'

export function Login(username, password){
    console.log(`In accountActions Login function zijn de parameters username:${username} en password:${password}`)
    return function(dispatch){
        axios.get(`http://localhost:3000/users?username=${username}`)
        .then(result => {
            let actualpassword = result.data[0].password
            if(password === actualpassword){
                console.log(`compared password:${password} of user:${username} with actual password:${actualpassword}`)
                dispatch({
                    type: LOGIN,
                    payload: {
                        username: username,
                        isLoggedIn: true
                    }
                })
            }
            else{
                alert("Incorrect username or password.")
            }
        })
        .catch(err => {
            alert(err)
        })
    }
}

export function Logout(){
    return function(dispatch){
         dispatch({
            type: LOGOUT,
            payload: false
         })
    }
}