import NavBarComponent from "./Navbar/navbar";
import { Link } from "react-router-dom";

const NotFound = () => {

    return(
        <div className="not-found-page">
            <NavBarComponent/>
            <h1>Page Not Found</h1>
            <p>The page you are going to does not exist.</p>

            <div className="not-found-page-links">
                <Link to='/home' style={{textDecoration: 'none'}}><p>RETURN TO HOME</p></Link>
            </div>
        </div>
    );
};

export default NotFound;