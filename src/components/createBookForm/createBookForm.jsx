import {useForm} from "react-hook-form";
import {postBook} from "../../api/books.js";
import {useState} from "react";

const CreateBookForm = () => {
    const [result, setResult] = useState('')

    const {
        register,
        handleSubmit,
    } = useForm()

    const createBook = (book) => {
        postBook(book).then(result => setResult(result.status.toString()))
    }

    return (
        <div className="create-book">
            <div className="text">Create Book</div>
            <form id="bookCreateForm" onSubmit={handleSubmit(createBook)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" {...register("name")} /><br/><br/>

                <label htmlFor="image">Image:</label>
                <input type="text" id="image" name="image" {...register("image")} /><br/><br/>

                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" name="genre" {...register("genre")} /><br/><br/>

                <label htmlFor="deposit">Deposit:</label>
                <input type="number" id="deposit" name="deposit" {...register("deposit")} /><br/><br/>

                <label htmlFor="day_price">Day Price:</label>
                <input type="number" id="day_price" name="day_price" {...register("dayPrice")} /><br/><br/>

                <label htmlFor="discount">Discount:</label>
                <input type="number" id="discount" name="discount" {...register("discount")} /><br/><br/>

                <label htmlFor="available">Available:</label>
                <input type="checkbox" name="available" {...register("available")} /><br/><br/>

                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" {...register("bookState")} /><br/><br/>

                <label htmlFor="authorId">Author:</label>
                <input type="number" id="authorId" name="authorId" {...register("author")} /><br/><br/>

                <button className="default-btn" type="submit">Submit</button>
            </form>
            <div id="response">{result.length ? result : null}</div>
        </div>
    )
}

export default CreateBookForm;