import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "./style.css"
import {getBook} from "../../api/books.js";
import BookProperties from "../../components/BookProperties/BookProperties.jsx"
import EditBookForm from "../../components/EditBookForm/EditBookForm.jsx";
import OrderBookForm from "../../components/OrderBookForm/OrderBookForm.jsx";
import ReturnBookForm from "../../components/ReturnBookForm/ReturnBookForm.jsx";
import DeleteBookForm from "../../components/DeleteBookForm/DeleteBookForm.jsx";

const Book = () => {
    const [currentBook, setCurrentBook] = useState({})

    const {bookId} = useParams()

    useEffect(() => {
        getBook(bookId)
            .then(({data}) => {
            setCurrentBook(data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return currentBook ? (
        <div className="book-page">
            <div className="book-properties">
                <BookProperties currentBook={currentBook}/>
            </div>
            <div className="book-options">
                <EditBookForm bookId={bookId}/>
                <OrderBookForm bookId={bookId}/>
                <ReturnBookForm />
                <DeleteBookForm bookId={bookId}/>
            </div>
        </div>
    ) : null;
}

export default Book;