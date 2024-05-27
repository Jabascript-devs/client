import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import "./style.css"
import {getBook} from "../../api/books.js";
import BookProperties from "../../components/BookProperties/BookProperties.jsx"
import EditBookForm from "../../components/EditBookForm/EditBookForm.jsx";
import OrderBookForm from "../../components/OrderBookForm/OrderBookForm.jsx";
import ReturnBookForm from "../../components/ReturnBookForm/ReturnBookForm.jsx";
import DeleteBookForm from "../../components/DeleteBookForm/DeleteBookForm.jsx";

const Book = () => {
    const [currentBook, setCurrentBook] = useState({})
    const navigate = useNavigate()

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
            <button className="back-button" onClick={() => navigate(-1)}>&lt;-</button>
            <div className="book-properties">
                <BookProperties currentBook={currentBook}/>
            </div>
            <div className="book-edit">
                <EditBookForm bookId={bookId} currentBook={currentBook}/>
            </div>
            <div className="book-order-delete">
                <OrderBookForm bookId={bookId}/>
                <DeleteBookForm bookId={bookId}/>
            </div>
        </div>
    ) : null;
}

export default Book;