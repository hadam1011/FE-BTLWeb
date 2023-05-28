import { Menu, Modal } from 'antd';
import { useState } from 'react';
import { HomeOutlined, LoginOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [current, setCurrent] = useState('home');
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const isLogin = JSON.parse(localStorage.getItem("user")) !== null;

    const items = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />
    },
    {
        label: isLogin ? 'Logout' : 'Login',
        key: isLogin ? 'logout' : 'login',
        icon: isLogin ? <LogoutOutlined /> : <LoginOutlined />
    }
]

    const handleClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'home') {
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