import { Card, Col, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StarFilled } from "@ant-design/icons"
import { useEffect, useState } from 'react';
import * as starService from '../../services/starServices'
import '../../App.css';

const CardBook = ({ book }) => {
    const navigate = useNavigate();
    const [star, setStar] = useState(0);
    const [vote, setVote] = useState(0);

    useEffect(() => {
        const callApi = async () => {
            const data = await starService.getStarsByBookId(book.bookcode);
            let sum = data.reduce((store, star) => {
                return store + star.star;
            }, 0)
            setStar(Math.floor(sum / data.length));
            setVote(data.length);
        }
        callApi();
    }, [])

    const handleClickCard = () => {
        navigate(`/book-detail/${book.bookcode}`);
    }

    return (
        <>
            <Col xl={4} lg={6} md={8} sm={12} xs={24}>
                <Card
                    hoverable
                    bordered={false}
                    cover={<img src={book.avatar} className='book-image' />}
                    onClick={handleClickCard}
                    bodyStyle={{padding: '0.8rem', height: '7rem'}}
                >
                    <div
                        style={{
                            height: '2rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <Typography.Text
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {`${book.title} - ${book.author}`}
                        </Typography.Text>
                    </div>
                    <Space style={{marginBottom: '0.2rem'}}>
                        {star.toString() !== 'NaN' ? star : 0}
                        <StarFilled style={{ color: 'yellow', fontSize: '0.9rem' }} />
                        <span>
                            <Typography.Text
                                style={{
                                    fontSize: '0.7rem',
                                    fontStyle: 'italic',
                                }}
                            >
                                {`(${vote} vote)`}
                            </Typography.Text>
                        </span>
                        <span style={{ border: '1px solid gray' }} />
                        <Typography.Text style={{fontSize: '0.9rem'}}>
                            {`Sold: ${book.sold}`}
                        </Typography.Text>
                    </Space>
                    <Typography.Text style={{fontSize: '1rem', fontWeight: 'bold'}}>
                        {`${book.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                    </Typography.Text>
                </Card>
            </Col>
        </>
    )
}

export default CardBook;