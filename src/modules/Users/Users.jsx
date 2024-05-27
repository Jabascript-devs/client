import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import DataTable from 'react-data-table-component';

import "./style.css"
import { getUsers, postUser } from "../../api/users.js"
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([])
    const [result, setResult] = useState('')
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm()

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'full name',
            selector: row => row.fullName,
        },
        {
            name: 'balance',
            selector: row => row.balance,
        },
        {
            name: 'address',
            selector: row => row.address,
        },
        {
            name: 'phone number',
            selector: row => row.phoneNumber,
        },
        {
            name: 'category',
            selector: row => row.userCategory,
        },
        {
            name: 'link',
            selector: row => <a href={`/user/${row.id}`}>{row.fullName}</a>,
        },
    ];

    const createUser = (user) => {
        console.log('user', user);
        postUser(user).then(result => setResult(result.status.toString()));
    }

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const getFilteredBooks = () => {
        if (!searchValue) return users;
        return users.filter((user) =>
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    useEffect(() => {
        getUsers().then(({ data }) => {
            setUsers(data);
            console.log('data', data);
        })
    }, [])

    const showCreateUserForm = () => {
        document.getElementById("create-user-modal").style.display = "flex"
    }

    const hideCreateUserForm = () => {
        document.getElementById("create-user-modal").style.display = "none"
    }

    return (
        <>
            <button className="back-button" onClick={() => navigate("/")}>&lt;-</button>
            <div className="user-list-header">
                <div className="text">User List</div>
            </div>
            <div className="manage-and-search">
                <div className="search">
                    <input type="text"
                        onChange={handleSearchInputChange}
                        value={searchValue}
                        placeholder="Search by name"
                        className="input-default"
                    />
                    <button className="default-btn btn-manage" onClick={() => setSearchValue("")}>Clear</button>
                </div>
                <div className="manage">
                    <button className="default-btn btn-manage" onClick={() => showCreateUserForm()}>Create User</button>
                </div>
            </div>
            <div className="user-list">
                {users.length ? <DataTable
                    columns={columns}
                    data={getFilteredBooks()}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20]}
                /> : null}
            </div>
            <div className="create-user-blur" id="create-user-modal">
                <div className="create-user-bg">
                    <div className="create-user">
                        <button className="close-modal" onClick={() => hideCreateUserForm()}>X</button>
                        <div className="text create-user-title">Create User</div>
                        <form id="userCreateForm" className="form-default" onSubmit={handleSubmit(createUser)}>
                            <div className="label-input-pair">
                                <label htmlFor="fullName" className="text-inside">Full Name:</label>
                                <input type="text" id="fullName" name="fullName" className="input-default input-inside" {...register("fullName")} /><br /><br />
                            </div>

                            <div className="label-input-pair">
                                <label htmlFor="balance" className="text-inside">Balance:</label>
                                <input type="number" id="balance" name="balance" className="input-default input-inside" {...register("balance")} /><br /><br />
                            </div>

                            <div className="label-input-pair">
                                <label htmlFor="address" className="text-inside">Address:</label>
                                <input type="text" id="address" name="address" className="input-default input-inside" {...register("address")} /><br /><br />
                            </div>

                            <div className="label-input-pair">
                                <label htmlFor="phoneNumber" className="text-inside">Phone Number:</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" className="input-default input-inside" {...register("phoneNumber")} /><br /><br />
                            </div>

                            <div className="label-input-pair">
                                <label htmlFor="userCategory" className="text-inside">User Category:</label>
                                <input type="number" id="userCategory" name="userCategory" className="input-default input-inside" {...register("userCategory")} /><br /><br />
                            </div>

                            <button className="default-btn form-margin" type="submit" >Submit</button>
                        </form>
                        <div id="response">{result.length ? result : null}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;
