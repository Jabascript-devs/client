import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { patchUser } from "../../../api/users.js";
import PropTypes from "prop-types";

const EditUserForm = (props) => {
    const currentUser = props.currentUser;

    const [editUserResult, setEditUserResult] = useState('')

    const userId = props.userId;

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()

    const editUser = (user) => {
        const filteredUser = Object.fromEntries(
            Object.entries(user).filter(([, value]) => value !== "")
        );
        console.log('editUser', filteredUser);
        patchUser(userId, filteredUser).then(result => setEditUserResult(result.status.toString()))
    }

    useEffect(() => {
        if (currentUser) {
            setValue("fullName", currentUser.fullName)
            setValue("balance", currentUser.balance)
            setValue("address", currentUser.address)
            setValue("phoneNumber", currentUser.phoneNumber)
            setValue("userCategory", currentUser.userCategory ? currentUser.userCategory : "none")
        }
    }, [currentUser]);

    return (
        <div className="edit-user">
            <div className="text">Edit User</div>
            <form id="userEditForm" className="form-default" onSubmit={handleSubmit(editUser)}>
                <div className="label-input-pair">
                    <label htmlFor="fullName" className="text-inside">Full name:</label>
                    <input type="text" id="fullName" name="fullName" className="input-default input-inside" {...register("fullName")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="balance" className="text-inside">Balance:</label>
                    <input type="number" id="balance" name="balance" className="input-default input-inside" {...register("balance")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="address" className="text-inside">Address:</label>
                    <input type="text" id="address" name="address" className="input-default input-inside" {...register("address")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="phoneNumber" className="text-inside">Phone number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" className="input-default input-inside" {...register("phoneNumber")} />
                </div>

                <div className="label-input-pair">
                    <label htmlFor="userCategory" className="text-inside">User category:</label>
                    <input type="text" id="userCategory" name="userCategory" className="input-default input-inside" {...register("userCategory")} />
                </div>

                <button className="default-btn" type="submit" >Submit</button>
            </form>
            <div id="response">{editUserResult.length ? "Response: " + editUserResult : null}</div>
        </div>
    )
}

EditUserForm.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserForm;