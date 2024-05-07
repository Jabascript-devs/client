import {useEffect, useState} from "react";
import { useForm } from "react-hook-form"
import DataTable from 'react-data-table-component';

import "./style.css"
import {getBooks, postBook} from "../../api/books.js"

const Books = () => {
    const [books, setBooks] = useState([])
    const [result, setResult] = useState('')

    const coverPath = '/img/'

    const {
        register,
        handleSubmit,
    } = useForm()

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'name',
            selector: row => row.name,
        },
        {
            name: 'image',
            selector: row => <img className="book-cover" src={`${coverPath}`+row.image+'.png'}  alt="book cover"/>,
        },
        {
            name: 'day price',
            selector: row => row.dayPrice,
        },
        {
            name: 'discount',
            selector: row => row.discount,
        },
        {
            name: 'available',
            selector: row => row.available===true ? 'Yes' : 'No',
        },
        {
            name: 'book state',
            selector: row => row.bookState,
        },
        {
            name: 'author',
            selector: row => row.author.fullName,
        },
    ];

    const createBook = (book) => {
        postBook(book).then(result => setResult(result.status.toString()))
    }

    useEffect(() => {
        getBooks().then(({data}) => setBooks(data))
    }, [])

    return (
        <>
            <div className="book-list-header">
                <div className="text">Book List</div>
            </div>
            <div className="create-book">
                <div className="text">Create Book</div>
                <form id="bookCreateForm" onSubmit={handleSubmit(createBook)}>
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
                <div id="response">{result.length? result: null}</div>
            </div>
            <div className="book-list">
                {books.length ? <DataTable
                    columns={columns}
                    data={books}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20]}
                /> : null}
            </div>
        </>
    )
}

export default Books;
