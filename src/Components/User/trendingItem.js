import { useEffect, useState } from "react";
import CardBook from "./cardBook";
import { Image, Row, Col, Typography } from "antd";
import {RightOutlined} from '@ant-design/icons'

const TrendingItem = ({ bookList }) => {
    const [trendingList, setTrendingList] = useState(bookList);

    useEffect(() => {
        bookList.sort((a, b) => b.sold - a.sold);
        setTrendingList(bookList.filter((book, key) => {
            return key < 4;
        }));
    }, [bookList])

    return (
        <div style={{position: 'relative'}}>
            <Typography.Title style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '1.5rem 0'}}>
                Trending now
            </Typography.Title>
            <Row gutter={[16, 16]}>
                {trendingList.map((book) => {
                    return (<CardBook book={book} key={book.bookcode}/>)
                })}    
                <Col span={8}>
                    <Image src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/book-selling-banner-post-design-template-73c76574739e7b8d3b76e128b287d076_screen.jpg?ts=1629098106" style={{borderRadius: "1rem", width: '100%' , height: '24rem'}}/>
                </Col>
            </Row>
            <Typography.Link style={{
                fontSize: '1rem',
                fontWeight: 'revert',
                position: 'absolute',
                left: '0',
                bottom: '0'
            }}>
                {'View all product '}
                <RightOutlined />
            </Typography.Link>
        </div>
    )
}

export default TrendingItem;