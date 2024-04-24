import {Route, Routes} from "react-router-dom";

import Home from "./modules/Home/Home.jsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
  )
}

export default AppRoutes;
