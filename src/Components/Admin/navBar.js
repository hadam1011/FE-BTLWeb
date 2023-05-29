import { Menu, Modal } from 'antd';
import { useState } from 'react';
import { BookOutlined, LoginOutlined, LogoutOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [current, setCurrent] = useState('book');
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const isLogin = JSON.parse(localStorage.getItem("user")) !== null;

    const items = [
    {
        label: 'Book Management',
        key: 'book',
        icon: <BookOutlined />
    },
    {
        label: 'Account Management',
        key: 'account',
        icon: <UserOutlined />
    },
    {
        label: isLogin ? 'Logout' : 'Login',
        key: isLogin ? 'logout' : 'login',
        icon: isLogin ? <LogoutOutlined /> : <LoginOutlined />
    }
]

    const handleClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'book') {
            navigate('/admin');
        } else if (e.key === 'login') {
            navigate('/login');
        } else if (e.key === 'logout'){
            modal.confirm({
                title: "Đăng xuất",
                content: "Bạn muốn đăng xuất?",
                icon: <ExclamationCircleOutlined />,
                onOk: () => {
                    window.localStorage.clear();
                    navigate("/admin");
                },
              });
        } else if (e.key === 'account') {
            navigate('/admin/accounts');
        }
    }

    return (
        <div >
            {contextHolder}
            <Menu
                onClick={handleClick}
                selectedKeys={[current]} 
                mode="horizontal"
                items={items}
            />
        </div>
    )
}

export default NavBar;