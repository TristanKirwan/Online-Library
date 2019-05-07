import React from 'react'
import {
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Input,
    Button
} from 'reactstrap'
import axios from 'axios'

class Editmodal extends React.Component{
    constructor(){
        super()
        this.state={
            existingBook: {
                id: '',
                title: '',
                rating: ''
            }
        }
    }

    componentDidMount(){
        let {data} = this.props
        this.setState({
            existingBook: {
                id: data.id,
                title: data.title,
                rating: data.rating
            }
        })
    }

    editBook(){
        if(this.props.isValidBook(this.state.existingBook.title, this.state.existingBook.rating)){
            let id = this.state.existingBook.id
            axios.patch(`http://localhost:3000/books/${id}`, this.state.existingBook)
            .then(response => {
              let {title, rating, id} = response.data
              this.setState({
                existingBook:{
                    id,
                    title,
                    rating
                },
                showEditModal: false
              })
            })
            .then(this.props.toggleEditBookModal)
            .then(
                this.props.reloadCurrentBook(this.state.existingBook.id, this.state.existingBook.title, this.state.existingBook.rating)
            )
        }
    }

    render(){
        return(
            <Modal isOpen={true} toggle={this.props.toggleEditBookModal}>
            <ModalHeader toggle={this.props.toggleEditBookModal}>Edit an existing book.</ModalHeader>
            <ModalBody>
                <FormGroup>
                <Label for="title" >Title</Label>
                <Input type="text" 
                name="title"  
                value={this.state.existingBook.title} 
                onChange={(event) => {
                    let editedBook = this.state.existingBook
                    editedBook.title = event.target.value
                    this.setState({
                        editedBook
                    })
                }}></Input>
                <Label for="title">Rating</Label>
                <Input type="text" 
                name="rating" 
                value={this.state.existingBook.rating} 
                onChange={(event) => {
                    let editedBook = this.state.existingBook
                    editedBook.rating = event.target.value
                    this.setState({
                        editedBook
                    })
                }}></Input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.editBook.bind(this)}>Edit Book</Button>{' '}
                <Button color="secondary" onClick={this.props.toggleEditBookModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
        )
    }
}


export default Editmodal