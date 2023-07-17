import { Divider, Image, Typography, Button, Space, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import * as bookService from '../../services/bookServices';
import * as cartService from '../../services/cartServices';

const HistoryItem = ({ order }) => {
    const [book, setBook] = useState({});
    const [modal, contextHolder] = Modal.useModal();
    const [api, apiContextHolder] = notification.useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            const data = await bookService.getBookById(order.bookid);
            setBook(data);
        }
        fetchBook();
    }, [])

    const handleClickView = () => {
        navigate(`/book-detail/${order.bookid}`);
    }

    const handleAddToCart = () => {
        const newData = {
            userid: order.userid,
            bookid: order.bookid,
            title: book.title,
            price: book.price,
            quantity: order.quantity,
            total: order.total
        }

        const fetchCreate = async () => {
            await cartService.createOrder(newData);
            api["success"]({
                message: "Message",
                description: "Add to cart successfully",
            });
        }
        fetchCreate();
    }

    const handleConfirm = () => {
        modal.confirm({
            title: "Confirm",
            content: "Add to cart?",
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                handleAddToCart();
            },
        });
    }

    return (
        <div style={{ margin: '1rem 0', backgroundColor: '#fff'}}>
            {contextHolder}
            {apiContextHolder}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '0.5rem',
                paddingTop: '0.6rem'
            }}>
                <Button
                    style={{ marginLeft: '1rem' }}
                    onClick={handleClickView}
                >
                    View Book
                </Button>
                <Typography.Text>
                    {`Delivery time: ${order.date}`}
                </Typography.Text>
            </div>
            <Divider style={{margin: '1rem'}}/>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '10% 80% 10%',
                columnGap: '1rem'
            }}>
                <Image
                    src={book.avatar}
                    style={{
                        width: '6rem',
                        height: '6rem'
                    }}
                />
                <div>
                    <Typography.Text
                        strong
                        style={{fontSize: '1.3rem'}}
                    >
                        {order.title}
                    </Typography.Text><br />
                    <Typography.Text style={{color: 'rgba(0,0,0,.54)'}}>
                        Category: {book.category}
                    </Typography.Text><br />
                    <Typography.Text>{`x${order.quantity}`}</Typography.Text>
                </div>
                <Typography.Text
                    className='flex-box-center'
                    style={{
                        fontSize: '1rem',
                        marginRight: '1rem',
                    }}
                >
                    {`${order.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                </Typography.Text>
            </div>
            <Divider style={{ margin: '1rem' }} />
            <Space
                size='middle'
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginRight: '0.5rem',
                    paddingBottom: '0.6rem'
                }}
            >
                <Button
                    style={{
                        backgroundColor: 'green',
                        color: 'white'
                    }}
                    onClick={handleConfirm}
                >
                    Add to cart
                </Button>
                <Typography.Title style={{fontSize: '1.3rem'}}>
                    Total: {`${order.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                </Typography.Title>
            </Space>
        </div>
    )
}

export default HistoryItem;