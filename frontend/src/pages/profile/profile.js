import React, { useState, useEffect } from 'react';
import './profile.css';
import auth from '../../images/auth.jpg';

const Profile = () => {
   
    return (
        <div className='profile'>
            <h1 className='profile-heading'>Profile</h1>
            <div className='profile-info'>
                <div className='info'>
                    <h4><strong>Full Name</strong></h4>
                    <p></p> {/* Display user's name */}
                </div>
                <div className='info'>
                    <h4><strong>Email</strong></h4>
                    <p></p> {/* Display user's email */}
                </div>
                <div className='info'>
                    <h4><strong>Password</strong></h4>
                    <p></p> {/* Placeholder for password (you can hide this or leave it out) */}
                </div>
            </div>
            <div className='profile-avatar'>
                <img src={auth} alt="Profile Avatar" />
            </div>
        </div>
    );
};

export default Profile;
