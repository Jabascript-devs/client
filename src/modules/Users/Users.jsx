import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import DataTable from 'react-data-table-component';

import "./style.css"
import { getUsers, postUser } from "../../api/users.js"

const Users = () => {
    const [users, setUsers] = useState([])
    const [result, setResult] = useState('')
    const [searchValue, setSearchValue] = useState("")

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

    return (
        <>
            <div className="user-list-header">
                <div className="text">User List</div>
            </div>
            <div className="create-user">
                <div className="text">Create User</div>
                <form id="userCreateForm" onSubmit={handleSubmit(createUser)}>
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" {...register("fullName")} /><br /><br />

                    <label htmlFor="balance">Balance:</label>
                    <input type="number" id="balance" name="balance" {...register("balance")} /><br /><br />

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" {...register("address")} /><br /><br />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" {...register("phoneNumber")} /><br /><br />

                    <label htmlFor="userCategory">User Category:</label>
                    <input type="number" id="userCategory" name="userCategory" {...register("userCategory")} /><br /><br />

                    <button className="default-btn" type="submit" >Submit</button>
                </form>
                <div id="response">{result.length ? result : null}</div>
            </div>
            <input type="text"
                onChange={handleSearchInputChange}
                value={searchValue}
                placeholder="Search by name"
            />
            <div className="user-list">
                {users.length ? <DataTable
                    columns={columns}
                    data={getFilteredBooks()}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20]}
                /> : null}
            </div>
        </>
    )
}

export default Users;
