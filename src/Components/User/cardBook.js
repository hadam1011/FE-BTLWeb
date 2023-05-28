import { Card, Col, Rate, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {StarFilled } from "@ant-design/icons"

const CardBook = ({ book }) => {
    const navigate = useNavigate();

    const handleClickCard = () => {
        window.localStorage.setItem("book", JSON.stringify(book));
        navigate('/book-detail');
    }

    return (
        <>
            <Col span={4}>
                <Card
                    hoverable
                    cover={<img src={book.avatar} height='250rem' />}
                    onClick={handleClickCard}
                    bodyStyle={{padding: '12px', height: '6rem'}}
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
                    <Space>
                        {Math.floor(book.star / book.comment).toString() === 'NaN' ? 0 : Math.floor(book.star / book.comment)}
                        <StarFilled style={{color: 'yellow', fontSize: '15px'}}/>
                        <span style={{ border: '1px solid gray' }} />
                        <Typography.Text style={{fontSize: '15px'}}>
                            {`Đã bán: ${book.sold}`}
                        </Typography.Text>
                    </Space>
                </Card>
            </Col>
        </>
    )
}

export default CardBook;