import {http} from "../http";

export const getBooks = () => {
  return http.get('/books')
}
