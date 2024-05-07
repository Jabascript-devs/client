import {http} from "../http";

export const getBooks = () => {
  return http.get('/books')
}

export const postBook = (book) => {
  return http.post('/books', book)
}