import React, { useState } from 'react';

import './login.css';
import axios from 'axios'
import { url } from '../../../key'
import { notification } from 'antd';
import { useCookies } from 'react-cookie';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        const values = {
            email: email,
            password: password
        }
        console.log(values)
        try {
            axios.post(`${url}/api/admin/login`, values)
                .then(res => {
                    console.log(res.data)
                    setCookie('adminToken', res.data.adminToken, { path: '/' });

                })
        }
        catch (error) {
            console.log(error)
        }


    };

    return (
        <div className="loginAdmin">
            <form onSubmit={handleSubmit} className='LoginForm'>
                <h2 className='heading'>Admin Login</h2>
                <div className="formfield">
                    <label htmlFor="email-input">Email:</label>
                    <input id="email-input" type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="formfield">
                    <label htmlFor="password-input">Password:</label>
                    <input id="password-input" type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button >Login</button>
            </form>
        </div>
    );
}
