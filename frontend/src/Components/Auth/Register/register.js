import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result);
                window.location.href = '/';
            } else {
                alert(result.message)
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className='login-container'>
            <>

                <div className='register'>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className='input'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Full name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className='input'>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className='input'>
                            <input
                                type='password'
                                name='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <button type='submit'>Sign Up</button>

                        <div className='register-link'>
                            <p>Already have an account ?
                                <Link to="/">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>

            </>
        </div>
    )
}

export default Register;