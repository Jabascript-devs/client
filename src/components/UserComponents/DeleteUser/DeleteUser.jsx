import { useForm } from "react-hook-form";
import { useState } from "react";
import PropTypes from "prop-types";
import { deleteUser } from "../../../api/users.js";

const DeleteUser = (props) => {

  const [deleteUserResult, setDeleteUserResult] = useState('')

  const userId = props.userId;

  const {
    handleSubmit,
  } = useForm()

  const removeUser = () => {
    return deleteUser(userId).then(result => setDeleteUserResult(result.status.toString()))
  }

  return (
    <div className="delete-user">
      <div className="text">Delete User</div>
      <form id="userDeleteForm" onSubmit={handleSubmit(removeUser)}>
        <button className="default-btn" type="submit" >Submit</button>
      </form>
      <div id="response">{deleteUserResult.length ? deleteUserResult : null}</div>
    </div>
  )
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default DeleteUser;