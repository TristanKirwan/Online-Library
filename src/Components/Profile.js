import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '../history'

import PurchaseHistory from './Profile/PurchaseHistory'
import PlacedOrders from './Profile/PlacedOrders'
import DefaultProfile from './Profile/DefaultProfile'

import { Logout } from '../actions/accountActions'

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
      case "AccountSettings":
        newpage = <DefaultProfile />
        break;
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
      <div className="profilePage">
        <div className="fillUpFlex profilePageContent">
            <ul className="profilePageNav secondaryfont clickablelist flex-col">
              <li 
                onClick={() => this.changeshownpage("AccountSettings")}
                className="clickablelistitem">
                  Account settings
                </li>
              <li 
                onClick={() => this.changeshownpage("PurchaseHistory")}
                className="clickablelistitem">
                  Purchase history
                </li>
              <li 
                onClick={() => this.changeshownpage("PlacedOrders")}
                className="clickablelistitem">
                  Placed orders
                </li>
              <li className="clickablelistitem" onClick={ () => {this.props.Logout()}}>Logout</li>
              {console.log(this.props)}
            </ul>
            <div className="fillUpFlex flex-col profilepagecontents">
              <div className="profileHeader">
                <img src={this.props.useraccount.avatar} className="avatar" alt="profile image"></img>
                <h1 className="centered">{this.props.useraccount.userName}</h1>
              </div>
                {this.state.shownpage}
            </div>
        </div>
      </div>
    )
  } 
}

Profile.propTypes = {
  useraccount: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  Logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  useraccount: state.account.accountdetails,
  isLoggedIn: state.account.isLoggedIn,
  Logout: state.account.Logout
})
export default connect(mapStateToProps, {Logout})(Profile)