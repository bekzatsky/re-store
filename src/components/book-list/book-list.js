import React, {Component} from "react";
import "./book-list.css";
import BookListItem from "../book-list-item";
import {connect} from "react-redux";
import {withBookstoreService} from "../hoc/with-bookstore-service";

class BookList extends Component {

    componentDidMount() {
        const {bookstoreService} = this.props;
        const data = bookstoreService.getBooks();
        console.log(data);

        this.props.booksLoaded(data);
    }

    render() {
        const {books} = this.props;
        return (
            <ul>
                {
                    books.map(book => {
                        return (
                            <li key={book.id}>
                                <BookListItem book={book}/>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        booksLoaded: (newBooks) => {
            dispatch({
                type: 'BOOKS_LOADED',
                payload: newBooks
            });
        }
    };
};

export default withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookList)
);