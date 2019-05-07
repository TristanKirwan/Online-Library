import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import {Table,
Button,
Jumbotron,
Input,
InputGroup,
InputGroupAddon} from 'reactstrap';
import Book from './Book'
import Addmodal from './Addmodal'

class Bookoverview extends Component {
  constructor(){
    super()
    this.state={
      books: [],
      newBookData: {
        title: '',
        rating: '',
      },
      showAddBookModal: false,
      attributeDropdownOpen: false,
      filterValue: '',
      filterAttribute: 'title'
    }
    this.handleChange = this.handleChange.bind(this)
    this.reloadBooks = this.reloadBooks.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.filteredSearch = this.filteredSearch.bind(this)
    this.toggleAttributeDropdown = this.toggleAttributeDropdown.bind(this)
    this.toggleNewBookModal = this.toggleNewBookModal.bind(this)
  }

  loadAllBooks(){
    console.log("loadallbooks has been called")
    axios.get('http://localhost:3000/books')
    .then(response => {
      this.setState({
        books: response.data
      })
    })
  }
  
  reloadBooks(){
    this.loadAllBooks()
  }

  componentDidMount(){
    this.loadAllBooks();
  }
  
  toggleAttributeDropdown(){
    this.setState({
      attributeDropdownOpen: !this.state.attributeDropdownOpen
    })
  }
  
  toggleNewBookModal(){
    this.setState({
      showAddBookModal: !this.state.showAddBookModal
    })
  }

  filteredSearch(){
    let {filterValue, filterAttribute} = this.state
    console.log(`filteredSeach called, filter is: ${filterValue}`)
    axios.get(`http://localhost:3000/books?${filterAttribute}_like=${filterValue}`)
    .then(response => {
      this.setState({
        books: response.data
      })
    })
  }
  
  resetFilter(){
    this.setState({
      filterValue: ''
    })
    this.loadAllBooks()
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

  isValidBook(title, rating){
    if(title.trim() === ''){
      alert("Title cannot be empty.") 
      return false
    }
    else if(!isFinite(rating) || rating < 0 || rating > 10){
      alert("Please check that te rating you have entered is between 0 and 10")
      return false
    }
    return true
  }

  render() {
    let books = this.state.books.map(book =>{
      return(
        <Book data={book} key={book.id} reloadBooks={this.reloadBooks} isValidBook={this.isValidBook}/>
      )
    })

    if(!this.props.isLoggedIn){
      alert("Please login to view books.")
      return(
        <Redirect to="/Login"></Redirect>
      )
    }

    return (
      <div className="App container">
        <Jumbotron>
          <h1 className="centered">Welcome to the online library.</h1>
            <InputGroup>
              <Input type="text" 
                placeholder="Search for books"
                value={this.state.filterValue}
                name="filterValue" 
                onChange={this.handleChange}
                className="searchBooks"></Input>
              <InputGroupAddon addonType="append" className="clickable filterAttributeDropdown">
                <select onChange={this.handleChange} name="filterAttribute" defaultValue="title">
                  <option value="id">Book id</option>
                  <option value="title">Book title</option>
                  <option value="rating">Book rating</option>
                </select>
              </InputGroupAddon>
            </InputGroup>
            <div className="headerButtons">
              <Button color="primary" onClick={this.filteredSearch}>Search</Button>
              <Button color="primary" onClick={this.resetFilter}>Reset list of books</Button>
              <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
            </div>
        </Jumbotron>

        {/* Add modal is rendered when showAddBookModal is true. */}
        {this.state.showAddBookModal &&
          <Addmodal toggleNewBookModal={this.toggleNewBookModal}
            reloadBooks={this.reloadBooks} 
            isValidBook={this.isValidBook}/>}

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           {books}
          </tbody>
        </Table>
      </div>
    );
  }
}


Bookoverview.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isLoggedIn: state.account.isLoggedIn,
})

export default connect(mapStateToProps, {})(Bookoverview)