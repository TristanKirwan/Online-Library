import React from 'react'
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'


function Test(){
    return(
        <div className="homePage fillUpFlex">
            <div className="homePageContent">
                <h1 className="centered">Welcome to the online book Library and store</h1>
                <p>The online Book Library and store allows you to:</p>
                <ul className="fa-ul">
                    <li><span className="fa-li"><i className="far fa-credit-card"></i></span>Buy books</li>
                    <li><span className="fa-li"><i className="fas fa-book"></i></span>Borrow books</li>
                    <li><span className="fa-li"><i className="fas fa-heart"></i></span>Keep track of your favourite books</li>
                </ul>
                <div className="homepageButtons">
                  <NavLink to="/Login"><Button color="primary">Login</Button></NavLink>
                  <NavLink to="/Books"><Button color="primary">List of books</Button></NavLink>
                </div>
            </div>
        </div>
    )
}
export default Test
