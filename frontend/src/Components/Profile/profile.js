import React, { useState, useEffect } from 'react';
import NavBarComponent from "../Navbar/Navbar";
import './profile.css';
import axios from "axios";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');

        if (storedEmail) {
            setEmail(storedEmail);

            axios.post('/auth/profile', { email: storedEmail })
                .then(response => {
                    setName(response.data.user.name);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }

    }, []);

    return (
        <>
        <NavBarComponent/>
        <div className='profile'>
            <h1 className='profile-heading'>Profile</h1>
            <div className='profile-info'>
                <div className='info'>
                    <h4><strong>Full Name</strong></h4>
                    <p>{name}</p>
                </div>
                <div className='info'>
                    <h4><strong>Email</strong></h4>
                    <p>{email}</p>
                </div>
            </div>
            </div> 
        
        </>
    );
};

export default Profile;