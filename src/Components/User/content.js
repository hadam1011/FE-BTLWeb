import { Row, Pagination, Typography, Image, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons'
import CardBook from "./cardBook";
import { useState } from 'react';
import CarouselItem from './carouselItem';
import TrendingItem from './trendingItem';
import BestPriceItems from './bestPriceItem';
import '../../App.css';

const Contents = ({ bookList }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePagination = (page, pageSize) => {
        setCurrentPage(page);
    };

    const renderCard = () => {
        const itemsPerPage  = 12;
        const startItem = (currentPage - 1) * itemsPerPage;
        const endItem = Math.min(currentPage * itemsPerPage, bookList.length);

        const cards = [];

        for (let i = startItem; i < endItem; i++) {
            cards.push(<CardBook book={bookList[i]} key={i}/>);
        }

        return cards;
    }

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
            <TrendingItem bookList={bookList} />
            <BestPriceItems bookList={bookList} />
            {/* <Typography.Title style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}> 
                All books
            </Typography.Title>
            <Row gutter={[16, 16]} >
                {renderCard()}
            </Row> */}
            <CarouselItem />
            <Pagination
                pageSize={12}
                current={currentPage}
                total={bookList.length}
                hideOnSinglePage
                onChange={handleChangePagination}
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    justifyContent: 'center',
                }}
            />
        </div>
    )
}

export default Contents;