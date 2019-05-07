// import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
// import { Test } from '../actions/accountActions'

// class Reduxtest extends Component {
//     componentWillMount(){
//         this.props.Test();
//     }

//   render() {
//     return (
//       <div>
//           <h1>{this.props.username}</h1>
//       </div>
//     )
//   }
// }

// Reduxtest.propTypes = {
//     Test: PropTypes.func.isRequired,
//     username: PropTypes.string.isRequired,
// }

// const mapStateToProps = state => ({
//     username: state.account.username
// })

// export default connect(mapStateToProps, { Test })(Reduxtest)