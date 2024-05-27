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

    const hideForm = () => {
        document.getElementById("create-book-modal").style.display = "none"
    }

    return (
        <div className="create-book-blur" id="create-book-modal">
            <div className="create-book-bg">
                <div className="create-book">
                    <div className="text create-book-title">Create Book</div>
                    <button className="close-modal" onClick={() => hideForm()}>X</button>
                    <form id="bookCreateForm" className="form-default" onSubmit={handleSubmit(createBook)}>
                        <div className="label-input-pair">
                            <label htmlFor="name" className="text-inside">Name:</label>
                            <input type="text" id="name" name="name" className="input-default input-inside" {...register("name")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="image" className="text-inside">Image:</label>
                            <input type="text" id="image" name="image" className="input-default input-inside" {...register("image")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="genre" className="text-inside">Genre:</label>
                            <input type="text" id="genre" name="genre" className="input-default input-inside" {...register("genre")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="deposit" className="text-inside">Deposit:</label>
                            <input type="number" id="deposit" name="deposit" className="input-default input-inside" {...register("deposit")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="day_price" className="text-inside">Day Price:</label>
                            <input type="number" id="day_price" name="day_price" className="input-default input-inside" {...register("dayPrice")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="discount" className="text-inside">Discount:</label>
                            <input type="number" id="discount" name="discount" className="input-default input-inside" {...register("discount")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="available" className="text-inside">Available:</label>
                            <input type="checkbox" name="available" className="checkbox-default" {...register("available")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="state" className="text-inside">State:</label>
                            <input type="text" id="state" name="state" className="input-default input-inside" {...register("bookState")} /><br/><br/>
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="authorId" className="text-inside">Author:</label>
                            <input type="number" id="authorId" name="authorId" className="input-default input-inside" {...register("author")} /><br/><br/>
                        </div>

                        <button className="default-btn" type="submit">Submit</button>
                    </form>
                    <div id="response">{result.length ? result : null}</div>
                </div>
            </div>
        </div>
    )
}

export default CreateBookForm;