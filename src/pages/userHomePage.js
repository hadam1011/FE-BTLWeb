import { Layout } from 'antd'
import { useEffect, useState } from "react";
import NavBar from '../Components/User/navBar'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import Contents from '../Components/User/content'
import * as bookService from '../services/bookServices'

const {Header, Content, Footer} = Layout

const UserHomePage = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const callApi = async () => {
        const data = await bookService.getAllBook();
        setBookList(data);
    }

    useEffect(() => {
        callApi();
        if (user === null) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <Layout style={{minHeight: '100vh', }}>
                <Header
                    style={{
                        padding: '0',
                        position: 'sticky',
                        top: '0',
                        zIndex: '1',
                        backgroundColor: 'white'
                    }}
                >
                    <NavBar setBookList={setBookList} />
                </Header>
                <Content style={{ margin: '1rem 10rem', minHeight: '100vh' }}>  
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