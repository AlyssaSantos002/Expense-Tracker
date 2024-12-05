import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import avatar from '../../images/avarat.png'

const NavBarComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');

        if (storedEmail) {
            axios.post('/auth/profile', { email: storedEmail })
                .then(response => {
                    setName(response.data.user.name);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }

    }, []);

    const signOuthandler = async () => {
        try {
            const response = await axios.get('/auth/signout');
            localStorage.clear()
            navigate("/");
        } catch (error) {
            console.error("Error Logging out", error)
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/profile" className="brand-link">
                    <i class="bi bi-person-circle"></i>
                    <h2>Hello, {name}</h2>
                </a>
            </div>

            <div className="navbar-links">
                <a href="/home" className="nav-link">Home</a>
                <a href="/expense" className="nav-link">Expense</a>
                <a href="/budget" className="nav-link">Budget</a>
                <a onClick={signOuthandler} className="nav-link">Logout</a>
            </div>
        </nav>
    );
};

export default NavBarComponent;
