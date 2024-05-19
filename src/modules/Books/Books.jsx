import {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';

import "./style.css"
import {getBooks} from "../../api/books.js"
import ReturnBookForm from "../../components/ReturnBookForm/ReturnBookForm.jsx";
import CreateBookForm from "../../components/createBookForm/createBookForm.jsx";

const Books = () => {
    const [books, setBooks] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const coverPath = '/img/'

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
            name: 'genre',
            selector: row => row.genre,
        },
        {
            name: 'deposit',
            selector: row => row.deposit,
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
        {
            name: 'link',
            selector: row => <a href={`/book/${row.id}`}>{row.name}</a>,
        },
    ];

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const getFilteredBooks = () => {
        if (!searchValue) return books;
        return books.filter((book) =>
            book.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    useEffect(() => {
        getBooks().then(({data}) => {
            setBooks(data)
        })
    }, [])

    return books ? (
        <>
            <div className="book-list-header">
                <div className="text">Book List</div>
            </div>
            <CreateBookForm />
            <ReturnBookForm />
            <input type="text"
                   onChange={handleSearchInputChange}
                   value={searchValue}
                   placeholder="Search by name"
            />
            <div className="book-list">
                {books.length ? <DataTable
                    columns={columns}
                    data={getFilteredBooks()}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20]}
                /> : null}
            </div>
        </>
    ) : null;
}

export default Books;
