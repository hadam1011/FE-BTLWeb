import { Layout } from 'antd'
import { useEffect } from "react";
import NavBar from '../Components/User/navBar'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import Contents from '../Components/User/content'
import UserFooter from '../Components/User/footer';
import '../App.css';

const {Header, Content, Footer} = Layout

const UserHomePage = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
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
                    <NavBar />
                </Header>
                <Content style={{ margin: '1rem 10rem', minHeight: '100vh' }}>  
                    {location.pathname === '/' && <Contents />}
                    <Outlet />
                </Content>
                <Footer>
                    <UserFooter />
                </Footer>
            </Layout>
        </div>
    )
}

export default UserHomePage;