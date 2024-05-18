import {http} from "../http";

export const getBooks = () => {
  return http.get('/books')
}

export const getBook = (id) => {
  return http.get(`/books/${id}`)
}

export const postBook = (book) => {
  return http.post('/books', book)
}

export const patchBook = (bookId, book) => {
  return http.patch(`/books/${bookId}`, book)
}

export const deleteBook = (bookId) => {
  return http.delete(`/books/${bookId}`)
}