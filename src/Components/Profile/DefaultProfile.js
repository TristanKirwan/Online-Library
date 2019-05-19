import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Logout } from '../../actions/accountActions'

import EditUsername from './EditUsername'

export  function DefaultProfile(props) {
  return (
    <div className="fillUpFlex halfcontainer blockcenter">
      <ul className="clickablelist flex-col">
        {/* <li className="clickablelistitem">Edit Username<i class="fas fa-chevron-right"></i></li> */}
        <EditUsername />
        <li className="clickablelistitem">Edit Password<i className="fas fa-chevron-right"></i></li>
        <li className="clickablelistitem">Edit Avatar<i className="fas fa-chevron-right"></i></li>
        <li className="clickablelistitem" onClick={() => props.Logout()}>Logout<i className="fas fa-chevron-right"></i></li>

      </ul>
    </div>
  )
}
DefaultProfile.propTypes = {
  Logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  Logout: state.account.Logout
})
export default connect(mapStateToProps, { Logout })(DefaultProfile)