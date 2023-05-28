import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Typography, notification } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userList, setUserList] = useState([]);
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const dateFormat = 'YYYY/MM/DD';

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/users');
        let data = await response.json();
        setUserList(data);
    }

    useEffect(() => {
        callApi();
    }, [])

    const onFinish = (value) => {
        let success = true;
        const user = {
            username: value.username,
            password: value.password,
            role: 'user',
            email: value.email,
            dob: date
        }

        var options = {
            method: "POST" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };

        userList.forEach((item) => {
            if (item.username === user.username) {
                success = false;
            }
        })

        if (!success) {
            api["error"]({
                message: "Đăng ký không thành công",
                description: "Tài khoản đã tồn tại",
            });
        } else {
            const fetchCreate = async () => {
                const response = await fetch('http://localhost:8080/user', options);
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
                width: '40rem',
                height: '65vh',
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
                Đăng ký
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
                    label="Tài khoản:"
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
                    label="Mật khẩu:"
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
                    label="Ngày sinh:"
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
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;