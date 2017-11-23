import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import propTypes from 'prop-types'

class SearchBook extends Component {
  static propTypes = {
    books: propTypes.array.isRequired,
    onChangeShelf: propTypes.func.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  // Update the query & search results as the user types
  updateQuery = (query) => {
    this.setState({query: query})
    
    BooksAPI.search(query, 40).then((searchResults) => {
      // If the query does give any search results,
      // set searchResults to an empty array
      if (searchResults === undefined || searchResults.hasOwnProperty('error')) {
        this.setState({searchResults: []})
      } else {
        // Check if the search results are on the users shelf already.
        // If yes, Make sure to update the shelfs of the books that are displayed.
        // If the book is not on the users shelf, it should show 'None' as a shelf
        for (const b of searchResults) {
          for (const book of this.props.books) {
            if (b.id === book.id) {
              b.shelf = book.shelf
              break
            } else {
              b.shelf = 'noneValue'
            }
          }
        }
        this.setState({searchResults})
      }
    })
  }

  onChangeShelf = (book, newShelf) => {
    this.props.onChangeShelf(book, newShelf)
  }

  render() {
    const {query, searchResults} = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TEE
RMS.md

              However, remember that the BooksAPI.search method DOES search by title or authorr
. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terr
ms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) =>
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

export default SearchBook
