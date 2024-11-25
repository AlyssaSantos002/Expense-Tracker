import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from "axios";
import auth from '../../images/profile.jpg';

const Profile = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
    
        if (storedEmail) {
            setEmail(storedEmail);

            // If localStorage data is missing, fetch data from the server
            axios.post('http://localhost:8000/auth/profile', { email: storedEmail })
                .then(response => {
                    setName(response.data.user.name);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []);

    return (
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
    );
};

export default Profile;