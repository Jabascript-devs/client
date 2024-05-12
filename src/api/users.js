import { http } from "../http";

export const getUsers = () => {
  return http.get('/user')
}

export const postUser = (user) => {
  return http.post('/user', user)
}