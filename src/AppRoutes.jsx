import {Route, Routes} from "react-router-dom";

import Home from "./modules/Home/Home.jsx"
import Books from "./modules/Books/Books.jsx"
import Users from "./modules/Users/Users.jsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/users" element={<Users />}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
  )
}

export default AppRoutes;
