import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import {patchBook} from "../../api/books.js";
import PropTypes from "prop-types";

const EditBookForm = (props) => {
    const currentBook = props.currentBook;

    const [editBookResult, setEditBookResult] = useState('')

    const bookId = props.bookId;

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()

    useEffect(() => {
        if (currentBook) {
            setValue("name", currentBook.name)
            setValue("image", currentBook.image)
            setValue("genre", currentBook.genre)
            setValue("deposit", currentBook.deposit)
            setValue("dayPrice", currentBook.dayPrice)
            setValue("discount", currentBook.discount)
            setValue("available", currentBook.available)
            setValue("bookState", currentBook.bookState)
            setValue("author", currentBook.author?.id ? currentBook.author.id : "")
        }
    }, [currentBook]);


    const editBook = (book) => {
        const filteredBook = Object.fromEntries(
            Object.entries(book).filter(([, value]) => value !== "")
        );
        console.log('editBook', filteredBook);
        patchBook(bookId, filteredBook).then(result => setEditBookResult(result.status.toString()))
    }

    return (
        <div className="edit-book">
            <div className="text">Edit Book</div>
            <form id="bookEditForm" className="form-default" onSubmit={handleSubmit(editBook)}>
                <div className="label-input-pair">
                    <label htmlFor="name" className="text-inside">Name:</label>
                    <input type="text" id="name" name="name"
                           className="input-default input-inside" {...register("name")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="image" className="text-inside">Image:</label>
                    <input type="text" id="image" name="image"
                           className="input-default input-inside" {...register("image")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="genre" className="text-inside">Genre:</label>
                    <input type="text" id="genre" name="genre"
                           className="input-default input-inside" {...register("genre")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="deposit" className="text-inside">Deposit:</label>
                    <input type="number" id="deposit" name="deposit"
                           className="input-default input-inside" {...register("deposit")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="day_price" className="text-inside">Day Price:</label>
                    <input type="number" id="day_price" name="day_price"
                           className="input-default input-inside" {...register("dayPrice")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="discount" className="text-inside">Discount:</label>
                    <input type="number" id="discount" name="discount"
                           className="input-default input-inside" {...register("discount")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="available" className="text-inside">Available:</label>
                    <input type="checkbox" name="available" className="checkbox-default" {...register("available")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="state" className="text-inside">State:</label>
                    <input type="text" id="state" name="state"
                           className="input-default input-inside" {...register("bookState")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="authorId" className="text-inside">Author:</label>
                    <input type="number" id="authorId" name="authorId"
                           className="input-default input-inside" {...register("author")} />
                </div>

                <button className="default-btn" type="submit">Submit</button>
            </form>
            <div id="response">{editBookResult.length ? "Response: " + editBookResult : null}</div>
        </div>
    )
}

EditBookForm.propTypes = {
    bookId: PropTypes.string.isRequired,
    currentBook: PropTypes.object.isRequired
};

export default EditBookForm;