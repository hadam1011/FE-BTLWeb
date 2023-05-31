import { Menu, Modal, Input, Form, DatePicker, notification } from 'antd';
import { useEffect, useState } from 'react';
import { HomeOutlined, LogoutOutlined, ExclamationCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const NavBar = ({ setBookList }) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const navigate = useNavigate();
    const [current, setCurrent] = useState('home');
    const [bookData, setBookData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(user === null ? '' : user.dob);
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const [api, apiContextHolder] = notification.useNotification();
    const dateFormat = 'YYYY/MM/DD';

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/books');
        let data = await response.json();
        setBookList(data);
        setBookData(data);
    }

    useEffect(() => {
        callApi();
    }, [])

    const handleDate = (date, dateString) => {
        setDate(dateString.replace(/\//g, "-"));          
    }

    const handleSearch = (e) => {
        const keywords = e.target.value.toLowerCase();
        if (keywords.length === 0) callApi();

        console.log(keywords);
        var newList = bookData.filter((book) => {
            return book.title.toLowerCase().includes(keywords) ||
                book.author.toLowerCase().includes(keywords);
        });
        setBookList(newList);
    }

    const items = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />
    },
    {
        label: 'Cart',
        key: 'cart',
        icon: <ShoppingCartOutlined />
    },
    {
        label: 'Logout',
        key:  'logout',
        icon: <LogoutOutlined />
    },
    {
        label: 'Account',   
        key:  'account',
        icon: <UserOutlined />
    },
    {
        key:  'search',
        label: (
            <Input.Search
                allowClear
                onChange={handleSearch}
                style={{
                    minWidth: '15rem',
                    marginTop: '1rem',
                    position: 'absolute',
                    left: '55rem'
                }}  
            />
        ),
        disabled: true
    },
    ]

    const handleClick = (e) => {
        if (e.key === 'home') {
            setCurrent(e.key);
            window.localStorage.removeItem('book');
            navigate('/');
        } else if (e.key === 'logout'){
            modal.confirm({
                title: "Đăng xuất",
                content: "Bạn muốn đăng xuất?",
                icon: <ExclamationCircleOutlined />,
                onOk: () => {
                    window.localStorage.clear();
                    navigate("/login");
                },
            });
        } else if (e.key === 'cart') {
            setCurrent(e.key);
            navigate('/cart');
        } else if (e.key === 'account') {
            setIsOpen(true);
        }
    }

    const handleUpdateAccount = (data) => {
        const newUser = {
            id: data.id,
            username: data.username,
            password: data.password,
            dob: date,
            role: data.user === 'user' ? 'user' : 'manager',
            email: data.email
        }

        var options = {
            method: "PUT" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        };

        const fetchUpdate = async () => {
            const response = await fetch(`http://localhost:8080/user/${user.id}`, options);
            api["success"]({
                message: "Thành công",
                description: "Cập nhật thông tin tài khoản thành công",
            });
            window.localStorage.setItem('user', JSON.stringify(newUser));
        }   
        fetchUpdate();
    }

    return (
        <div >
            {contextHolder}
            {apiContextHolder}
            <Menu
                onClick={handleClick}
                selectedKeys={[current]} 
                mode="horizontal"
                items={items}
            />
            <Modal
                open={isOpen}
                title="Thông tin tài khoản"
                onCancel={() => setIsOpen(false)}
                okText="Save"
                onOk={() => {
                    form.validateFields()
                      .then((value) => {
                        handleUpdateAccount(value);
                        setIsOpen(false);
                      });
                  }}
            >
                <Form layout='vertical' form={form}>
                    <Form.Item
                        label="Tài khoản: "
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                        initialValue={user === null ? '' : user.username}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu: "
                        name="password"
                        initialValue={user === null ? '' : user.password}
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Email: "
                        name="email"
                        initialValue={user === null ? '' : user.email}
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh: "
                        name="dob"
                        initialValue={user === null ? '' : user.dob === undefined ? null : dayjs(user.dob)}
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <DatePicker
                            format={dateFormat}
                            onChange={handleDate}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default NavBar;