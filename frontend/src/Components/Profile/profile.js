import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from "axios";
import avatar from '../../images/profile.jpg'
import Navbar from '../Navbar/navbar';

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
        <Navbar/>
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


            {/* temporary */}
             {/* <div className="nav-links">
                <Link to="/home">Go to Home</Link> */}

                <div className='profile-avatar'>
                    <img src={avatar}></img>

                </div>
            </div> 
        
        </>
    );
};

export default Profile;