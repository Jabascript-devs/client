import {Route, Routes} from "react-router-dom";

import Home from "./modules/Home/Home.jsx"
import Books from "./modules/Books/Books.jsx"
import Book from "./modules/Book/Book.jsx"
import User from "./modules/User/User.jsx"
import Users from "./modules/Users/Users.jsx"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/users" element={<Users/>}/>
            <Route path="/user/:userId" element={<User/>}/>
            <Route path="/book/:bookId" element={<Book/>}/>
            <Route path="/books" element={<Books/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}

export default AppRoutes;
