import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '../history'

import PurchaseHistory from './Profile/PurchaseHistory'
import PlacedOrders from './Profile/PlacedOrders'
import DefaultProfile from './Profile/DefaultProfile'

class Profile extends React.Component {
  constructor(){
    super();
    this.state={
      shownpage: <DefaultProfile />
    }
    this.changeshownpage.bind = this.changeshownpage.bind(this)
  }

  changeshownpage(switchitem){
    /* switchitem gets passed by the list onClicks. shownpage is rendered and changed according to switch */
    let newpage
    switch(switchitem){
      case "PurchaseHistory":
        newpage = <PurchaseHistory />
        break;
      case "PlacedOrders":
        newpage = <PlacedOrders />
        break;
      default:
        newpage = <DefaultProfile />
        break;
    }
    this.setState({
      shownpage: newpage
    })
  }

  render(){
    // if(props.isLoggedIn === false){
    //   history.goBack();
    // }
    return (
      <div className="fillUpFlex profilePage">
          <ul className="profilePageNav">
            <li onClick={() => this.changeshownpage("PurchaseHistory")}>Purchase history</li>
            <li onClick={() => this.changeshownpage("PlacedOrders")}>Placed orders</li>
            <li>Logout</li>
          </ul>
          <div>
            <h1>Welkom,{this.props.userName}</h1>
            {this.state.shownpage}
          </div>
      </div>
    )
  } 
}

Profile.propTypes = {
  userName: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  userName: state.account.userName,
  isLoggedIn: state.account.isLoggedIn
})
export default connect(mapStateToProps, {})(Profile)