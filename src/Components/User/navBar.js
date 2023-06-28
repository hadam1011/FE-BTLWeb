import { Menu, Modal, Input, Form, DatePicker, notification } from 'antd';
import { useEffect, useState } from 'react';
import { HomeOutlined, LogoutOutlined, ExclamationCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import * as userService from '../../services/userServices';
import * as bookService from '../../services/bookServices';

const NavBar = ({ setBookList }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('home');
    const [bookData, setBookData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [date, setDate] = useState(user === null ? '' : user.dob);
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const [api, apiContextHolder] = notification.useNotification();
    const dateFormat = 'YYYY/MM/DD';
    
    const callApi = async () => {
        const data = await bookService.getAllBook();
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
            id: user.id,
            username: data.username,
            password: data.password,
            dob: date,
            role: user.role === 'user' ? 'user' : 'manager',
            email: data.email
        }

        const fetchUpdate = async () => {
            await userService.updateUser(user.id, newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            api["success"]({
                message: "Thành công",
                description: "Cập nhật thông tin tài khoản thành công",
            });
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