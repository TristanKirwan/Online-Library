import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from '../history'

import { ChangeThroughLogout } from '../actions/accountActions'

function logoutpage(props){
    if(props.throughlogout === false){
        history.goBack()
    }
    return(
        <div>
            <h1>You have successfully logged out.</h1>
            <NavLink to="/" onClick={() => {props.ChangeThroughLogout()}}>Click here to return to the homepage.</NavLink>
        </div>
    )
}

logoutpage.propTypes = {
    throughlogout: PropTypes.bool.isRequired,
    ChangeThroughLogout: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    throughlogout: state.account.throughlogout,
})

export default connect(mapStateToProps, {ChangeThroughLogout})(logoutpage)