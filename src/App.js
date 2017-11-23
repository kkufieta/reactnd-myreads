import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: 'Currently Reading',
      read: 'Read',
      wantToRead: 'Want To Read'
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        console.log(books)
        this.setState({books})
    }).then(() => console.log(this.state))
  }

  onChangeShelf = (book, newShelf) => {
    this.setState(state => {
      state.books.map(
        b => {
          if (b.id === book.id) {
            b.shelf = newShelf
          }
          return b
        }
      )
    })

    BooksAPI.update(book, newShelf)
  }

  render() {
    const {books, shelves} = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.entries(shelves).map((shelf, index) =>
                  <BookShelf key={index}
                    shelfTitle={shelf[1]}
                    books={books.filter((b) => b.shelf === shelf[0])}
                    onChangeShelf={this.onChangeShelf}
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
