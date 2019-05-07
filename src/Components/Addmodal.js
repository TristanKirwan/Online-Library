import React from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import axios from 'axios'

class Addmodal extends React.Component{
    constructor(){
        super()
        this.state={
            newBookData:{
                title:'',
                rating: 0
            }
        }
    }

    addBook(){
        let {newBookData} = this.state
        let newBook = {
          title: newBookData.title.trim(),
          rating: Math.floor(newBookData.rating)
        }
        console.log(`newBook.title is: ${newBook.title}`)
        if(this.props.isValidBook(newBookData.title, newBook.rating)){
          axios.post('http://localhost:3000/books', newBook)
           .then(response => {
             this.setState({
               newBookData: {
                 title: "",
                 rating: ""
               }
             })
           })
           .then(this.props.toggleNewBookModal)
           .then(this.props.reloadBooks)
          }
        }

    render(){
        return(
            <Modal isOpen={true} toggle={this.props.toggleNewBookModal}>
            <ModalHeader toggle={this.props.toggleNewBookModal}>Add a new book.</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title" >Title</Label>
                <Input type="text" 
                name="title"  
                value={this.state.newBookData.title} 
                onChange={(event) => {
                  let newBook = this.state.newBookData
                  newBook.title = event.target.value
                  this.setState({
                    newBook
                  })
                }}></Input>
                <Label for="title">Rating</Label>
                <Input type="text" 
                name="rating" 
                value={this.state.newBookData.rating} 
                onChange={(event) => {
                  let newBook = this.state.newBookData
                  newBook.rating = event.target.value
                  this.setState({
                    newBook
                  })
                }}></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
              <Button color="secondary" onClick={this.props.toggleNewBookModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        )
    }
}

export default Addmodal