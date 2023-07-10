import { Row, Typography, Image, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons'
import CarouselItem from './carouselItem';
import TrendingItem from './trendingItem';
import BestPriceItems from './bestPriceItem';
import '../../App.css';

const Contents = () => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12} style={{position: 'relative',}}>
                    <Image
                        width='100%'
                        preview={false}
                        src="https://aconytebooks.com/wp-content/uploads/ACV02-Sword-of-the-White-Horse-banner.jpg"
                        style={{
                            borderRadius: '2rem',
                            height: '16rem',
                        }}
                    />
                    <div
                        className='salesText-container zoom-effect'
                        style={{background: 'linear-gradient(to right, #224348, #23474c82)'}}
                    >
                        <div className='salesText-box'>
                            <Typography.Text className='salesOff-text'>
                                Sale 25% OFF
                            </Typography.Text>
                            <div className='shopNow-box'>
                                Shop now
                                <RightOutlined />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <Image
                        width='100%'   
                        preview={false}
                        src="https://aconytebooks.com/wp-content/uploads/ARKomni01-Dark-Origins-book-banner.jpg"
                        style={{
                            borderRadius: '2rem',
                            height: '16rem',
                        }}
                    />
                    <div
                        className='salesText-container zoom-effect'
                        style={{background: 'linear-gradient(to right, #46597b, #46597bba)'}}
                    >
                        <div className='salesText-box'>
                            <Typography.Text className='salesOff-text'>
                                Sale 35% OFF
                            </Typography.Text>
                            <div className='shopNow-box'>
                                Shop now
                                <RightOutlined />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <TrendingItem />
            <BestPriceItems />
            <CarouselItem />
        </div>
    )
}

export default Contents;