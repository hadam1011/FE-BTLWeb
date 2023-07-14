import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CardBook from "./cardBook";
import { Image, Row, Col, Typography, Skeleton } from "antd";
import {RightOutlined} from '@ant-design/icons'
import { AppContext } from "../../context/appContext";

const TrendingItem = () => {
    const { bookList } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [trendingList, setTrendingList] = useState(bookList);
    const navigate = useNavigate();

    useEffect(() => {
        bookList.sort((a, b) => b.sold - a.sold);
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
                <Typography.Title className="title-style">
                    Trending now
                </Typography.Title>
                <Skeleton loading={loading} active>
                    <Row gutter={[16, 16]}>
                        {trendingList.map((book) => {
                            return (<CardBook book={book} key={book.bookcode}/>)
                        })}    
                        <Col span={8}>
                            <Image
                                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/book-selling-banner-post-design-template-73c76574739e7b8d3b76e128b287d076_screen.jpg?ts=1629098106"
                                style={{
                                    borderRadius: "1rem",
                                    width: '100%',
                                    height: '24rem'
                                }} />
                        </Col>
                    </Row>
                    <Typography.Link style={{
                        fontSize: '1rem',
                        fontWeight: 'revert',
                        position: 'absolute',
                        left: '0',
                        bottom: '0'
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

export default TrendingItem;