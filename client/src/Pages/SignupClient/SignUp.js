import React, { useState, useEffect, useRef } from 'react'
import { DatePicker, Form, Input, Button, notification, Select } from 'antd';
import dayjs from 'dayjs';
import './signup.css'
import { url } from '../../key'
import axios from 'axios'
import { useCookies } from 'react-cookie';

export default function SignUp() {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['customerToken']);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dobRef = useRef(null);
    const genderRef = useRef(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState()
    const [gender, setGender] = useState('')

    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [form] = Form.useForm();


    const handleLogin = async (e) => {
        e.preventDefault();
        const values = {
            email: emailLogin,
            password: passwordLogin
        }
        try {
            const res = await axios.post(`${url}/api/customer/login`, values)
            setCookie('customerToken', res.data.customerToken, { path: '/' });
            notification.success({
                message: 'Success',
                description: 'Login successfully',
                placement: 'bottomRight'
            })
        } catch (error) {
            console.log(error)
            notification.error({
                message: 'Error',
                description: error.message,
                placement: 'bottomRight'
            })
        }
    }
    const handleRegister = async () => {
        const values = {
            name: name,
            email: email,
            password: password,
            dateOfBirth: dob,
            gender: gender,
        }
        try {
            await axios.post(`${url}/api/customer/addCustomer`, values)
            notification.success({
                message: 'Success',
                description: 'User created successfully',
                placement: 'bottomRight'
            })
        } catch (error) {
            console.log(error)
            notification.error({
                message: 'Error',
                description: error.message,
                placement: 'bottomRight'
            })
        }
    }
    return (
        <div className="contanier mt-4">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="login">
                    <form className="form">
                        <label for="chk" aria-hidden="true">Log in</label>
                        <input className="input" type="email" name="email" placeholder="Email" required=""
                            onChange={(e) => setEmailLogin(e.target.value)} value={emailLogin}
                        />
                        <input className="input" type="password" name="password" placeholder="Password" required=""
                            onChange={(e) => setPasswordLogin(e.target.value)} value={passwordLogin}
                        />
                        <button className='mt-3 lgBtn' type="submit" onClick={handleLogin}
                        >Log in</button>
                    </form>
                </div>
                <div className="register">
                    <label className="text-center" for="chk" aria-hidden="true">Register</label>
                    <Form className="form"
                        form={form}
                        scrollToFirstError>
                        <Form.Item
                            label="Name"
                            rules={
                                [{ required: true, message: 'Please input your name!' },]
                            }
                        >
                            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: 210 }} type="text" name="name" placeholder="Name" required="" />
                        </Form.Item>
                        <Form.Item
                            label="Date of Birth"
                            rules={
                                [{ required: true, message: 'Please input your Date of birth!' }]
                            }
                        >
                            <DatePicker
                                defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                                format={dateFormatList}
                                onChange={(value) => { setDob(value) }}
                                style={{ width: 210 }}
                            /></Form.Item>
                        <Form.Item
                            label="Gender"
                            rules={
                                [{ required: true, message: 'Please input your Gender!' }]
                            }
                            style={{ width: 210 }}
                        >
                            <Select
                                ref={genderRef}
                                defaultValue="Choose Gender"
                                onSelect={(value) => { setGender(value) }}
                                options={[
                                    {
                                        value: 'Male',
                                        label: 'Male',
                                    },
                                    {
                                        value: 'Female',
                                        label: 'Female',
                                    },
                                    {
                                        value: 'Other',
                                        label: 'Other',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email">
                            <input
                                ref={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: 210 }} type="email" name="email" placeholder="Email" required="" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            rules={
                                [{ required: true, message: 'Please input your Password!' }]
                            }>
                            <Input.Password style={{ width: 210 }} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Item>
                        <Button type="primary" className="login-form-button lgBtn" onClick={handleRegister}>
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
