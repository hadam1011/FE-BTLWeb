import { Menu, Modal, Input } from 'antd';
import { useEffect, useState } from 'react';
import { HomeOutlined, LogoutOutlined, ExclamationCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setBookList }) => {
    const [current, setCurrent] = useState('home');
    const [bookData, setBookData] = useState([]);
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/books');
        let data = await response.json();
        setBookList(data);
        setBookData(data);
    }

    useEffect(() => {
        callApi();
    }, [])

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
        key:  'search',
        label: (
            <Input.Search
                allowClear
                onChange={handleSearch}
                style={{
                    minWidth: '15rem',
                    marginTop: '1rem',
                    position: 'absolute',
                    left: '62rem'
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