import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Typography, notification } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userService from '../services/userServices'

const Register = () => {
    const [userList, setUserList] = useState([]);
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const dateFormat = 'YYYY/MM/DD';
    
    useEffect(() => {
        const callApi = async () => {
            const data = await userService.getAllUser();
            setUserList(data);
        }
        callApi();
    }, [])

    const onFinish = (value) => {
        const user = {
            username: value.username,
            password: value.password,
            role: 'user',
            email: value.email,
            dob: date
        }

        const success = userList.find((item) => {
            return item.username === user.username;
        })

        if (success) {
            api["error"]({
                message: "Đăng ký không thành công",
                description: "Tài khoản đã tồn tại",
            });
        } else {
            const fetchCreate = async () => {
                await userService.createUser(user);
                api["success"]({
                    message: "Thành công",
                    description: "Đăng ký tài khoản thành công",
                });
            }
            fetchCreate();
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    const handleDate = (date, dateString) => {
        setDate(dateString.replace(/\//g, "-"));          
    }

    return (
        <div
            style={{
                boxSizing: 'border-box',
                width: '80%',
                height: '80vh',
                margin: '2rem auto 0',
                display: 'flex',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                borderRadius: '2rem',
                overflow: 'hidden'
            }}
        >   
            {contextHolder}
            <div style={{
                boxSizing: 'border-box',
                width: '60%',
                height: '100%',
            }}>
                <img
                    src='https://bcp.cdnchinhphu.vn/Uploaded/hoangtrongdien/2020_04_07/thu%20vien.jpg'
                    style={{width:'100%', height: '100%'}}
                />
            </div>
            <div style={{
                margin: '2rem 0 1rem 3rem',
                maxWidth: '30%'
            }}>
                <Typography.Title style={{fontSize: '2rem', margin: '3rem 0'}}>
                    Register
                </Typography.Title>
                <Form
                    style={{
                        minWidth: '50%',    
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Form.Item
                        label="Username:"
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: 'Không được để trống',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password:"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Không được để trống',
                            },
                        ]}
                    >   
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email:"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Không được để trống',
                            },
                        ]}
                    >
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        label="Birthday:"
                        name="dob"
                        rules={[
                            {
                            required: true,
                            message: 'Không được để trống',
                            },
                        ]}
                    >
                        <DatePicker format={dateFormat} style={{minWidth: '20rem'}} onChange={handleDate}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '100%',
                                height: '2.3rem',
                                marginBottom: '2rem'
                            }}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;