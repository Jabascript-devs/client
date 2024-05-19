import {useForm} from "react-hook-form";
import {useState} from "react";
import PropTypes from "prop-types";
import {postOrder} from "../../api/order.js";

const OrderBookForm = (props) => {

    const [orderBookResult, setOrderBookResult] = useState('')

    const bookId = props.bookId;

    const {
        register,
        handleSubmit,
    } = useForm()

    function addDays(dateString, days) {
        const parts = dateString.split('-');
        const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        date.setDate(date.getDate() + days);

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');
    }

    const orderBook = (order) => {
        order.dateTaken = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-')
        order.expectedDateReturn = addDays(order.dateTaken, 2)
        order.book = bookId
        postOrder(order).then(result => setOrderBookResult(result.status.toString())).catch(err => setOrderBookResult(err.response.data.message))
    }

    return (
        <div className="order-book">
            <div className="text">Order Book</div>
            <form id="bookOrderForm" onSubmit={handleSubmit(orderBook)}>
                <label htmlFor="user-id">User id:</label>
                <input type="text" id="user-id" name="user-id" {...register("user")} /><br /><br />

                <button className="default-btn" type="submit" >Submit</button>
            </form>
            <div id="response">{orderBookResult.length? orderBookResult: null}</div>
        </div>
    )
}

OrderBookForm.propTypes = {
    bookId: PropTypes.string.isRequired
};

export default OrderBookForm;