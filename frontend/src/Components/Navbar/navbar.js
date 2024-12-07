import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBarComponent = () => {
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

    const handleLogout = async () => {
        try {

            const response = await fetch('/auth/signout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                localStorage.removeItem('userId'); 
                localStorage.removeItem('userEmail'); 
                localStorage.removeItem('userName'); 
                window.location.href = '/';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
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
                <a onClick={handleLogout} className="nav-link">Logout</a>
            </div>
        </nav>
    );
};

export default NavBarComponent;
