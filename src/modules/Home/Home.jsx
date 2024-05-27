import "./style.css"
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const navigateTo = (link) => {
        navigate(link)
    }

    return (
        <>
            <div className="background-main"/>
            <div className="book-user-choice">
                <button className="default-btn" onClick={()=>{navigateTo("/books")}}>Books</button>
                <button className="default-btn" onClick={()=>{navigateTo("/users")}}>User</button>
            </div>
        </>
    )
}

export default Home;
