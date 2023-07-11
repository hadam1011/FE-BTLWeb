import { ReadOutlined, MailOutlined, SendOutlined } from '@ant-design/icons'
import { Input, Space, Typography } from 'antd';
import '../../App.css';

const UserFooter = () => {
    return (
        <div className='footer-container' id='footer'>
            <div className='footer-content-box'>
                <Space className='footer-title'>
                    <ReadOutlined />
                    BookStore
                </Space>
                <div>Find a location nearest you.<br />See our stores</div>
                <div>+(84)-1808-9213<br/>bookStore@gmail.com</div>
            </div>
            <div className='footer-content-box'>
                <Typography.Title className='footer-title'>
                    Contact info
                </Typography.Title>
                    <div>42 Thanh Binh Street, Ha Dong,<br/> Ha Noi City</div>
                    <div>Monday - Friday: 9:00-20:00<br/>Saturday: 11:00-15:00</div>
            </div>
            <div className='footer-content-box'>
                <Typography.Title className='footer-title'>
                    Explore
                </Typography.Title>
                <div>About us</div>  
                <div>Category</div>  
                <div>Products</div>  
                <div>Contact</div>  
            </div>
            <div className='footer-content-box'>
                <Typography.Title className='footer-title'>
                    Subscribe
                </Typography.Title>
                <div>Enter your email below to be the first<br /> to know about new collections and<br /> products launches</div>
                <Input
                    style={{ borderRadius: '2rem' }}
                    placeholder='Email address'
                    prefix={<MailOutlined />}
                    suffix={<SendOutlined />}
                />
            </div>
        </div>
    )
}

export default UserFooter;