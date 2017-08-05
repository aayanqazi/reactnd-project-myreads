import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static propTypes = { changeShelf: PropTypes.func.isRequired }

  state = {
    query: '',
    books: [],
    searchErr: false
  }

  getBooks = (event) => {
    this.setState({ query: event.target.value })
    let query = event.target.value
    if (query) {
      BooksAPI.search(query, 10).then((books) => {
        books.length > 0 ?  this.setState({books: books, searchErr: false }) : this.setState({ searchErr: true })
      })
    } else this.setState({books: [], searchErr: false })
  }

  render() {
    
    const { query, books, searchErr } = this.state
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={ query }
                onChange={ this.getBooks } />
            </div>
          </div>
          <div className="search-books-results">
            { books.length > 0 && (
              <div>
                <div className=''>
                  <h3>Search returned { books.length} books </h3>
                </div>
                <ol className="books-grid">
                  {books.map((book) => (
                    <Book
                      book={ book }
                      key={ book.id }
                      changeShelf={ this.props.changeShelf }
                    />
                  ))}
                </ol>
              </div>
            )}
            { searchErr  && (
              <div>
                <div className=''>
                  <h3>Search returned 0 books.  Please try again!</h3>
                  </div>
                </div>
            )}
          </div>
        </div>
      )}
}
export default Search