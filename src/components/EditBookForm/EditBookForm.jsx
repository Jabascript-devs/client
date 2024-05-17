import {useForm} from "react-hook-form";
import {useState} from "react";
import {patchBook} from "../../api/books.js";
import PropTypes from "prop-types";

const EditBookForm = (props) => {

    const [editBookResult, setEditBookResult] = useState('')

    const bookId = props.bookId;

    const {
        register,
        handleSubmit,
    } = useForm()

    const editBook = (book) => {
        const filteredBook = Object.fromEntries(
            Object.entries(book).filter(([, value]) => value !== "")
        );
        console.log('editBook',filteredBook);
        patchBook(bookId, filteredBook).then(result => setEditBookResult(result.status.toString()))
    }

    return (
        <div className="edit-book">
            <div className="text">Edit Book</div>
            <form id="bookEditForm" onSubmit={handleSubmit(editBook)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" {...register("name")} /><br /><br />

                <label htmlFor="image">Image:</label>
                <input type="text" id="image" name="image" {...register("image")} /><br /><br />

                <label htmlFor="deposit">Deposit:</label>
                <input type="number" id="deposit" name="deposit" {...register("deposit")} /><br /><br />

                <label htmlFor="day_price">Day Price:</label>
                <input type="number" id="day_price" name="day_price" {...register("dayPrice")} /><br /><br />

                <label htmlFor="discount">Discount:</label>
                <input type="number" id="discount" name="discount" {...register("discount")} /><br /><br />

                <label htmlFor="available">Available:</label>
                <input type="checkbox" name="available" {...register("available")} /><br /><br />

                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" {...register("bookState")} /><br /><br />

                <label htmlFor="authorId">Author:</label>
                <input type="number" id="authorId" name="authorId" {...register("author")} /><br /><br />

                <button className="default-btn" type="submit" >Submit</button>
            </form>
            <div id="response">{editBookResult.length? editBookResult: null}</div>
        </div>
    )
}

EditBookForm.propTypes = {
    bookId: PropTypes.string.isRequired
};

export default EditBookForm;