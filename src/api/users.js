import { http } from "../http";

export const getUsers = () => {
  return http.get('/user')
}

export const getUser = (id) => {
  return http.get('/user/' + id)
}

export const postUser = (user) => {
  return http.post('/user', user)
}

export const patchUser = (userId, user) => {
  return http.patch(`/user/${userId}`, user)
}

export const deleteUser = (userId) => {
  return http.delete(`/user/${userId}`)
}
