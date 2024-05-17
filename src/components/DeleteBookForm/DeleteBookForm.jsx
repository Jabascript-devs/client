import {useForm} from "react-hook-form";
import {useState} from "react";
import PropTypes from "prop-types";
import {deleteBook} from "../../api/books.js";

const DeleteBookForm = (props) => {

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
            <form id="bookDeleteForm" onSubmit={handleSubmit(removeBook)}>

                <button className="default-btn" type="submit" >Submit</button>
            </form>
            <div id="response">{deleteBookResult.length? deleteBookResult: null}</div>
        </div>
    )
}

DeleteBookForm.propTypes = {
    bookId: PropTypes.string.isRequired
};

export default DeleteBookForm;