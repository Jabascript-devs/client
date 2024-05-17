import {useForm} from "react-hook-form";
import {useState} from "react";
import {patchOrder} from "../../api/order.js";

const ReturnBookForm = () => {
    const [returnBookResult, setReturnBookResult] = useState('')

    const {
        register,
        handleSubmit,
    } = useForm()

    const returnBook = (order) => {
        console.log('returnBook',order);
        patchOrder(order.id ,order).then(result => setReturnBookResult(result.status.toString())).catch(err => setReturnBookResult(err.response.data.message))
    }

    return (
        <div className="return-book">
            <div className="text">Return Book</div>
            <form id="bookReturnForm" onSubmit={handleSubmit(returnBook)}>
                <label htmlFor="order-id">Order id:</label>
                <input type="text" id="order-id" name="order-id" {...register("id")} /><br /><br />

                <label htmlFor="date-return">Return date:</label>
                <input type="text" id="date-return" name="date-return" {...register("dateReturned")} /><br /><br />

                <button className="default-btn" type="submit" >Submit</button>
            </form>
            <div id="response">{returnBookResult.length? returnBookResult: null}</div>
        </div>
    )
}

export default ReturnBookForm;