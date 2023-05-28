import { Layout } from 'antd'
import { useEffect, useState } from "react";
import NavBar from '../Components/User/navBar'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import Contents from '../Components/User/content'

const {Header, Content, Footer} = Layout

const UserHomePage = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const render = JSON.parse(window.localStorage.getItem('re-render'));

    if (user === null) {
        navigate('/login');
    }

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/books');
        let data = await response.json();
        setBookList(data);
        window.localStorage.removeItem('re-render');
    }

    if (render !== null) {
        callApi();
    }

    useEffect(() => {
        callApi();
    }, [])

    return (
        <div>
            <Layout style={{minHeight: '100vh', }}>
                <Header
                    style={{
                        padding: '0',
                        position: 'sticky',
                        top: '0',
                        zIndex: '1'
                    }}
                >
                    <NavBar setBookList={setBookList} />
                </Header>
                <Content style={{ margin: '1em 5em 0 5em', minHeight: '100vh' }}>  
                    {location.pathname === '/' && <Contents bookList={bookList}/>}
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©2023 Created by Đàm Trọng Ngọc Hà - B20DCCN211
                </Footer>
            </Layout>
        </div>
    )
}

export default UserHomePage;