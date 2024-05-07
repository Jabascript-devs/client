import "./style.css"
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const navigateTo = (link) => {
        navigate(link)
    }

    return (
        <>
            <div>
                <div className="banner">
                    <img className="banner-library" src="/img/banner-library.png" alt="library banner"/>
                </div>
                <div className="book-user-choice">
                    <button className="choice-btn" onClick={()=>{navigateTo("/books")}}>Books</button>
                    <button className="choice-btn" onClick={()=>{navigateTo("/users")}}>User</button>
                </div>
            </div>
        </>
    )
}

export default Home;
