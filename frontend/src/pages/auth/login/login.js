import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });


            const result = await response.json();
            if (response.ok) {
                console.log(result);
                window.location.href = '/profile';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };


    return (
            <div className='login'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div className='input'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <div className='icon'>
                            <i class="bi bi-envelope"></i>
                        </div>
                    </div>
                    <div className='input'>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <div className='icon'>
                            <i class="bi bi-lock-fill"></i>
                        </div>
                    </div>

                    <button type='submit'>Login</button>

                    <div className='register-link'>
                        <p>Don't have an account ?
                            <Link to="/register" className='a'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
       
    )
}

export default Login;