import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import {
    Nav,
    NavItem,
    Button
} from 'reactstrap'

import {Logout} from '../actions/accountActions'

function Navbar(props){    
    return(
        <Nav className="NavigationBar">
            <NavItem>
                <NavLink to="/">Home</NavLink>
            </NavItem>
            {props.isLoggedIn ?
                <React.Fragment>
                    <NavItem>
                    <NavLink to="/Books">Bookoverview</NavLink>
                    </NavItem>
                        <NavItem className="pushright">
                            <NavLink to="/Profile" className="NavbarProfile rightitemnav"><i className="fas fa-user"></i>{props.userName}</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => props.Logout()}>Logout</Button> 
                        </NavItem>
                </React.Fragment>
            :
                <React.Fragment>
                    <NavItem className="pushright">
                        <NavLink to="Login" className="rightitemnav">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/register" className="rightitemnav">Register</NavLink>
                    </NavItem>
                </React.Fragment>}
        </Nav>
    )
}

Navbar.propTypes = {
    userName: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    Logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isLoggedIn: state.account.isLoggedIn,
    userName: state.account.userName,
    Logout: state.account.Logout
}
)
export default connect(mapStateToProps, {Logout})(Navbar)