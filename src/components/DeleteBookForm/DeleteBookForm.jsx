import {useForm} from "react-hook-form";
import {useState} from "react";
import PropTypes from "prop-types";
import {deleteBook} from "../../api/books.js";
import { useNavigate } from "react-router-dom";

const DeleteBookForm = (props) => {
    const navigate = useNavigate()

    const [deleteBookResult, setDeleteBookResult] = useState('')

    const bookId = props.bookId;

    const {
        handleSubmit,
    } = useForm()

    const removeBook = () => {
        return deleteBook(bookId).then(result => setDeleteBookResult(result.status.toString()))
    }

    return (
        <div className="delete-book">
            <div className="text">Delete Book</div>
            <form id="bookDeleteForm" className="form-default" onSubmit={handleSubmit(removeBook)}>

                <button className="default-btn" type="submit" >Submit</button>
            </form>
            <div id="response">{deleteBookResult.length ? "Response: " + deleteBookResult : null}</div>
        </div>
    )
}

DeleteBookForm.propTypes = {
    bookId: PropTypes.string.isRequired
};

export default DeleteBookForm;