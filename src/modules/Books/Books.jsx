import { getBooks } from "../../api/books.js"
import { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(()=>{
    getBooks().then(({data})=>setBooks(data))
  }, [])

  console.log(books);
  return books.length ? books.map((book)=> <div key={book.id}>{book.name}</div>) : <div>No Books</div>
}

export default Books;
