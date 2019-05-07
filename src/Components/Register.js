import React from 'react'
import {
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import axios from 'axios';
import {Redirect, NavLink} from 'react-router-dom'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username: "",
            password: "",
            confirmpassword: "",
            email: "",
            lowecasecharacters: /[a-z]/g,
            uppercasecharacters: /[A-Z]/g,
            numbers: /[0-9]/g,
            minusernamelength: 4,
            maxusernamelength: 10,
            minpasswordlength: 6,
            maxpasswordlength: 12,
            tologin: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }

    componentDidMount(){
        this.setState({
            tologin: false
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

    checkvalidlength(input, min, max, nameofinput){
        if(input.length < min || input.length > max){
            alert(`Your ${nameofinput} should between ${min} and ${max} characters long.`)
            return false
        }
        return true
    }
    checkvalidspaces(input, nameofinput){
        const splitinput = input.split(' ')
        if(splitinput.length > 1){
            alert(`Your ${nameofinput} is not allowed to contain spaces.`)
            return false
        }
        return true
    }
    checkspecialcharacters(input, nameofinput){
        if(false){
            // check for special characters.
            return false
        }
        return true
    }
    checkifuserexists(username){
        axios.get(`http://localhost:3000/users?username=${username}`)
        .then(res => {
            if(res.data.length > 0){
                alert("Username is already in use.")
                return true
            }
            else{
                return false
            }
        })
    }
    checkifemailexists(email){
        axios.get(`http://localhost:3000/users?email=${email}`)
        .then(res => {
            if(res.data.length > 0){
                alert("Email is already in use.")
                return true
            }
            else{
                return false
            }
        })
    }

    checkvalidusername(){
        let {lowecasecharacters, uppercasecharacters, minusernamelength, maxusernamelength, numbers, username} = this.state
        let inputname = "username"
        if(!this.checkvalidlength(username, minusernamelength, maxusernamelength, inputname)
             || !this.checkvalidspaces(username, inputname)
             || !this.checkspecialcharacters(username, inputname)
             || this.checkifuserexists(username)){
            return false
        }
        return true
    }

    checkvalidpassword(){
        let {password, confirmpassword, minpasswordlength, maxpasswordlength} = this.state
        let inputname = "password"
        if(!this.checkvalidlength(password, minpasswordlength, maxpasswordlength, inputname)
            || !this.checkvalidspaces(password, inputname)
            || !this.checkspecialcharacters(password, inputname)){
                return false
            }
        if(!(password === confirmpassword)){
            alert("passwords do not match")
            return false
        }
        return true
    }

    checkvalidemail(){
        let {email, lowecasecharacters} = this.state
        let splitmail = email.split('@')
        let error = "Email appears to be invalid."
        if(splitmail[0].length === 0 
            ||splitmail.length < 2){
                alert(error)
                return false
        }
        let splitdomain = splitmail[1].split('.')
        if(splitdomain[0].length === 0 
            || splitdomain.length < 2){
                alert(error)
                return false
        }
        if(!(splitdomain[1].match(lowecasecharacters))){
            alert(error)
            return false
        }
        if(this.checkifemailexists(email)){
            alert("Triggered")
            return false
        }
        return true
    }

    register(){
        if(!(this.checkvalidusername()) || !(this.checkvalidpassword()) || !(this.checkvalidemail())){
            return
        }
        else{
            let {username, password, email} = this.state
            let newuser = {
                username: username,
                password: password,
                email: email
            }
            axios.post('http://localhost:3000/users', newuser)
            .then(result => {
                this.setState({
                    username: "",
                    password: "",
                    email: "",
                    tologin: true
                })
            })
            .catch(err => {
                return alert(err)
            })
        }
    }


    render(){
        if(this.state.tologin){
            return(
                <Redirect to="/login" />
            )
        }
        return(
            <div className="registerPage">
                <div className="registerFormContainer">
                    <FormGroup className="registerForm">
                        <h1 className="centered">Register at the online Library.</h1>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="formPrepend"><i className="fas fa-user"></i></InputGroupAddon>
                            <Input type="text"
                                name="username"
                                placeholder="Username" 
                                onChange={this.handleChange}
                                value={this.state.username} required>
                                </Input>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="formPrepend"><i class="fas fa-key"></i></InputGroupAddon>
                            <Input type="password"
                                name="password" 
                                placeholder="Password" 
                                onChange={this.handleChange} 
                                value={this.state.password} required>
                            </Input>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="formPrepend"><i class="fas fa-key"></i></InputGroupAddon>
                            <Input type="password"
                                name="confirmpassword" 
                                placeholder="Confirm Password" 
                                onChange={this.handleChange} 
                                value={this.state.confirmpassword} required>
                            </Input>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="formPrepend"><i class="fas fa-at"></i></InputGroupAddon>
                            <Input type="email"
                                name="email" 
                                placeholder="E-mail" 
                                onChange={this.handleChange} 
                                value={this.state.email} required>
                            </Input>
                        </InputGroup>
                        <div className="registerButtons">
                            <Button color="primary" onClick={this.register}>Register</Button>
                            <NavLink to="/Login"><Button color="primary">Go to login page</Button></NavLink>
                        </div>
                    </FormGroup>
                </div>
            </div>
        )
    }
}

export default Register