import { useForm } from "react-hook-form";
import { useState } from "react";
import { patchUser } from "../../../api/users.js";
import PropTypes from "prop-types";

const EditUserForm = (props) => {

  const [editUserResult, setEditUserResult] = useState('')

  const userId = props.userId;

  const {
    register,
    handleSubmit,
  } = useForm()

  const editUser = (user) => {
    const filteredUser = Object.fromEntries(
      Object.entries(user).filter(([, value]) => value !== "")
    );
    console.log('editUser', filteredUser);
    patchUser(userId, filteredUser).then(result => setEditUserResult(result.status.toString()))
  }

  return (
    <div className="edit-user">
      <div className="text">Edit User</div>
      <form id="userEditForm" onSubmit={handleSubmit(editUser)}>
        <label htmlFor="fullName">full name:</label>
        <input type="text" id="fullName" name="fullName" {...register("fullName")} /><br /><br />

        <label htmlFor="balance">balance:</label>
        <input type="number" id="balance" name="balance" {...register("balance")} /><br /><br />

        <label htmlFor="address">address:</label>
        <input type="text" id="address" name="address" {...register("address")} /><br /><br />

        <label htmlFor="phoneNumber">phone number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" {...register("phoneNumber")} /><br /><br />

        <label htmlFor="userCategory">user category:</label>
        <input type="number" id="userCategory" name="userCategory" {...register("userCategory")} /><br /><br />

        <button className="default-btn" type="submit" >Submit</button>
      </form>
      <div id="response">{editUserResult.length ? editUserResult : null}</div>
    </div>
  )
}

EditUserForm.propTypes = {
  userId: PropTypes.string.isRequired
};

export default EditUserForm;