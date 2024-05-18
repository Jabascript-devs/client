import {http} from "../http";

export const postOrder = (order) => {
    return http.post('/order', order)
}

export const patchOrder = (orderId, order) => {
    return http.patch(`/order/${orderId}`, order)
}