import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, notification } from 'antd';
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

    const handleClickRegister = () => {
        navigate('/register');
    }

    return (
        <div
            style={{
                width: '40rem',
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10rem 10rem 10rem 28rem',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            }}
        >   
            {contextHolder}
            <Typography.Title style={{fontSize: '2rem'}}>
                Đăng nhập
            </Typography.Title>
            <Form
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
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        Log in
                    </Button>
                    <div style={{textAlign: 'center'}}>Or</div>
                    <Button type="primary" style={{width: '100%'}} onClick={handleClickRegister}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;