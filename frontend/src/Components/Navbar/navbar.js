import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './navbar.css'
import logo from '../../images/logo.jpg'
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='logo'>
               {/* <img src= {logo} ></img> */}
            </div>
            <ul>
                <li>
                    <div className='nav-item'>
                        <div className='nav-icon'>
                            <i class="bi bi-house-heart"></i>
                        </div>
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='nav-item'>
                        <div className='nav-icon'>
                            <i class="bi bi-piggy-bank"></i>
                        </div>
                        <Link to="/expense" className="nav-link">
                            Expense
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='nav-item'>
                        <div className='nav-icon'>
                            <i class="bi bi-person-circle"></i>
                        </div>
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;




