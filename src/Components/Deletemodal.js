import React from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table
} from 'reactstrap'
import axios from 'axios'

class Deletemodal extends React.Component{
    constructor(){
        super()
        this.state={
            currentbookid: ''
        }
    }

    componentDidMount(){
        this.setState({
            currentbookid: this.props.data.id
        })
    }

    deleteBook(){
        this.props.toggleDeleteBookModal()
        axios.delete(`http://localhost:3000/books/${this.state.currentbookid}`)
        .then(this.props.reloadBooks)   
    }

    render(){
        return(
             <Modal isOpen={true} toggle={this.props.toggleDeleteBookModal}>
                <ModalHeader toggle={this.props.toggleDeleteBookModal}>Delete an existing book.</ModalHeader>
                <ModalBody>
                    <p>The book you are trying to delete:</p>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>{this.props.data.id}</th>
                                <th>{this.props.data.title}</th>
                                <th>{this.props.data.rating}</th>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteBook.bind(this)}> Delete this book</Button>
                    <Button color="secondary" onClick={this.props.toggleDeleteBookModal}>Cancel</Button>
                </ModalFooter>
                </Modal>
        )
    }
}

export default Deletemodal