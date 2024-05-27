import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';

import "./style.css"
import { getUser } from "../../api/users.js";
import { getUserOrders } from "../../api/order.js";
import UserProperties from "../../components/UserComponents/UserProperties/UserProperties"
import EditUserForm from "../../components/UserComponents/EditUser/EditBookForm";
import DeleteUser from "../../components/UserComponents/DeleteUser/DeleteUser";

const columns = [
    {
        name: 'id',
        selector: row => row.id,
    },
    {
        name: 'taken date',
        selector: row => row.dateTaken,
    },
    {
        name: 'return date',
        selector: row => row.dateTaken,
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
            <div className="user-properties">
                <UserProperties currentUser={currentUser} />
            </div>
            <div className="user-options">
                <EditUserForm userId={userId} />
                <div>
                    <h1 className="user-name">User Orders</h1>
                    <input type="text"
                        onChange={handleSearchInputChange}
                        value={searchValue}
                        placeholder="Search by book name"
                    />
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
            <DeleteUser userId={userId} />
        </div>
    ) : null;
}

export default User;
