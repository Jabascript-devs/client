import { http } from "../http";

export const postOrder = (order) => {
    return http.post('/order', order)
}

export const getUserOrders = (userId) => {
    return http.get(`/order/user/${userId}`)
}

export const patchOrder = (orderId, order) => {
    return http.patch(`/order/${orderId}`, order)
}