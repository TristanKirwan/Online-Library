import React from 'react'
import{ Button } from 'reactstrap'
import Editmodal from './Editmodal'
import Deletemodal from './Deletemodal'

class Book extends React.Component{
    constructor(){
        super();
        this.state={
            existingBook: {
                id: '',
                title: '',
                rating: ''
            },
            showEditModal: false,
            showDeleteModal: false
        }
        this.toggleEditBookModal = this.toggleEditBookModal.bind(this)
        this.toggleDeleteBookModal = this.toggleDeleteBookModal.bind(this)
        this.reloadCurrentBook = this.reloadCurrentBook.bind(this)
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
    toggleEditBookModal(){
        this.setState({
            showEditModal: !this.state.showEditModal
        })
    }
    toggleDeleteBookModal(){
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        })
    }
    reloadCurrentBook(id, title, rating){
        this.setState({
            existingBook:{
                id: id,
                title: title,
                rating: rating
            }
        })
    }

    render(){
        console.log(this.props)
        let {data} = this.props
        return(
            <React.Fragment>
                {/* Edit modal is rendered when showEditModal is equal to true. */}
                    {this.state.showEditModal && 
                        <Editmodal toggleEditBookModal={this.toggleEditBookModal} 
                            reloadBooks={this.props.reloadBooks} 
                            data={this.props.data}
                            reloadCurrentBook={this.reloadCurrentBook}
                            isValidBook={this.props.isValidBook}
                            />}
                    {/* Delete modal is rendered when showDeleteModal is equal to true. */}
                    {this.state.showDeleteModal &&
                        <Deletemodal toggleDeleteBookModal={this.toggleDeleteBookModal}
                            reloadBooks={this.props.reloadBooks}
                            data={this.props.data}
                            reloadCurrentBook={this.reloadCurrentBook
                            }/>}

                {/* This is the standard book information that gets rendered */}
                <tr key={data.id}>
                    <td>{this.state.existingBook.id}</td>
                    <td>{this.state.existingBook.title}</td>
                    <td>{this.state.existingBook.rating}</td>
                    <td>
                    <Button color="success" 
                        size="sm" 
                        className="mr-2" 
                        onClick={this.toggleEditBookModal.bind(this)}>
                        Edit
                    </Button>
                    <Button color="danger" 
                        size="sm"
                        onClick={this.toggleDeleteBookModal.bind(this)}>
                        Delete
                    </Button>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default Book