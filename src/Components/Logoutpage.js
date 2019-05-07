import React from 'react'
import {NavLink} from 'react-router-dom'

import {
    Button
} from 'reactstrap'

function logoutpage(){
    return(
        <div>
            <h1>You have successfully logged out.</h1>
            <NavLink to="/">Click here to return to the homepage.</NavLink>
        </div>
    )
}

export default logoutpage