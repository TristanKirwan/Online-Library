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
            <NavItem className="NavbarItems">
                <NavLink to="/">Home</NavLink>
                {console.log(props)}
                {props.isLoggedIn ?
                    <React.Fragment>
                        <NavLink to="/Books">Bookoverview</NavLink>
                        <NavLink to="/Profile"><i className="fas fa-user"></i></NavLink>
                        <Button onClick={() => props.Logout()}></Button> 
                    </React.Fragment>
                :
                    <React.Fragment>
                        <NavLink to="Login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </React.Fragment>}
            </NavItem>
        </Nav>
    )
}

Navbar.propTypes = {
    userName: PropTypes.string.isRequired,
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