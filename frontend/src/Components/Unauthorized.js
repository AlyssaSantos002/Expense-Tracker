import { Link } from "react-router-dom";

const Unauthorized = () =>{
    return(
        <div className="unauthorized-page">
            <h1>The page you are going to needs authorization.</h1>
            <p>Please log in or create an account.</p>
            <div className="unauthorized-page-links">
                <Link to='/' style={{textDecoration: 'none'}}><p>LOG IN</p></Link>
                <Link to='/register' style={{ textDecoration: 'none'}}><p>SIGN UP</p></Link>
            </div>
        </div>
    );
};

export default Unauthorized;