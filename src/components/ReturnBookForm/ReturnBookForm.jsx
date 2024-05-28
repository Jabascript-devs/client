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

    const hideForm = () => {
        document.getElementById("return-book-modal").style.display = "none"
    }

    return (
        <div className="return-book-blur" id="return-book-modal">
            <div className="return-book-bg">
                <div className="return-book">
                    <div className="text return-book-title">Return Book</div>
                    <button className="close-modal" onClick={() => hideForm()}>X</button>
                    <form id="bookReturnForm" className="form-default" onSubmit={handleSubmit(returnBook)}>
                        <div className="label-input-pair">
                            <label htmlFor="order-id" className="text-inside-return">Order id:</label>
                            <input type="text" id="order-id" name="order-id" className="input-default input-inside-return" {...register("id")} /><br /><br />
                        </div>

                        <div className="label-input-pair">
                            <label htmlFor="date-return" className="text-inside-return">Return date:</label>
                            <input type="text" id="date-return" name="date-return" className="input-default input-inside-return" {...register("dateReturned")} /><br /><br />
                        </div>

                        <div className="label-input-pair">    
                            <label htmlFor="book-state" className="text-inside-return">Book state:</label>
                            <input type="text" id="book-state" name="book-state" className="input-default input-inside-return" {...register("state")} /><br /><br />
                        </div>
                        <button className="default-btn form-margin" type="submit" >Submit</button>
                    </form>
                    <div id="response">{returnBookResult.length ?  "Response: " +  returnBookResult : null}</div>
                </div>
            </div>
        </div>
    )
}

export default ReturnBookForm;