import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
    Button,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Input,
} from 'reactstrap';

import { Login } from '../actions/accountActions'

class Loginpage extends React.Component{
    constructor(){
        super()
        this.state={
            username: "",
            password: "",
            // hasloggedin: false
        }
        this.handlechange = this.handlechange.bind(this)
        // this.login = this.login.bind(this)
    }

    // componentDidMount(){
    //     this.setState({
    //         hasloggedin: false
    //     })
    //     console.log(this.props)
    // }

    handlechange(event){
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

    // login(){
    //     let {username, password} = this.state
    //     axios.get(`http://localhost:3000/users?username=${username}`)
    //     .then(result => {
    //         let actualassword = result.data[0].password
    //         console.log(result)
    //         console.log(actualassword)
    //         if(password === actualassword){
    //             alert("You were logged in.")
    //             this.setState({
    //                 hasloggedin: true
    //             })
    //         }
    //         else{
    //             alert("Something went wrong.")
    //         }
    //     })
    //     .catch(err => {
    //         alert(err)
    //     })
    // }

    render(){
        if(this.props.isLoggedIn){
            return(
                <Redirect to="/"/>
            )
        }

        return(
            <div className="LoginPage">
                <div className="LoginFormContainer">
                    <FormGroup className="LoginForm">
                        <h1 className="centered">Login to the online Library.</h1>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="formPrepend"><i className="fas fa-user"></i></InputGroupAddon>
                            <Input type="text" 
                                placeholder="Username" 
                                name="username" 
                                value={this.state.username} 
                                onChange={this.handlechange}
                                required>
                            </Input>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="formPrepend"><i className="fas fa-key"></i></InputGroupAddon>
                            <Input type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handlechange}
                                required>
                            </Input>
                        </InputGroup>
                        <div className="loginButtons">
                            <Button type="submit" color="primary"  onClick={() => {this.props.Login(this.state.username, this.state.password)}}>Login</Button>
                            <NavLink to="/Register"><Button color="primary">Register</Button></NavLink>
                        </div>
                    </FormGroup>
                </div>
            </div>
        )
    }
}

Loginpage.propTypes = {
    Login: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isLoggedIn: state.account.isLoggedIn,
    userName: state.account.userName,
}
)

export default connect(mapStateToProps, { Login })(Loginpage)