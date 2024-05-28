import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';

import "./style.css"
import { getUser } from "../../api/users.js";
import { getUserOrders } from "../../api/order.js";
import UserProperties from "../../components/UserComponents/UserProperties/UserProperties"
import EditUserForm from "../../components/UserComponents/EditUser/EditUserForm.jsx";
import DeleteUser from "../../components/UserComponents/DeleteUser/DeleteUser";

const columns = [
    {
        name: 'order id',
        selector: row => row.id,
    },
    {
        name: 'date taken',
        selector: row => row.dateTaken,
    },
    {
        name: 'expected date return',
        selector: row => row.expectedDateReturn,
    },
    {
        name: 'date returned',
        selector: row => row.dateReturned,
    },
    {
        name: 'book',
        selector: row => <a href={`/book/${row.book.id}`}>{row.book.name}</a>,
    },
];

const User = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [orders, setOrders] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const { userId } = useParams()

    useEffect(() => {
        getUser(userId)
            .then(({ data }) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err);
            });

        getUserOrders(userId).then(({ data }) => {
            setOrders(data)
        })
            .then(({ data }) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const getFilteredOrders = () => {
        if (!searchValue) return orders;
        return orders.filter((order) =>
            order.book.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    return currentUser ? (
        <div className="user-page">
            <button className="back-button" onClick={() => navigate(-1)}>&lt;-</button>
            <div className="user-control">
                <UserProperties currentUser={currentUser} />
                <EditUserForm userId={userId} currentUser={currentUser} />
                <DeleteUser userId={userId} />
            </div>
            <div className="user-orders">
                <h1 className="user-props">User Orders</h1>
                <div className="search">
                    <input type="text"
                        onChange={handleSearchInputChange}
                        value={searchValue}
                        placeholder="Search by book name"
                        className="input-default"
                    />
                    <button className="default-btn btn-manage" onClick={() => setSearchValue("")}>Clear</button>
                </div>
                <div className="book-list">
                    {orders.length ? <DataTable
                        columns={columns}
                        data={getFilteredOrders()}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 20]}
                    /> : null}
                </div>
            </div>
        </div>
    ) : null;
}

export default User;
