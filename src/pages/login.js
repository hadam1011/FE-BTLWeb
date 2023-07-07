import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography, notification } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userService from '../services/userServices';

const Login = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const callApi = async () => {
            const data = await userService.getAllUser();
            setUserList(data);
        }
        callApi();
    }, [])

    const onFinish = (values) => {
        let user = userList.find((user) => {
            return user.username === values.username && user.password === values.password;
        });

        if (user === undefined) {
            api["error"]({
                message: "Đăng nhập không thành công",
                description: "Sai thông tin tài khoản hoặc mật khẩu",
            });
        } else {
            localStorage.setItem('user', JSON.stringify(user));
            if (user.role === "manager") {
                navigate('/admin');
            } else {
                navigate('/')
            }
        }
    };

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
                {contextHolder}
                <Typography.Title style={{fontSize: '2rem', margin: '3rem 0'}}>
                    Login
                </Typography.Title>
                <Typography.Text style={{fontSize: '1rem', fontWeight: 'bold'}}>
                    Login to your account
                </Typography.Text>
                <div>
                    <Typography.Text type='secondary'>
                        Thank you gor get back to our website, lets access our the best recommendation for you
                    </Typography.Text>
                </div>
                <Divider />
                <Form
                    layout='vertical'
                    name="normal_login"
                    style={{
                        minWidth: '50%',    
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
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
                        label="Password"
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
                            Sign in
                        </Button>
                        <Typography.Text style={{fontSize: '1rem'}}>
                            {`Don't have an account yet? `}
                        </Typography.Text>
                        <Typography.Link
                            style={{ fontSize: '1rem' }}
                            href='http://localhost:3000/register'
                        >
                            Join us
                        </Typography.Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;