import { Layout } from 'antd'
import { useLocation, Outlet } from 'react-router-dom'
import NavBar from '../Components/Admin/navBar'
import ContentPages from '../Components/Admin/content'

const {Header, Content, Footer} = Layout

const AdminHomePage = ({ setBook, setDisabled }) => {
    let location = useLocation();

    return (
        <div>
            <Layout style={{minHeight: '100vh'}}>
                <Header style={{padding: '0', }}>
                    <NavBar />
                </Header>
                <Content style={{margin: '0 5em'}}>  
                    {location.pathname === '/admin' && <ContentPages setBook={setBook} setDisabled={setDisabled} />}
                    <Outlet />
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    ©2023 Created by Đàm Trọng Ngọc Hà - B20DCCN211
                </Footer>
            </Layout>
        </div>
    )
}

export default AdminHomePage;