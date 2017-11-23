import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  onChangeShelf = (book, newShelf) => {
    this.props.onChangeShelf(book, newShelf)
  }

  render() {
    const { shelfTitle, books, onChangeShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) =>
            <li key={book.id}>
              <Book
                book={ book }
                onChangeShelf={ this.onChangeShelf }
              />
            </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
