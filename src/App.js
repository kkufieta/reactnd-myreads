import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

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
        this.setState({books})
    })
    
  }

  onChangeShelf = (book, newShelf) => {
    book.shelf = newShelf
    if (this.state.books.find((b) => {return b.id === book.id})) {
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
    } else {
      this.setState(state => {
        state.books.push(book)
      })
    }

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
          <SearchBook
            books={books}
            onChangeShelf={this.onChangeShelf}
          />          
        )}/>
      </div>
    )
  }
}

export default BooksApp
