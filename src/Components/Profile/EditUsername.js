import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {ChangeUsername} from '../../actions/accountActions'

import {
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap'

class EditUsername extends Component {
    constructor(){
        super()
        this.state={
            open: false,
            password: "",
            newusername: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    toggletext(){
      this.setState({
        open: !this.state.open
      })
    }

    handleChange(event){
      let {name, value, type, checked} = event.target
      if(type === "checkbox"){
        this.setState({
          [name]: checked
        })
      }
      else{
        this.setState({
          [name]: value
        })
      }
    }

  render() {
    return (
      <React.Fragment>
        <li className={this.state.open ? "openedclickablelistitem clickablelistitem" : "clickablelistitem"} onClick={() => this.toggletext()}>Edit Username<i className="fas fa-chevron-right"></i></li>
        {this.state.open ? 
          <Form className="accordioncontent blockcenter">
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="formPrepend"><i className="fas fa-key"></i></InputGroupAddon>
              <Input type="password" 
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.handleChange}
                  required>
              </Input>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="formPrepend"><i className="fas fa-signature"></i></InputGroupAddon>
              <Input type="text" 
                  placeholder="New username" 
                  name="newusername" 
                  value={this.state.newusername} 
                  onChange={this.handleChange}
                  required>
              </Input>
            </InputGroup>
            <Button onClick={() => this.props.ChangeUsername(this.state.newusername, this.state.password, this.props.username)}
              className="blockcenter">Change username</Button>
            </Form>
          : null}
      </React.Fragment>
    )
  }
}

EditUsername.propTypes = {
  ChangeUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps =  state => ({ 
  username: state.account.accountdetails.userName
})
export default connect(mapStateToProps, {ChangeUsername})(EditUsername)