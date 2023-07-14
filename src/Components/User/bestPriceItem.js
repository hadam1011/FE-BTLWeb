import { Typography, Row, Col, Image, Skeleton } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons'
import CardBook from './cardBook';
import { AppContext } from '../../context/appContext';

const BestPriceItems = () => {
    const { bookList } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [trendingList, setTrendingList] = useState(bookList);
    const navigate = useNavigate();

    useEffect(() => {
        bookList.sort((a, b) => a.price - b.price);
        setTrendingList(bookList.filter((book, key) => {
            return key < 4;
        }));

        if(bookList.length > 0) setLoading(false);
    }, [bookList])

    const handleViewProduct = () => {
        navigate('/products');
    }

    return (
        <div style={{position: 'relative'}}>
                <Typography.Title className='title-style'>
                    Best price for you
                </Typography.Title>
                <Skeleton loading={loading} active>
                    <Row gutter={[16, 16]}>
                        {trendingList.map((book) => {
                            return (<CardBook book={book} key={book.bookcode}/>)
                        })}    
                        <Col span={8}>
                            <Image
                                src="https://c8.alamy.com/comp/2D0A2Y2/black-friday-super-sale-comic-style-banner-template-text-with-explosion-pop-art-web-banner-speech-bubble-advertising-sales-promotion-super-sale-and-discount-halftone-dot-background-vector-2D0A2Y2.jpg"
                                style={{
                                    borderRadius: "1rem",
                                    width: '24rem',
                                    height: '24rem'
                                }} />
                        </Col>
                    </Row>
                    <Typography.Link style={{
                        fontSize: '1rem',
                        fontWeight: 'revert',
                        position: 'absolute',
                        left: '0',
                        bottom: '0',
                    }}>
                        <Typography.Text onClick={handleViewProduct} style={{fontSize: '1rem'}}>
                            {'View all product '}
                        </Typography.Text>
                        <RightOutlined />
                    </Typography.Link>
                </Skeleton>
            </div>
    )
}

export default BestPriceItems;