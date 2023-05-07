import React, { useState, useEffect, useRef } from 'react'
import { DatePicker, Form, Input, Button, notification, Select } from 'antd';
import dayjs from 'dayjs';
import './signup.css'
import { url } from '../../key'
import axios from 'axios'

export default function SignUp() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dobRef = useRef(null);
    const genderRef = useRef(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')

    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [form] = Form.useForm();

    const handleRegister = async () => {
        const values = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            dob: dobRef.current.value,
        }
        console.log(values)
        // try {
        //     await axios.post(`${url}/api/customer/addCustomer`, values)
        //     notification.success({
        //         message: 'Success',
        //         description: 'User created successfully',
        //         placement: 'bottomRight'
        //     })
        // } catch (error) {
        //     console.log(error)
        //     notification.error({
        //         message: 'Error',
        //         description: error.message,
        //         placement: 'bottomRight'
        //     })
        // }

        const handleLogin = async () => {
            const values = {
                email: emailLogin,
                password: passwordLogin
            }
            console.log(values)
            try {
                await axios.post(`${url}/api/customer/login`, values)
                notification.success({
                    message: 'Success',
                    description: 'User logged in successfully',
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
                        <button className='mt-3 lgBtn'
                            onClick={handleLogin}
                        >Log in</button>
                    </form>
                </div>
                <div className="register">
                    <label className="text-center" for="chk" aria-hidden="true">Register</label>
                    <Form className="form"
                        form={form}
                        onFinish={handleRegister}
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
                            <DatePicker ref={dobRef} style={{ width: 210 }} defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
                        </Form.Item>
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
                                style={{ width: 210 }} type="email" name="email" placeholder="Email" required="" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            rules={
                                [{ required: true, message: 'Please input your Password!' }]
                            }>
                            <Input.Password style={{ width: 210 }} required />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button lgBtn">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
