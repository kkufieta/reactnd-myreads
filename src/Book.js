import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  onChangeShelf = (e) => {
    this.props.onChangeShelf(this.props.book, e.target.value);
  }

  render() {
    const book = this.props.book
    // If the bookCover is not available, show a generic cover
    const bookCover = book.imageLinks ? 
      `url(${book.imageLinks.thumbnail})` :
      'url("http://via.placeholder.com/128x193?text=cover+not+available")'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128,
                     height: 193,
                     backgroundImage: bookCover
                  }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={this.onChangeShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="noneValue">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    )
  }
}

export default Book
